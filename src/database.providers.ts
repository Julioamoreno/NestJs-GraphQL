import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'sqlite',
        database: process.env.TYPEORM_DATABASE,
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
      }),
  },
];
