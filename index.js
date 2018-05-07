require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let taskRoute=require('./routes/taskRoute');
let app = express();

const PORT=process.env.PORT||'3001';
const DB_ADMIN_USERNAME=process.env.DB_ADMIN_USERNAME||'satyam';
const DB_ADMIN_PASSWORD=process.env.DB_ADMIN_PASSWORD||'satyam123';

mongoose.connect(`mongodb://${DB_ADMIN_USERNAME}:${DB_ADMIN_PASSWORD}@localhost:27017/todoapp`);

app.use(bodyParser.json({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers"
  );
  next();
});
app.use('/',taskRoute);
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
