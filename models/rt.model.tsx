import mongoose, { Document, Model, Schema } from 'mongoose';

interface Rt extends Document {
  rt: number;
  email: string;
  acc: number;
}

const RtSchema = new Schema<Rt>({
  rt: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  acc: {
    type: Number,
    required: true,
  },
});

const RtModel: Model<Rt> =
  mongoose.models.rt_test ||
  mongoose.model<Rt>('rt_test', RtSchema);

export default RtModel;
