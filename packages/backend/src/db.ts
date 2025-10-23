import knex, { Knex } from 'knex';
import config from './knexfile';

let dbInstance: Knex | null = null;

export function getDb(): Knex {
  if (!dbInstance) {
    dbInstance = knex(config);
  }
  return dbInstance;
}
