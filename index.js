import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))


app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.post("/", async (req, res) =>{
    try{
        const response = await axios.get(`https://byabbe.se/on-this-day/${ req.body["month"] }/${ req.body["day"]}/events.json`);
        res.render("index.ejs", {date: response.data.date, events: response.data.events});
    } catch(error){
        console.error(error);
    }
    
});


app.listen(port, () =>{
    console.log(`Listening on port: ${ port }`);
});