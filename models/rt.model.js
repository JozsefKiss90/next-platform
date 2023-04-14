const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RtSchema = new Schema({
    rt: { 
        type: Number,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      acc : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.models.rt_test || mongoose.model("rt_test", RtSchema)