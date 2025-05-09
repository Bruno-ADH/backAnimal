const express = require("express");
const cors = require("cors");
const app = express()
const router = require("./routes/globalRoutes.js")

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "https://animal-topia.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))

// app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    const {url, method} = req
    const date = new Date();
    console.log(`[${method}] [${url}] [${date.toLocaleString("fr")}]`);
    next()
})

app.use("/animals", router)

app.get("/", (req, res)=>{
    res.send("Bienvenue sur le serveur");
})

app.use((err, req, res) => {
    console.log('err.stack :>> ', err.stack);
    res.status(err.status || 500).json({
        error: err,
        message: err.message,
        name: "Une erreur s'est produite"
    });
})

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port http://127.0.0.1:${PORT}`);
})