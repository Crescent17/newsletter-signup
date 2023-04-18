const bodyParser = require("body-parser")
const express = require("express")
const https = require("https");
require("dotenv").config()
const port = 3000
const app = express()
const apiKey = process.env.API_KEY
const listId = process.env.LIST_ID
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static("public"))

app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
})

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
})

app.post("/", (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data)
    const url = `https://us14.api.mailchimp.com/3.0/lists/${listId}?skip_merge_validation=true&skip_duplicate_check=true`
    const options = {
        method: "POST",
        auth: `crescent17:${apiKey}`
    }
    const request = https.request(url, options, response => {
        response.on("data", () => {
            if (response.statusCode === 200) {
                res.sendFile(`${__dirname}/success.html`)
            } else {
                res.sendFile(`${__dirname}/failure.html`)
            }
        })
    })
    request.write(jsonData)
    request.end()
})

app.post("/failure", (req, res) => {
    res.redirect("/")
})