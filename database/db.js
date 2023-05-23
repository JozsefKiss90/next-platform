const mongoose = require('mongoose')

const connectToDb = (dbName) => {
    mongoose.connect(`mongodb://localhost/${dbName}`)
        .catch(error => console.error(error))
        .then(r => console.log(`Connected to DB: ${r.connection.name}`))
}

async function main() { 
    connectToDb("platform"); 
} 

export default main