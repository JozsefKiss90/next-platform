import connectToDb from '../../database/db'
import HandEye from '../../models/handEye.model'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    connectToDb()
    .catch(err=>res.json(err)) 
    if(req.method === 'GET') {
        try {
            const rtData = await HandEye.find();
            res.status(200).json({ data: rtData });
          } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error });
          }
    }
    else if(req.method === 'POST') {
        if (!req.body) return res.status(400).json({ error: 'Form data is missing' });

        console.log("req body:", req.body); 
        const { performance, email } = req.body;
  
        const newTask = await HandEye.create({ performance, email });
        res.status(201).json({ status: true, user: newTask });
    }
    else { 
        res.status(500).json({message: 'HTTP method not valid'})
    }
}