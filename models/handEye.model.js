const mongoose = require('mongoose')
const Schema = mongoose.Schema

const handEyeSchema = new Schema({
    performance : {
        type : Array,
        required : true
    },
    email : {
        type : String,
        required : true
        }
    }
)

module.exports = mongoose.models.handeyetest ||  mongoose.model("handeyetest", handEyeSchema)