require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start =async()=> {
    try {
        await connectDB(process.env.DB_URL)
        await Product.deleteMany({})
        await Product.create(jsonProducts)
        console.log("Great Success")
        process.exit(0)
    }
    catch(e) {
        console.log(e)
        process.exit(1)
    }
}
start()