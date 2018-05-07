require('dotenv').config();
let express = require('express');
let app = express();

let server=require('http').createServer(app);
let io=require('socket.io')(server);
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let taskRoute=require('./routes/taskRoute');
const PORT=process.env.PORT||'3001';
const DB_ADMIN_USERNAME=process.env.DB_ADMIN_USERNAME||'satyam';
const DB_ADMIN_PASSWORD=process.env.DB_ADMIN_PASSWORD||'satyam123';

//mongoose.connect(`mongodb://${DB_ADMIN_USERNAME}:${DB_ADMIN_PASSWORD}@localhost:27017/todoapp`);
mongoose.connect(`mongodb://localhost:27017/todoapp`);

app.use(bodyParser.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers"
  );
  next();
})

app.use('/',taskRoute);

io.on('connection',socket=>{
  console.log('User connected');

  socket.on('send message',(message)=>{
    io.sockets.emit('receive message',message);
  });

  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });
})

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));
