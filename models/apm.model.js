const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApmSchema = new Schema({
      performance: { 
          type: String,
          required: true
        },
      email: {
        type: String,
        required: true
      },
      time : { type : Date, default: Date.now }
})

module.exports = mongoose.models.apm_test || mongoose.model("apm_test", ApmSchema)