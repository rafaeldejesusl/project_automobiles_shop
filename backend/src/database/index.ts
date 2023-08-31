import { DataSource } from "typeorm";

const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'project_automobiles_shop',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/entities/*{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});

connectionSource.initialize();

export default connectionSource;
