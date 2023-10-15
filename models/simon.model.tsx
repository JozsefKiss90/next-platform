import mongoose, { Document, Model, Schema } from 'mongoose';

interface Performance {
    correctPercent: number;
    avgCompatibleRT: number;
    avgIncompatibleRT: number;
    simonEffect: number;
}

interface SimonTask extends Document {
  performance: Performance,
  email: string,
  createdAt: Date,
}

const PerformanceSchema = new Schema<Performance>({
    correctPercent: { type: Number, required: true },
    avgCompatibleRT: { type: Number, required: true },
    avgIncompatibleRT: { type: Number, required: true },
    simonEffect: { type: Number, required: true }
});

const SimonTaskSchema = new Schema<SimonTask>({
    performance: { 
        type: PerformanceSchema,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

const SimonTaskModel: Model<SimonTask> = mongoose.models.SimonTask || mongoose.model("SimonTask", SimonTaskSchema);

export default SimonTaskModel;
