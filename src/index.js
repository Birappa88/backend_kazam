const express = require('express');
const redis = require('redis');
const MongoClient = require('mongodb').MongoClient;
const WebSocket = require('ws');

// Set up Redis client
const redisClient = redis.createClient(
    {
        host: 'redis-11725.c114.us-east-1-4.ec2.cloud.redislabs.com', //apn1-brave-adder-33713.upstash.io
        port: 11725,                                                 //33713
        password: 'kMBLWpWcDIYm7mCRpMI46floHCOJzHfL'                //69b6358deaf14b44a0f44fbdb31adf8b
    }
);  

// Set up MongoDB client
const uri = "mongodb+srv://Birappa:MangoDB@cluster0.m5phg.mongodb.net/test?retryWrites=true&w=majority";
const mongodbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongodbClient.connect((err) => {
  const todoCollection = mongodbClient.db("backend_tasks").collection("backend_tasks_WS_Birappa");
})

// Set up Express app
const app = express();
const port = 8080;

// Endpoint to retrieve all tasks
app.get('/fetchAllTasks', (req, res) => { 
  redisClient.get('BACKEND_TASK_Birappa_WS', (err, result) => {
    if (result) {
      res.send(JSON.parse(result));
    } else {
      todoCollection.find({}).toArray((err, tasks) => {
        res.send(tasks);
      });
    }
  });
});


// Start Express app
app.listen(port, () => {
  console.log(`HTTP server started on port ${port}`);
});

// Set up WebSockets server
const wss = new WebSocket.Server({ port: 8888 });
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const event = JSON.parse(message);
    console.log(event,message)
    if (event.type === 'add') {
      redisClient.get('BACKEND_TASK_Birappa_WS', (err, result) => {
        let tasks;
        if (result) {
          tasks = JSON.parse(result);
        } else {
          tasks = [];
        }
        tasks.push(event.task);
        if (tasks.length > 50) {
          todoCollection.insertMany(tasks, (err, res) => {
            redisClient.del('BACKEND_TASK_Birappa_WS', (err, res) => {
              console.log("Moved tasks from Redis to MongoDB");
            });
          });
        } else {
          redisClient.set('BACKEND_TASK_Birappa_WS', JSON.stringify(tasks), (err, res) => {
            console.log("Added task to Redis");
          });
        }  
      });
    }
  });
});
