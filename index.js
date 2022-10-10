const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000;
require('dotenv').config();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://anas:AYEx3Rv6xtEZVVze@cluster0.v3q4mcg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    await client.connect();
    const collectionOne = client.db("anas").collection("projects");
    const collectionTwo = client.db("anas").collection("members");
    console.log('connected to mongodb');
    try {
        // get the data from mongodb
        app.get('/details', async (req, res) => {
            const query = {};
            const cursor = collectionOne.find(query);
            const results = await cursor.toArray();
            console.log(results);
            res.send(results);
        });
        app.get('/members', async (req, res) => {
            const query = {};
            const cursor = collectionTwo.find(query);
            const results = await cursor.toArray();
            console.log(results);
            res.send(results);
        });






        // post the data in mongodb
        app.post('/members', async (req, res) => {
            const newMember = req.body;
            const result = await collectionTwo.insertOne(newMember);
            res.send(result);
        });


    } finally {




    }
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send(' this is the new creation')
});
app.listen(port, () => {
    console.log('db connected')
})