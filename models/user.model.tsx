import mongoose, { Document, Model, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const UserModel: Model<User> =
  mongoose.models.user || mongoose.model<User>('user', UserSchema);

export default UserModel;
