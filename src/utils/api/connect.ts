import { connect as connectDb, connection } from 'mongoose';

export function connect() {
  if (connection.readyState > 0) {
    return;
  }

  return connectDb(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
}
