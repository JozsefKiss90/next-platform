const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ANTSchema = new Schema({
    rt: { 
        type: Number,
        required: true
      },
    accuracy : {
        type: Number,
        required: true
      },  
    performance: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    time : { type : Date, default: Date.now }
})

module.exports = mongoose.models.ANT_test || mongoose.model("ANT_test", ANTSchema)