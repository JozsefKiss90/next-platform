import mongoose, { Document, Model, Schema } from 'mongoose';

interface Amp extends Document {
  performance: string,
  email: string,
  time: Date,
}

const ApmSchema = new Schema<Amp>({
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
const AmpModel: Model<Amp> = mongoose.models.apm_test || mongoose.model("apm_test", ApmSchema)
export default AmpModel;