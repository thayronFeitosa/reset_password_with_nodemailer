import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (host = 'localhost'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? host : process.env.TYPEORM_HOST,
      database:
        process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST : process.env.TYPEORM_DATABASE,
    }),
  );
};
