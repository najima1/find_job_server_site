const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const { fresher_job, filter_data } = require('./api_controlar')
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const api_Fn = async () => {
    try {
        // get all fresher data
        app.get('/fresher', fresher_job)

        //get single data from all details data
        app.get("/fresher/:name", filter_data)

    } catch (error) {
        res.send({
            message: error.message,
            status: "404"
        })
    }
}

api_Fn()

app.listen(port, (req, res) => {
    console.log("Server is running on port" + port);
})