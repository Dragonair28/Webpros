const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/helpport');
}
const port = 8000;


// Define Mongoose Schema
const helpSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    issue: String
});

const Help = mongoose.model('Help', helpSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})


app.get('/help', (req, res) => {
    const params = {}
    res.status(200).render('help.pug', params);
})

app.post('/help', (req, res) => {
    var myData = new Help(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved in the database")
    });

    // res.status(200).render('help.pug');
})



// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});