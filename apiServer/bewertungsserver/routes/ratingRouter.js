const express = require('express');


//Intialisierung des Routers
const router = express.Router();
router.use(express.json());

//Mongoose Schema für Produkte einbinden
const ratingModel = require('../models/ratingModel');


//Neue Produkte anlegen
router.post('/', async(req, res) => {
    
    try{
    const rating = new ratingModel({
        productID: req.body.productID,
        rating: req.body.rating,
        description: req.body.description
    })

    const newRating = await rating.save();

    res.status(201).json(newRating);
    }catch(err){
        res.status(400).json({message: err.message});
    }
})

//Alle Produkte lesen 
router.get('/', async(req, res) => {
    try{
        const ratings = await ratingModel.find();
        res.status(200).json(ratings);

    }catch(err){
        res.status(500).json({message: err.message});
    }
})

//Ein bestimmtes Produkt auslesen
router.get('/:id',getRating,async(req, res) => {
    res.status(200).json(res.rating);
})


//ein Produkt löschen
router.delete('/:id', getRating, async(req, res) => {
    try{
        await ratingModel.deleteOne(res.rating);
        res.status(200).json({message: "Rating erfolgreich gelöscht: " + req.params.id});
    }catch(err){
        res.status(500).json({message: err.message});
    }
})


//ein Produkt updaten
router.put('/:id', getRating, async(req, res) => {
    try{

       res.rating.productID = req.body.productID;
       res.rating.rating = req.body.rating;
       res.rating.description = req.body.description;

       const updatedRating = await res.rating.save();
       res.status(201).json(updatedRating);
       
    }catch(err){
        return res.status(400).json({message: err.message});
    }
})

//alle Ratings zu einem Produkt auslesen
router.get('/product/:id', async(req, res) => {
    try {
        const ratings = await ratingModel.find({productID: req.params.id});
        if(ratings.length == 0){
            res.status(404).json({message: "Keine Bewertungen für Produkt ID " + req.params.id + " gefunden!"});
        }
        res.status(200).json(ratings);
    }catch(err){
        res.json({message: err.message});
    }
})



//MiddleWare Funktion um ein bestimmtes Produkt aus der Datenbank anhand seiner ID auszulesen
async function getRating(req, res, next){
    try{
        rating = await ratingModel.findById(req.params.id);
        if(rating == null){
            return res.status(404).json({message: 'Konnte kein Rating mit der ID ' + req.params.id + " finden"});
        }
        res.rating = rating;
        next();
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

//wir müssen den Router extern verwendbar machen
module.exports = router;

