const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static("/public"))

app.get("/", (req, res) =>{
    fs.readFile("./public//FW-Chap-3-Challenge/html/index.html", (error, data) => {
        res.status(200).write(data)
    })
})

app.post("/login", (req, res) => {
    if (req.body["username"] == "baresi" && req.body["password"] == "binar") {
        res.redirect("./public/FW-Chap-4-Challenge/html/index.html")
    } else {
        res.redirect(reg.bod)
    }
})

app.get("/test", (req, res) =>{
    fs.readFile("./public/FW-Chap-3-Challenge/html/index.html", (error, data) => {
        res.write(data)
    })
})

app.get("/suit", (req, res) => {
    fs.readFile(".public//FW-Chap-4-Challenge/html/index.html", (error, data) => {
        if (error) throw error;
        res.set("Content-Type", "text/html")
        res.write(data) 
    })
}) 

app.all("*"), (req, res) =>{
    res.status(404).send("<h1> resource not found</h1>")
}

app.listen(port, () => {
    console.log("running node on port 3000")
})


