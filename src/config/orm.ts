import { TypeOrmModuleOptions } from '@nestjs/typeorm';

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/projeto.db',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  // migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
};

export default config;
