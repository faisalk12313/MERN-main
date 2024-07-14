require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const usersRoutes = require('./routes/users')
const eventsRoutes = require('./routes/events')
const participantsRoutes = require('./routes/participants')
const ticketsRoutes = require('./routes/tickets')
// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/participants', participantsRoutes)
app.use('/api/tickets', ticketsRoutes)

// connect to db
// connect to local db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to local database')
    // listen to port
    app.listen(process.env.PORT || 4000, () => {
      console.log('Listening for requests on port', process.env.PORT || 4000)
    })
  })
  .catch((err) => {
    console.error('Error connecting to local database:', err)
  })