import connectToDb from '../../database/db'
import NetworkTask from '../../models/network.model'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    connectToDb()
    .catch(err=>res.json(err)) 

    if(req.method === 'GET') {
        try {
            const rtData = await NetworkTask.find();
            res.status(200).json({ data: rtData });
          } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error });
          }
    }
    else if(req.method === 'POST') {
        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log("req body: " + {...req.body})
        const {rt,accuracy,performance,email} = req.body
        const checkDuplicate = await NetworkTask.find({email})
        console.log(checkDuplicate)
        if(checkDuplicate.length > 3) return res.status(422).json({message: 'user already exists'})

        await NetworkTask.create({rt,accuracy,performance,email}, function(err, data ){
            if(err) {  
                return res.status(404).json({err})
            }
            res.status(201).json({status:true, user:data})
        })
    }
    else { 
        res.status(500).json({message: 'HTTP method not valid'})
    }
}