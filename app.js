const express = require('express');
const cors = require('cors');
const app = express();
const user_router = require('./api/routers/user-router');
const event_router = require('./api/routers/event-router');
const attendance_router = require('./api/routers/attendance-router');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const PORT = process.env.PORT || 5000;

//CORS Settings
const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOption));

//Incoming Request Settings
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS'
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', user_router);
app.use('/events', event_router);
app.use('/attendances', attendance_router);

app.listen(PORT, () => {
  console.log('Server started on Port ' + PORT);
});
