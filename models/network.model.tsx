import mongoose, { Document, Model, Schema } from 'mongoose';

interface ANT extends Document {
  rt: number;
  accuracy: number;
  performance: object;
  email: string;
  time: Date;
}

const ANTSchema = new Schema<ANT>({
  rt: {
    type: Number,
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  performance: {
    type: Schema.Types.Mixed,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

const ANTModel: Model<ANT> =
  mongoose.models.ANT_test ||
  mongoose.model<ANT>('ANT_test', ANTSchema);

export default ANTModel;
