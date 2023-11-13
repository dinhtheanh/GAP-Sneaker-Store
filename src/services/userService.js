const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://bmphuong21:21127398@gap-store.uteusqm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);



async function run() {
    try {

        const database = client.db('Gap-store');
        const movies = database.collection('product');
        // Query for a movie that has the title 'Back to the Future'
        const query = { name: 'Air Force 1' };
        const movie = await movies.findOne(query);
        console.log(movie);
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }