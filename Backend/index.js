require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");

// const serviceAccount = require("path/to/serviceAccountKey.json");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const verifyFireBaseToken = async (req, res, next) => {
      const authorization = req.headers.authorization;
      if (!authorization) {
            return req.status(401).send({ message: "unauthorized access" });
      }
      const token = authorization.split(" ")[1];

      try {
            const decode = await admin.auth().verifyIdToken(token);
            req.token_email = decode.email;
            next();
      } catch (error) {
            return res.status(401).send({ message: "unauthorized access" });
      }
};

app.get("/", (req, res) => {
      res.send("backend running for using mongodb");
});

const url = process.env.MONGODB_URL;
const client = new MongoClient(url, {
      serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
      },
});

const run = async () => {
      try {
            await client.connect();
            const db = client.db(process.env.MONGODB_NAME);
            const challengeCol = db.collection("challenges");
            const userChallengeCol = db.collection("user_challenges");
            const tipsCol = db.collection("tips");
            const eventsCol = db.collection("events");

            //challenge api create

            app.get("/api/challenges", async (req, res) => {
                  const cursor = challengeCol.find();
                  const result = await cursor.toArray();
                  res.send(result);
            });
            app.get("/api/challenges/:id", async (req, res) => {
                  const id = req.params.id;

                  const query = { _id: new ObjectId(id) };

                  const result = await challengeCol.findOne(query);
                  res.send(result);
            });

            //post && patch & delete api challenge
            app.post("/api/challenges", async (req, res) => {
                  const newPost = req.body;
                  const result = await challengeCol.insertOne(newPost);
                  res.send(result);
            });
            app.patch("/api/challenges/:id", async (req, res) => {
                  const id = req.params.id;
                  const updatePost = req.body;
                  const query = { _id: new ObjectId(id) };
                  const update = {
                        $set: updatePost,
                  };
                  const options = {};
                  const result = await challengeCol.updateOne(query, update, options);
                  res.send(result);
            });
            app.delete("/api/challenges/:id", async (req, res) => {
                  const id = req.params.id;
                  const query = { _id: new ObjectId(id) };
                  const result = await challengeCol.deleteOne(query);
                  res.send(result);
            });

            await client.db("admin").command({ ping: 1 });
      } catch (error) {
            throw new Error(error);
      }
};
run().catch((err) => {
      throw new Error(err);
});

app.listen(port, () => {
      console.log(`server is running:${port}`);
});
