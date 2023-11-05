import connectToDb from '../../database/db';
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../../models/user.model';
import ApmModel from '../../models/apm.model';
import FlankerModel from '../../models/flanker.model';
import RtModel from '../../models/rt.model';
import HandEyeModel from '../../models/handEye.model';
import HandEye2Model from '../../models/handEye_2.model';
import MemoryModel from '../../models/memory.model';
import SimonModel from '../../models/simon.model';
import HexagonModel from '../../models/hexagon.model';
import ANTModel from '../../models/network.model';
import GameModel from '../../models/game.model';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  

 await connectToDb().catch((err) => res.json(err));

  if (req.method === 'GET') { 
    try {
      const UserData = await UserModel.find();
      res.status(200).json({ data: UserData });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
  } else if (req.method === 'DELETE') {  
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const email = req.body.email;
      
      if (typeof email !== 'string' || !email) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Email must be provided and be a string.' });
      }
      
      const user = await UserModel.findOne({ email: email }).session(session);
      console.log("Deleting user: " + user);

      if(user) {
        await mongoose.connection.collection('accounts').deleteOne({ userId: user._id })
      }
      
      if (!user) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: 'User not found' });
      }
      
      await UserModel.deleteOne({ email: email }).session(session);
      await ApmModel.deleteMany({ email: email }).session(session);
      await FlankerModel.deleteMany({ email: email }).session(session);
      await RtModel.deleteMany({ email: email }).session(session);
      await HandEyeModel.deleteMany({ email: email }).session(session);
      await HandEye2Model.deleteMany({ email: email }).session(session);
      await MemoryModel.deleteMany({ email: email }).session(session);
      await SimonModel.deleteMany({ email: email }).session(session);
      await HexagonModel.deleteMany({ email: email }).session(session); 
      await ANTModel.deleteMany({ email: email }).session(session);
      await GameModel.deleteMany({ email: email }).session(session);
      
      await session.commitTransaction();
      session.endSession();
      res.status(200).json({ message: 'User and all related data deleted successfully' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('Error during deletion:', error);
      res.status(500).json({ message: 'Error deleting user and related data', error });
    }
  } else {
    res.status(500).json({ message: 'HTTP method not valid' });
  }
}
