const mongoose = require('mongoose');

// constante qui permet de vérifier l'existence ou non de cette clé dans la BDD
const uniqueValidator = require('mongoose-unique-validator');

// création du modèle désiré
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// on appkique le plugin pour vérifier la valeur unique de la donnée
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);