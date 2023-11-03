import mongoose, { Document, Model, Schema } from 'mongoose';

interface HandEye extends Document {
  performance: number[];
  email: string;
}

const HandEyeSchema = new Schema<HandEye>({
  performance: {
    type: [Number],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const HandEyeModel: Model<HandEye> =
  mongoose.models.handeyetest ||
  mongoose.model<HandEye>('handeyetest_2', HandEyeSchema);

export default HandEyeModel;
