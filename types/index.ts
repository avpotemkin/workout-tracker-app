export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
};

export type Program = {
  id: string;
  name: string;
  description?: string;
  exercises?: Exercise[];
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean
}; 