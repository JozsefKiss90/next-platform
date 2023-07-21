import mongoose, { Document, Model, Schema } from 'mongoose';

interface Loads {
  congruentHighLoadRt: number | undefined;
  congruentLowLoadRt: number | undefined;
  incongruentHighLoadRt: number | undefined;
  incongruentLowLoadRt: number | undefined;
}

interface Flanker extends Document {
  rt: number;
  accuracy: number;
  email: string;
  loads: Loads;
}

const FlankerSchema = new Schema<Flanker>({
  rt: {
    type: Number,
    required: true,
  },
  accuracy: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  loads: {
    type: {
      congruentHighLoadRt: Number,
      congruentLowLoadRt: Number,
      incongruentHighLoadRt: Number,
      incongruentLowLoadRt: Number,
    },
    required: true,
  },
});

const FlankerModel: Model<Flanker> =
  mongoose.models.flanker_test ||
  mongoose.model<Flanker>('flanker_test', FlankerSchema);

export default FlankerModel;
