import mongoose, { Document, Model, Schema } from 'mongoose';

interface Rt extends Document {
  rt: number;
  email: string;
  acc: number;
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
      },
      acc: {
        type: Number,
        required: true,
      },
    }, { collection: 'rt_schema' })
  );
}

export default RtSchema;
