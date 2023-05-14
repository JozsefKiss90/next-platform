const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HexagonSchema;
try {
  // Check if the model is already compiled
  HexagonSchema = mongoose.model('hexagon_schema');
} catch (error) {
  // If the model doesn't exist, create a new one
  HexagonSchema = new Schema({
    errorCount: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    time: { type: Date, default: Date.now }
  }, { collection: 'hexagon_schema' });

  // Compile the model
  HexagonSchema = mongoose.model('hexagon_schema', HexagonSchema);
}

module.exports = HexagonSchema;
