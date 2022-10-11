const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 4000;
require('dotenv').config();
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://anas:AYEx3Rv6xtEZVVze@cluster0.v3q4mcg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    await client.connect();
    const collectionOne = client.db("anas").collection("projects");
    const collectionTwo = client.db("anas").collection("members");
    const collectionUsers = client.db("anas").collection("users");
    console.log('connected to mongodb');

    const verifyAdmin = async (req, res, next) => {
        const requester = req.decoded.email;
        const requseterAccount = await collectionUsers.findOne({ email: requester });
        if (requseterAccount.role === 'admin') {
            next();
        }
        else {
            res.status(403).send({ message: 'forbidden' });
        }
    }

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

        app.get('/members/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const mems = await collectionTwo.findOne(query);
            res.send(mems);

        });

        app.get('/users', async (req, res) => {
            const users = await collectionUsers.find().toArray();
            res.send(users);
        })





        // post the data in mongodb
        app.post('/members', async (req, res) => {
            const newMember = req.body;
            const result = await collectionTwo.insertOne(newMember);
            res.send(result);
        });


        // DELETE
        app.delete('/members/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await collectionTwo.deleteOne(query);
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