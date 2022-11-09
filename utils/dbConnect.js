function dbConnect() {

    const uri = "mongodb+srv://anas:AYEx3Rv6xtEZVVze@cluster0.v3q4mcg.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    console.log('db connected')

}

module.exports = dbConnect;