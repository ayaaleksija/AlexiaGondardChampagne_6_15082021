// import framework Express pour node.js
const express = require('express');

// package qui nous permettra de gérer la demande POST venant du FE
// extraction de l'objet JSON de la demande
const bodyParser= require('body-parser');

// création des constantes pour importer les routes créées
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const path = require('path');

//package pour faciliter les interaction avec MongoDB
// import du package
const mongoose = require('mongoose');

// Connexion de l'API à MongoDB grace au package mongoose
mongoose.connect('mongodb+srv://ayaaleksija:Xeui3pfx@cluster0.njv0z.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// mise en place du framework après importation
const app = express();

// paramétrage d'entete des requetes globales
app.use((req, res, next) =>{
    // autorisaion d'accès : tout le monde
    res.setHeader('Access-Control-Allow-Origin', '*');
    // autorisation d'utilisation des entetes définies
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // autorisation pour utiliser les méthodes définies
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //on passe au middleware suivant
    next();
});


app.use('/images', express.static(path.join(__dirname, 'images')));

// transforme les données des requetes post en json
app.use(bodyParser.json());

// utilisation des routes vers les sauces
app.use('/api/sauces', sauceRoutes);
// utilisation des routes vers les users
app.use('/api/auth', userRoutes);

module.exports = app;