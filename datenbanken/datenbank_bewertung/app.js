const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

const port = process.env.PORT;
const dburl = process.env.DBURL;




app.use(express.json());

//1. STELLE GRUNDSÄTZLICH BEI SERVERSTART ERSTMAL DIE DB-Verbindung 
mongoose.connect(dburl, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open',() => console.log("Database conntected: " + dburl));

//wir verwenden das productModel "Modell" als Vorlage
const productModel = require('./models/productModel');

//2. NEUES PRODUKT ANLEGEN 
app.post('/', async (req, res) => {
    //im Body erhalten wir --> Name, Description und Price für ein Produkt 
    //die Daten aus dem Body schreiben wir in eine neue Konstante
    //die neue Konstante in der Datenbank speichern
    try{
        const  newProduct = new productModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price 
        })
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

//3. alle Produkte ausgeben 
app.get('/', async(req, res) => {
    try{
        const products = await productModel.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

app.listen(port, () => {console.log("Server gestartet unter Port: " + port)});