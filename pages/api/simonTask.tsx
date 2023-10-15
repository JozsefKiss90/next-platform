import connectToDb from '../../database/db'
import simonTask from '../../models/simon.model'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    connectToDb()
    .catch(err=>res.json(err)) 

    if(req.method === 'GET') {
        try {
            const apmData = await simonTask.find();
            res.status(200).json({ data: apmData });
          } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error });
          }
    }
    else if(req.method === 'POST') {
        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log("req body: " + {...req.body})
        const {performance,email} = req.body

        //const checkDuplicate = await simonTask.find({email})
        //if(checkDuplicate.length > 2) return res.status(422).json({message: 'user already exists'})
 
        try {
            const newTask = await simonTask.create({ performance, email });
            res.status(201).json({ status: true, user: newTask });
        } catch (err:any) {
            res.status(500).json({ error: err.message });
        }
    }
    else { 
        res.status(500).json({message: 'HTTP method not valid'})
    }
}