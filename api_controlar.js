
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = process.env.DB_BASE
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const data_base = client.db("JOBS")
const fresher_data = data_base.collection('fresher')
const all_data = data_base.collection("company_details")
const topCompany = data_base.collection('top_companys')

// Get all fresher jobs data
const fresher_job = async (req, res) => {
    try {
        const query = {}
        const fresher = await fresher_data.find(query).toArray()

        res.send({
            status: true,
            message: "Product fonud from the database",
            data: fresher
        })

    } catch (error) {
        return res.send({
            status: 404,
            message: error.message
        })
    }
}
// Get all top company jobs data
const top_comapyFn = async (req, res) => {
    try {
        const query = {}
        const fresher = await topCompany.find(query).toArray()

        res.send({
            status: true,
            message: "Product fonud from the database",
            data: fresher
        })

    } catch (error) {
        return res.send({
            status: 404,
            message: error.message
        })
    }
}

// //filter category data for one item
const filter_data = async (req, res) => {
    try {
        const param = req.params.name
        const filter = { name: param }

        const single_data = await all_data.findOne(filter)

        res.send({
            data: single_data,
            status: true,
            message: "Data fatching successfull"
        })

    } catch (error) {
        res.send({
            status: 404,
            message: "Data not found"
        })
    }
}

module.exports = {
    fresher_job,
    filter_data,
    top_comapyFn
}