import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", async (req, res) => {

    // Select random image from images folder
    let randomNumber = Math.floor(Math.random()*18)
    let photo = "images/image_" + randomNumber + ".webp";
    
    // Retrieve and present data from public API
    try {
        const response = await axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
        res.render("index.ejs", {quote: response.data, image: photo});
    } catch (error) {
        console.log("Failed to make request:", error.message);
        res.status(500).send("Failed to fetch activity. Please try again.")
    }
});


// Button to trigger new image and quote
app.post("/submit", async (req, res) => {
    let randomNumber = Math.floor(Math.random()*18)
    let photo = "images/image_" + randomNumber + ".webp";

    try {
        const response = await axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
        res.render("index.ejs", {quote: response.data, image: photo});
    } catch (error) {
        console.log("Failed to make request:", error.message);
        res.status(500).send("Failed to fetch activity. Please try again.")
    }
})



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});