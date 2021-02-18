import { connect as connectDb, connection } from 'mongoose';

export function connect() {
  if (connection.readyState > 0) {
    return;
  }

  return connectDb(process.env.DATABASE_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
}
