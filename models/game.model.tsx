import mongoose, { Document, Model, Schema } from 'mongoose';

interface Game extends Document {
  game: string;
  email: string;
  rank: string,
  bestRank: string,
  gameTime: number,
  age: number,
} 

const GameSchema = new Schema<Game>({
  game: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rank: {
    type: String,
    required: true,
  },
  bestRank: {
    type: String,
    required: true,
  }, 
  gameTime: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true
  }
});

const GameModel: Model<Game> =
  mongoose.models.game_test ||
  mongoose.model<Game>('game_test', GameSchema);

export default GameModel;
