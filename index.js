const path = require("path");
const express = require("express");
const http = require("http");
const app = express();

const { name } = require("ejs");
const fs = require("fs");
const { json } = require("express");
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send('Helo World');
});


app.set("view engine", "pug");
app.set("view engine", "ejs");



app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.get("/about", (req, res) => {

    // let extname = path.extname(filepath);
    // let contentType = "text/html";

    // switch (extname){
    //     case '.css':
    //     break;
    // }
    fs.readFile("./JSON/quote.json", "utf8", (err, content) => {
        if (err) throw err;


        if (content) {
            console.log(content);
            let json = JSON.parse(content)
            const maxVal = json.length - 1
            const randomInt = getRandomIntIclusive(0, maxVal);
            // res.render("main", {quote: json[0]});
            // let myQuotes = Math.floor(Math.random()*json.length + 1);
            const randomQuote = json[randomInt]
            res.render("main", {
                quote: randomQuote
            
            });

        }

    });

    function getRandomIntIclusive (min, max){
        min = Math.ceil(min);
        max - Math.floor(max);
        return Math.floor(Math.random () * (max - min + 1) + min);
    }
});

 



app.listen(PORT, () => console.log("Server Runing"));