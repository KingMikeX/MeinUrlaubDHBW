const mongoose = require('mongoose');
const express = require('express');
const app = express();

//Initialwerte aus .env File auslesen
require('dotenv').config();
const port = process.env.PORT;
const dburl = process.env.DBURL;

//CORS initialisieren, sodass Cross Site Probleme nicht auftreten
const cors = require('cors');
app.use(cors());

//JSON verwendbar machen
app.use(express.json());

//Datenbankgrundinformationen übergeben --> "wo läuft der Server"
mongoose.connect(dburl, {useNewUrlParser: true});
const db = mongoose.connection;

//Datenbankverbindung herstellen
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database connected'));

//Routes verfügbar machen
const productRouter = require('./routes/productRouter');

//der Pfad ist die URL unter der dann die Endpoints, die im Router definiert sind, beginnen
app.use('/', productRouter);

//Server starten
app.listen(port, () => {
    console.log('Produkt Microservice läuft auf Port: ' + port);
})