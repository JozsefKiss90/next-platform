import connectToDb from '../../database/db';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../models/user.model';
import AmpModel from '../../models/apm.model';
import FlankerModel from '../../models/flanker.model';
import RtModel from '../../models/rt.model';
import HandEyeModel from '../../models/handEye.model';
import HexagonSchema from '../../models/hexagon.model';
import ANTModel from '../../models/network.model';
import GameModel from '../../models/game.model';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session || session.user?.role !== 'user') {
    res.status(403).json({ message: 'unauthorized' });
    return;
  }

  connectToDb().catch((err) => res.json(err));

  if (req.method === 'GET') {
    try {
      const UserData = await UserModel.find();
      res.status(200).json({ data: UserData });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
      console.log(email)

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      await UserModel.deleteOne({ email });

      await mongoose.connection.collection('accounts').deleteOne({ _id: user._id });

      await AmpModel.deleteMany({ email });
      await FlankerModel.deleteMany({ email });
      await RtModel.deleteMany({ email });
      await HandEyeModel.deleteMany({ email });
      await HexagonSchema.deleteMany({ email });
      await ANTModel.deleteMany({ email });
      await GameModel.deleteMany({ email });

      res.status(200).json({ message: 'Collections deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting collections', error });
    }
  } else {
    res.status(500).json({ message: 'HTTP method not valid' });
  }
}
