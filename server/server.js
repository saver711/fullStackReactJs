// imports ✊
const express = require("express") // include express.
var cors = require("cors") // providing a Connect/Express middleware to enable CORS.
const dotenv = require("dotenv") //load environment variables from a .env file
const fs = require("fs")
const { MongoClient } = require("mongodb")

// config 👨‍🔧
const app = express() // start a new Express application
app.use(cors())
dotenv.config()

// mongodb 🛅
const client = new MongoClient(process.env.MONGODB)
let data
async function run() {
  try {
    const database = client.db("try1")
    const collection = database.collection("try1-1")
    data = await collection.findOne({ type: "pos" })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)

// localData 🗃️
const dummyData = JSON.parse(fs.readFileSync("./DummyData/TestData.json"))

//routes 🔀
app.get("/words", (req, res) => {
  //json response from mongodb (uninstall mongodb if i won't work with this way)
  res.json(data)
  //json response from file (dummyData)
  // res.json(dummyData)
  // json response (directly)
  // res.json({
  //   "wordList": [
  //     {
  //       id: 1,
  //       word: "slowly",
  //       pos: "adverb",
  //     },
  //     {
  //       id: 2,
  //       word: "ride",
  //       pos: "verb",
  //     },
  //     {
  //       id: 3,
  //       word: "bus",
  //       pos: "noun",
  //     },
  //     {
  //       id: 4,
  //       word: "commute",
  //       pos: "verb",
  //     },
  //     {
  //       id: 5,
  //       word: "emissions",
  //       pos: "noun",
  //     },
  //     {
  //       id: 6,
  //       word: "walk",
  //       pos: "verb",
  //     },
  //     {
  //       id: 7,
  //       word: "fast",
  //       pos: "adjective",
  //     },
  //     {
  //       id: 8,
  //       word: "car",
  //       pos: "noun",
  //     },
  //     {
  //       id: 9,
  //       word: "crowded",
  //       pos: "adjective",
  //     },
  //     {
  //       id: 10,
  //       word: "arrival",
  //       pos: "noun",
  //     },
  //     {
  //       id: 11,
  //       word: "emit",
  //       pos: "verb",
  //     },
  //     {
  //       id: 12,
  //       word: "independent",
  //       pos: "adjective",
  //     },
  //     {
  //       id: 13,
  //       word: "convenient",
  //       pos: "adjective",
  //     },
  //     {
  //       id: 14,
  //       word: "lane",
  //       pos: "noun",
  //     },
  //     {
  //       id: 15,
  //       word: "heavily",
  //       pos: "adverb",
  //     },
  //   ],
  //   "scoresList": [
  //     20, 90, 100, 50, 10, 50, 60, 0, 60, 10, 90, 30, 100, 30, 20, 90, 40, 20,
  //     10, 60, 50, 100, 50, 80, 50, 80, 60, 80, 10, 40,
  //   ],
  // })
})

// make the server listen to requests 🙉
const PORT = process.env.PORT || 8000
app.listen(PORT, () =>
  console.log(`Server running at: http://localhost:${PORT}/`)
)
