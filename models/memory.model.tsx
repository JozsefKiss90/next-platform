import mongoose, { Document, Model, Schema } from 'mongoose';

interface Memory extends Document {
  memorySpan: number;
  email: string;
}

const MemorySchema = new Schema<Memory>({
  memorySpan: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
});

const MemoryModel: Model<Memory> =
  mongoose.models.memory_test ||
  mongoose.model<Memory>('memory_test', MemorySchema);

export default MemoryModel;
