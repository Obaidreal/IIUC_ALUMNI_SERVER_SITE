function dbConnect() {

    const uri = "mongodb+srv://anas:AYEx3Rv6xtEZVVze@cluster0.v3q4mcg.mongodb.net/?retryWrites=true&w=majority";
    // const uri = "mongodb+srv://Fahim_Reza:IKTwOUAbHaShf4w8@cluster1.go1dmsx.mongodb.net/";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    console.log('db connected')

}

module.exports = dbConnect;