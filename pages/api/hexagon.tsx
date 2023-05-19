import connectToDb from '../../database/db'
import HexagonTask from '../../models/hexagon.model'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    connectToDb()
    .catch(err=>res.json(err)) 

    if(req.method === 'GET') {
        try {
            const rtData = await HexagonTask.find();
            res.status(200).json({ data: rtData });
          } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error });
          }
    }
    else if(req.method === 'POST') {
        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log("req body: " + {...req.body})
        const {errorCount,email} = req.body
        
        HexagonTask.create({errorCount,email}, function(err, data){
            if(err) {  
                return res.status(404).json({err})
            }
           return res.status(201).json({status:true, user:data})
        })
    }
    else { 
        return res.status(500).json({message: 'HTTP method not valid'})
    }
} 