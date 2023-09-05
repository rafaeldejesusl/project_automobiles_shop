import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  "type": "mysql",
  "host": "db",
  "port": 3306,
  "username": "root",
  "password": "password",
  "database": "project_automobiles_shop",
  "synchronize": true,
  "logging": true,
  "entities": ["src/entities/**/*.ts"],
  "migrations": ["src/database/migrations/**/*.ts"],
  "subscribers": ["src/subscribers/**/*.ts"],
});
