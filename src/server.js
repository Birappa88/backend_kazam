const express = require("express");
const mqtt = require("mqtt");
const redis = require("redis");
const MongoClient = require("mongodb").MongoClient;

const app = express();

// const host = "j2614451-internet-facing-466cb06d39e23407.elb.ap-south-1.amazonaws.com"
const host = "broker.emqx.io"
const port = 1883
// const clientId = `mqttx_c4f63d3b`

const clientt = mqtt.connect(`mqtt://${host}:${port}`,
    {
        // clientId,
        clean: true,
        username: 'backend_task',
        password: 'G6B2HEfDmfvDA9y',
        connectTimeout: 4000
    }
);
const cache = redis.createClient(
    {
        host: 'redis-11725.c114.us-east-1-4.ec2.cloud.redislabs.com', //apn1-brave-adder-33713.upstash.io
        port: 11725,                                                 //33713
        password: 'kMBLWpWcDIYm7mCRpMI46floHCOJzHfL'                //69b6358deaf14b44a0f44fbdb31adf8b
    }
);

cache.on('error', err => {
    console.log('Error ...' + err);
});

const topic = '/add_Birappa'

clientt.on("connect", function () {
    clientt.subscribe([topic], function (err) {
        if (!err) {
            console.log("Subscribed to topic /add_Birappa");
        }
    });
});

clientt.on("message", function (topic, payload) {
    console.log(topic, "===>", payload.toString())
    cache.RPUSH(
        "BACKEND_TASK_Birappa",
        JSON.stringify({ task: payload.toString() }),
        function (err, count) {
            if (!err) {
                console.log("Task added to cache");
                if (count > 50) {
                    cache.LRANGE(
                        "BACKEND_TASK_Birappa",
                        0,
                        count,
                        function (err, tasks) {
                            if (!err) {

                                //mongodb+srv://backend-task:LZwz8vtxZyVYFsYe@freecluster.qqan4im.mongodb.net/
                                const db = new MongoClient("mongodb+srv://Birappa:MangoDB@cluster0.m5phg.mongodb.net/backend_tasks", {
                                    useNewUrlParser: true,
                                    useUnifiedTopology: true,
                                })
                                db.connect((error) => {
                                    const collection = db.db("backend_tasks").collection("backend_tasks_Birappa");
                                    collection.insertMany(
                                        tasks.map(function (task) {
                                            return JSON.parse(task);
                                        }),
                                        function (err, result) {
                                            if (!err) {
                                                console.log("Tasks moved to MongoDB");
                                                cache.del("BACKEND_TASK_Birappa", function (
                                                    err
                                                ) {
                                                    if (!err) {
                                                        console.log("Cache flushed");
                                                    }
                                                });
                                            }
                                        })
                                })
                            }
                        }
                    );
                }
            }
        }
    );
});

app.get("/fetchAllTasks", function (req, res) {
    cache.LRANGE(
        "BACKEND_TASK_Birappa",
        0,
        -1,
        function (err, tasks) {
            if (!err) {
                res.json({
                    count: tasks.length,
                    Data: tasks.map(function (task) {
                        return JSON.parse(task);
                    })
                });
            } else {
                res.status(500).send("Error fetching tasks");
            }
        }
    );
});


const PORT = 3000

app.listen(PORT, function () {
    console.log(`HTTP API listening on port ${PORT}`);
});
