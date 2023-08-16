const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('connected', function (err) {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});