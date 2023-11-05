import connectToDb from '../../database/db'
import { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '../../models/user.model'
import ApmModel from '../../models/apm.model'
import FlankerModel from '../../models/flanker.model'
import RtModel from '../../models/rt.model'
import HandEyeModel from '../../models/handEye.model'
import HandEye2Model from '../../models/handEye_2.model'
import MemoryModel from '../../models/memory.model'
import SimonModel from '../../models/simon.model'
import HexagonModel from '../../models/hexagon.model'
import ANTModel from '../../models/network.model'
import GameModel from '../../models/game.model'
import mongoose, { FilterQuery } from 'mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDb()
    
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
      return
    }

    const { email } = req.query
    if (!email || typeof email !== 'string') {
      res.status(400).json({ success: false, error: 'Email is required and must be a string.' })
      return
    }

    const userEmail = email.toLowerCase()

    const user = await UserModel.findOne({ email: userEmail }).lean().exec()

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found.' })
      return
    }

    const accounts = await mongoose.connection.collection('accounts').find({ userId: user._id }).toArray()
    console.log(accounts)

    const models = [ApmModel, FlankerModel, RtModel, HandEyeModel, HandEye2Model, MemoryModel, SimonModel, HexagonModel, ANTModel, GameModel]
    const modelDataPromises = models.map((model : any) =>
      model.find({ email: userEmail }).lean().exec()
    )    
    const modelDataResults = await Promise.allSettled(modelDataPromises)

    modelDataResults.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Query for model ${models[index].modelName} failed:`, result.reason)
      }
    })

    const combinedData = modelDataResults.reduce((data : any, result, index) => {
      if (result.status === 'fulfilled') {
        data[models[index].modelName.toLowerCase()] = result.value
      }
      return data
    }, {})

    combinedData.user = user
    combinedData.accounts = accounts

    res.status(200).json({ success: true, data: combinedData })
  } catch (error) {
    console.error('Error in API handler:', error)
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
}

  