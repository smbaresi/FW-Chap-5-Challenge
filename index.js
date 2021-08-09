const fs = require("fs");
const express = require("express");
const store = require("store");
const app = express();
const authorized = require("./authorized");
const path = require("path");
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    let f = store.get("username") || "login"
    if (f != "login") {
        f = f.userName
    }
    res.render("home", { 
        username: f})
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
    res.render("login")
})

app.get("/home", [authorized], (req, res) => {
    let f = store.get("username") || "login"
    if (f != "login") {
        f = f.userName
    }
    res.render("home", { 
        username: f})
})


app.get("/suit", [authorized], (req, res) => {
    res.render("suit")
})

app.all("*", (req, res) => {
    res.status(404).send("<h1> resource not found</h1>")
})

app.listen(port, () => {
    console.log("running node on port 3000")
})