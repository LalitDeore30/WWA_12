const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
mongoose.connect("mongodb://localhost/Real_EstateDB", { useNewUrlParser: true });

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");

var RealSchema = new mongoose.Schema({
    Name: String,
    Number:Number,
    email:String,
    adderess: String,

});
var Contact = mongoose.model('Contact', RealSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'views','contact.html'));
});

app.post('/', (req, res) => {
    const data = new Contact({
        Name: req.body.Name,
        Number: req.body.Number,
        email:req.body.email,
        adderess:req.body.adderess,
    });
    data.save()
        .then(() => {
            res.send("Your data has been saved successfully");
        })
        .catch((err) => {
            console.log(err);
            res.send("An error occurred while saving your data.");
        });
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
