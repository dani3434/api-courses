import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCoursesTable1701966964020 } from 'src/migrations/1701966964020-CreateCoursesTable';
import { CreateTabTable1702044229563 } from 'src/migrations/1702044229563-CreateTabTable';
import { CreateCoursesTagsTable1702077710302 } from 'src/migrations/1702077710302-CreateCoursesTagsTable';
import { AddCoursesIdToCursesTagsTable1702079834232 } from 'src/migrations/1702079834232-AddCoursesIdToCursesTagsTable';
import { AddTagsIdToCursesTagsTable1702087407670 } from 'src/migrations/1702087407670-AddTagsIdToCursesTagsTable';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1701966964020,
    CreateTabTable1702044229563,
    CreateCoursesTagsTable1702077710302,
    AddCoursesIdToCursesTagsTable1702079834232,
    AddTagsIdToCursesTagsTable1702087407670,
  ],
});
