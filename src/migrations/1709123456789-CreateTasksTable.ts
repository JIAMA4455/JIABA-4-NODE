import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1709123456789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE task_status AS ENUM ('pending', 'in-progress', 'done');
      CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');
      
      CREATE TABLE tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status task_status NOT NULL DEFAULT 'pending',
        priority task_priority NOT NULL DEFAULT 'medium',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE tasks;
      DROP TYPE task_status;
      DROP TYPE task_priority;
    `);
  }
} 