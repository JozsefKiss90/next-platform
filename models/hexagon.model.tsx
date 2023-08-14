import mongoose, { Document, Model, Schema } from 'mongoose';

interface Hexagon extends Document {
  errorCount: number;
  email: string;
 // time: Date;
}

let HexagonSchema: Model<Hexagon>;
try {
  HexagonSchema = mongoose.model<Hexagon>('hexagon_schema');
} catch (error) {
  HexagonSchema = mongoose.model<Hexagon>(
    'hexagon_schema', 
    new Schema<Hexagon>({
      errorCount: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      //time: { type: Date, default: Date.now },
    }, { collection: 'hexagon_schema' })
  );
}

export default HexagonSchema;
