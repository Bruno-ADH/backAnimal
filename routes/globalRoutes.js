const express = require("express");
const router = express.Router();
const {getAnimals, addAnimals} = require("../controllers/genralControllers.js")

router.get('/', getAnimals);

router.post('/', addAnimals);

module.exports = router;