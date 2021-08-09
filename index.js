const fs = require("fs");
const express = require("express");
const store = require("store");
const app = express();
const authorized = require("./authorized");
const path = require("path");
const port = 3000;

// app.use([authorized])

// app.use(function (req, res, next) {
//     let userName = store.get("username") ||"none"
//     fs.readFile("./public/static.json", (err, data) => {
//         let d = JSON.parse(data)
//         if (userName == d["username"]) {
//             next()
//         } else {
//             // res.redirect("/login") 
//             next()
//         }
//     })  
// })

app.set('view engine', 'ejs');
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public/fw-chap-3-challenge/html/index.html"))
})

app.post("/login", (req, res,) => {
    res.set("Content-Type", "application/json")
    fs.readFile("./public/static.json", (err, data) => {
        let d = JSON.parse(data)
        if (req.body["username"] == d["username"] && req.body["password"] == d["password"]) {
            store.set("username", {userName:d["username"]})
            res.redirect("/home")
        } else {
            res.status(500).send({
                "error": "username/password doesnt match"
            })
        }
    })
})

app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public/login/index.html "))
})

app.get("/home", [authorized], (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public/fw-chap-3-challenge/html/home.html"))
})

app.get("/suit", [authorized], (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public/fw-chap-4-challenge/html/index.html"))
})

app.all("*", (req, res) => {
    res.status(404).send("<h1> resource not found</h1>")
})

app.listen(port, () => {
    console.log("running node on port 3000")
})