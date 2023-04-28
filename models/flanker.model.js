const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FlankerSchema = new Schema({
    rt: { 
        type: Number,
        required: true
      },
    accuracy : {
        type: Number,
        required: true
      },
    email: {
        type: String,
        required: true
      },
    loads: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.models.flanker_test || mongoose.model("flanker_test", FlankerSchema)