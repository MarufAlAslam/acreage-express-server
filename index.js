const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const ObjectId = require("mongodb").ObjectId;

// express json
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://acreage_admin:LrRQfzUkPbQr2p2Z@acreagecluster.o9xekrx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // mailing list collection
    const mailingList = client.db("acreage").collection("mailingList");

    // survey collection
    const survey = client.db("acreage").collection("survey");

    // insert a document into the mailing list collection
    app.post("/api/v1/mailingList", async (req, res) => {
      const result = await mailingList.insertOne(req.body);
      res.json(result);
    });

    // get mailing list
    app.get("/api/v1/mailingList", async (req, res) => {
      const result = await mailingList.find({}).toArray();
      res.json(result);
    });

    // insert a document into the survey collection
    app.post("/api/v1/survey", async (req, res) => {
      const result = await survey.insertOne(req.body);
      res.json(result);
    });

    // get survey
    app.get("/api/v1/survey", async (req, res) => {
      const result = await survey.find({}).toArray();
      res.json(result);
    });

    // get survey by object id
    app.get("/api/v1/survey/:id", async (req, res) => {
      const result = await survey.findOne({ _id: new ObjectId(req.params.id) });
      res.json(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
