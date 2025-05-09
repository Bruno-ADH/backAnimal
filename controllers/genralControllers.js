"use strict";

const path = require("node:path");
const fs = require("node:fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const animalsJsonFilePath = path.join(__dirname, "..", "mocks/animals.json")

const getAnimals = (req, res) => {    
    try {
        fs.readFile(animalsJsonFilePath, "utf-8", (err, data) => {
            if (err) {
               return res.status(err.status || 500).json({
                    success: false,
                    message: "Erreur lors de la récupération des données",
                    error: err.message
                })
            }

            if (data) {
               return res.status(201).json({
                    success: true,
                    message: "Données récupérées",
                    data: JSON.parse(data)
                })
            }
        })
    } catch (error) {
       return res.status(error.status || 400).json({
            success: false,
            message: "Une erreur s'est produite",
            error: error.message
        })
    }
}

const addAnimals = (req, res) => {
    const {name, url} = req?.body
    console.log('req?.body :>> ', req?.body);
   try {
    if (name && url) {

            fs.readFile(animalsJsonFilePath, 'utf8', (err, data) => {
                if(err) {
                   return res.status(err.status || 500).send({
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
                       return res.status(err.status || 500).json({
                            success: false,
                            message: "Une erreur s'est produite lors de l'enregistrement des données",
                            error: err.message
                        })
                    }
                   return res.status(201).json({
                        success: true,
                        message: "Données enregistrées",
                        data: {name, url}
                    })
                })
            })

    } else {
       return res.status(400).send({
            success: false,
            message: "Veuillez renseigner tous les champs",
        })
    }
   } catch (error) {
   return res.status(error.status || 500).json({
        success: false,
        message: error.message
    });
   }
}

module.exports = {getAnimals, addAnimals}