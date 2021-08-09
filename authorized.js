const authorized = (req, res, next) => {
    // const { body } = req.query
    const { user } = req.query
    // if (req.body["username"] == d["username"] && req.body["password"] == d["password"]) {
    //     next()
        if (user === "baresi") {
            req.user = { username: "baresi", password: "binar"}
            next()
    } else {
        res.status(401).send("Unauthorized")
    }
}

module.exports = authorized