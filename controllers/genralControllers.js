"use strict";

const path = require("node:path");
const fs = require("node:fs");

const animalsJsonFilePath = path.join(__dirname, "..", "mocks/animals.json")

const getAnimals = (req, res) => {    
    try {
        fs.readFile(animalsJsonFilePath, "utf-8", (err, data) => {
            if (err) {
                res.status(err.status || 500).json({
                    success: false,
                    message: "Erreur lors de la récupération des données",
                    error: err.message
                })
            }

            if (data) {
                res.status(201).json({
                    success: true,
                    message: "Données récupérées",
                    data: JSON.parse(data)
                })
            }
        })
    } catch (error) {
        res.status(error.status || 400).json({
            success: false,
            message: "Une erreur s'est produite",
            error: error.message
        })
    }
}

const addAnimals = (req, res) => {
    const {name, url} = req?.body
   try {
    if (name && url) {
        fs.readFile(animalsJsonFilePath, 'utf8', (err, data) => {
            if(err) {
                res.status(err.status || 500).send({
                    success: true,
                    message: "Une erreur s'est produite lors de la lecture du fichier",
                    error: err.message
                })
            }

            let animalsArray = [];

            if (data) {
                animalsArray = JSON.parse(data);
            }
            animalsArray.push({name, url})  
            
            fs.writeFile(animalsJsonFilePath, JSON.stringify(animalsArray, null, 2), (err) => {
                if (err) {
                    res.status(err.status || 500).json({
                        success: false,
                        message: "Une erreur s'est produite lors de l'enregistrement des données",
                        error: err.message
                    })
                }
                res.status(201).json({
                    success: true,
                    message: "Données enregistrées",
                    data: {name, url}
                })
            })
        })
    } else {
        res.status(400).send({
            success: false,
            message: "Veuillez renseigner tous les champs",
        })
    }
   } catch (error) {
    res.status(error.status || 500).json({
        success: false,
        message: error.message
    });
   }
}

module.exports = {getAnimals, addAnimals}