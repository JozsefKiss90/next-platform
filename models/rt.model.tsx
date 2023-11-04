import mongoose, { Document, Model, Schema } from 'mongoose';

interface Rt extends Document {
  rt: number;
  email: string;
}

let RtSchema: Model<Rt>;
try {
  RtSchema = mongoose.model<Rt>('rt_schema');
} catch (error) {
  RtSchema = mongoose.model<Rt>(
    'rt_schema',
    new Schema<Rt>({
      rt: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      }
    }, { collection: 'rt_schema' })
  ),{
    timestamps: true
  };
}

export default RtSchema;
