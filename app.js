const express = require("express")
const cors = require("cors")
const app = express()
const user_router = require('./api/routers/user-router')
const event_router = require('./api/routers/event-router')
const attendance_router = require('./api/routers/attendance-router')

const dotenv = require('dotenv')
dotenv.config({ path: './.env'})
const PORT = process.env.PORT || 5000

app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', user_router)
app.use('/events', event_router)
app.use('/attendances', attendance_router)

app.listen(PORT, () => {
    console.log("Server started on Port " + PORT)
})
