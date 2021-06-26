const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://Tonmoy_Kumar_Roy:Tkrchamak@cluster0.oajhm.mongodb.net/BlogStore?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
    const collection = client.db("BlogStore").collection("Blogs");


    console.log('database connected')

    app.post('/addBlog', (req, res) => {
        const name = req.body.name;
        const blog = req.body.blog;

        collection.insertOne({name, blog})
            .then(result => {
                console.log('Blog added');
                res.send('Blog added');
            })
        res.send('done')
    });

    app.get('/', function (req, res) {
        collection.find({})
        .toArray((err, document) => {
            res.send(document);
        })
    })

});

const PORT = 5000;


app.listen(process.env.PORT || PORT)