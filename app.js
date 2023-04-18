const bodyParser = require("body-parser")
const express = require("express")
const port = 3000
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("public"))

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
})
