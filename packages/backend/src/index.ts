import express from 'express';
import cors from 'cors';
import { getDb } from './db';
import { z } from 'zod';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize DB schema and seed on boot
async function init() {
  const db = getDb();

  const hasPrograms = await db.schema.hasTable('programs');
  if (!hasPrograms) {
    await db.schema.createTable('programs', (t) => {
      t.string('id').primary();
      t.string('name').notNullable();
      t.text('description');
      t.string('schedule');
      t.boolean('isActive').defaultTo(true);
      t.dateTime('createdAt');
      t.dateTime('updatedAt');
    });

    await db.schema.createTable('workouts', (t) => {
      t.string('id').primary();
      t.string('programId').notNullable().references('programs.id');
      t.string('name').notNullable();
      t.text('description');
    });

    await db.schema.createTable('exercises', (t) => {
      t.string('id').primary();
      t.string('workoutId').notNullable().references('workouts.id');
      t.string('name').notNullable();
      t.integer('sets').notNullable();
      t.integer('reps').notNullable();
      t.integer('weight');
    });

    await db.schema.createTable('workout_history', (t) => {
      t.string('id').primary();
      t.string('programName').notNullable();
      t.string('dayName').notNullable();
      t.dateTime('startedAt').notNullable();
      t.dateTime('finishedAt').notNullable();
      t.integer('duration').notNullable();
      t.integer('totalSets').notNullable();
      t.integer('totalReps').notNullable();
      t.integer('totalVolume').notNullable();
    });

    await db.schema.createTable('workout_history_exercises', (t) => {
      t.string('id').primary();
      t.string('historyId').notNullable().references('workout_history.id');
      t.string('exerciseId').notNullable();
      t.string('name').notNullable();
    });

    await db.schema.createTable('workout_history_sets', (t) => {
      t.string('id').primary();
      t.string('historyExerciseId').notNullable().references('workout_history_exercises.id');
      t.integer('setNumber').notNullable();
      t.integer('weight').notNullable();
      t.integer('reps').notNullable();
      t.boolean('isCompleted').notNullable();
    });

    // Seed with in-package seed data (copied from app mockdata)
    const seed = await import('./seed');

    // Programs
    for (const program of seed.PROGRAMS as any[]) {
      await db('programs').insert({
        id: program.id,
        name: program.name,
        description: program.description,
        schedule: program.schedule ?? null,
        isActive: program.isActive ?? true,
        createdAt: program.createdAt ? new Date(program.createdAt) : new Date(),
        updatedAt: program.updatedAt ? new Date(program.updatedAt) : new Date(),
      });

      for (const workout of program.workouts) {
        await db('workouts').insert({
          id: workout.id,
          programId: program.id,
          name: workout.name,
          description: workout.description ?? null,
        });
        for (const exercise of workout.exercises) {
          await db('exercises').insert({
            id: exercise.id,
            workoutId: workout.id,
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            weight: exercise.weight ?? null,
          });
        }
      }
    }

    // History
    for (const h of (seed.HISTORY as any[])) {
      await db('workout_history').insert({
        id: h.id,
        programName: h.programName,
        dayName: h.dayName,
        startedAt: new Date(h.startedAt),
        finishedAt: new Date(h.finishedAt),
        duration: h.duration,
        totalSets: h.totalSets,
        totalReps: h.totalReps,
        totalVolume: h.totalVolume,
      });
      for (const ex of h.exercises) {
        await db('workout_history_exercises').insert({
          id: ex.id,
          historyId: h.id,
          exerciseId: ex.exerciseId,
          name: ex.name,
        });
        for (const set of ex.sets) {
          await db('workout_history_sets').insert({
            id: set.id,
            historyExerciseId: ex.id,
            setNumber: set.setNumber,
            weight: set.weight,
            reps: set.reps,
            isCompleted: set.isCompleted,
          });
        }
      }
      // Stats will be computed on the fly, no table for mockHistoryStats
    }
  }
}

// DTOs
const programSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  schedule: z.string().optional(),
  isActive: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

// Routes
app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/programs', async (_req, res) => {
  const db = getDb();
  const programs = await db('programs').select('*');
  const workouts = await db('workouts').select('*');
  const exercises = await db('exercises').select('*');

  const programMap: Record<string, any> = {};
  for (const p of programs) {
    programMap[p.id] = {
      id: p.id,
      name: p.name,
      description: p.description ?? undefined,
      schedule: p.schedule ?? undefined,
      isActive: !!p.isActive,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
      workouts: [],
    };
  }

  const workoutsByProgram: Record<string, any[]> = {};
  for (const w of workouts) {
    if (!workoutsByProgram[w.programId]) workoutsByProgram[w.programId] = [];
    workoutsByProgram[w.programId].push({ ...w, exercises: [] });
  }

  for (const e of exercises) {
    const workout = (workoutsByProgram[e.workoutId] || []).find((w) => w.id === e.workoutId);
    if (workout) {
      workout.exercises.push({
        id: e.id,
        name: e.name,
        sets: e.sets,
        reps: e.reps,
        weight: e.weight ?? undefined,
      });
    }
  }

  for (const programId of Object.keys(workoutsByProgram)) {
    if (programMap[programId]) {
      programMap[programId].workouts = workoutsByProgram[programId].map((w) => ({
        id: w.id,
        name: w.name,
        description: w.description ?? undefined,
        exercises: w.exercises,
      }));
    }
  }

  res.json(Object.values(programMap));
});

app.get('/history', async (_req, res) => {
  const db = getDb();
  const history = await db('workout_history').select('*').orderBy('startedAt', 'desc');
  const historyExercises = await db('workout_history_exercises').select('*');
  const historySets = await db('workout_history_sets').select('*');

  const exercisesByHistoryId: Record<string, any[]> = {};
  for (const ex of historyExercises) {
    exercisesByHistoryId[ex.historyId] ||= [];
    exercisesByHistoryId[ex.historyId].push({ ...ex, sets: [] });
  }
  for (const s of historySets) {
    const ex = (exercisesByHistoryId[s.historyExerciseId] || []).find((e) => e.id === s.historyExerciseId);
    if (ex) {
      ex.sets.push({
        id: s.id,
        setNumber: s.setNumber,
        weight: s.weight,
        reps: s.reps,
        isCompleted: !!s.isCompleted,
      });
    }
  }

  const result = history.map((h) => ({
    id: h.id,
    programName: h.programName,
    dayName: h.dayName,
    startedAt: h.startedAt,
    finishedAt: h.finishedAt,
    duration: h.duration,
    totalSets: h.totalSets,
    totalReps: h.totalReps,
    totalVolume: h.totalVolume,
    exercises: (exercisesByHistoryId[h.id] || []).map((ex) => ({
      id: ex.id,
      exerciseId: ex.exerciseId,
      name: ex.name,
      sets: ex.sets,
    })),
  }));

  res.json(result);
});

app.get('/history/stats', async (_req, res) => {
  const db = getDb();
  const history = await db('workout_history').select('*');

  const totalWorkouts = history.length;
  const totalDuration = history.reduce((sum, h) => sum + (h.duration || 0), 0);
  const totalVolume = history.reduce((sum, h) => sum + (h.totalVolume || 0), 0);
  const averageWorkoutDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;

  // strongest lifts: pick top 3 by volume per exercise across sets
  const historySets = await db('workout_history_sets').select('*');
  const historyExercises = await db('workout_history_exercises').select('*');
  const exById = Object.fromEntries(historyExercises.map((e) => [e.id, e]));
  const byExercise: Record<string, { exercise: string; maxWeight: number; date: Date }[]> = {};
  for (const s of historySets) {
    const ex = exById[s.historyExerciseId];
    if (!ex) continue;
    const list = (byExercise[ex.name] ||= []);
    list.push({ exercise: ex.name, maxWeight: s.weight, date: new Date() });
  }
  const strongestLifts = Object.keys(byExercise)
    .map((k) => ({ exercise: k, maxWeight: Math.max(...byExercise[k].map((r) => r.maxWeight)), date: new Date() }))
    .sort((a, b) => b.maxWeight - a.maxWeight)
    .slice(0, 3);

  res.json({ totalWorkouts, totalDuration, totalVolume, averageWorkoutDuration, strongestLifts });
});

app.get('/session', async (req, res) => {
  const programId = req.query.programId as string;
  const workoutId = req.query.workoutId as string;
  if (!programId || !workoutId) return res.status(400).json({ error: 'programId and workoutId are required' });

  const db = getDb();
  const program = await db('programs').where({ id: programId }).first();
  const workout = await db('workouts').where({ id: workoutId }).first();
  if (!program || !workout) return res.status(404).json({ error: 'Not found' });

  const exercises = await db('exercises').where({ workoutId }).select('*');
  const workoutExercises = exercises.map((exercise) => ({
    id: exercise.id,
    exerciseId: exercise.id,
    name: exercise.name,
    sets: Array.from({ length: exercise.sets }).map((_, i) => ({
      id: `${exercise.id}-set-${i + 1}`,
      setNumber: i + 1,
      weight: exercise.weight ?? 0,
      reps: exercise.reps,
      isCompleted: false,
    })),
  }));

  const session = {
    id: `session-${Date.now()}`,
    programName: program.name,
    dayName: workout.name,
    exercises: workoutExercises,
    startedAt: new Date(),
    isFinished: false,
  };

  res.json(session);
});

const PORT = process.env.PORT || 4000;
init().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
});
