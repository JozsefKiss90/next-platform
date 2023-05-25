import connectToDb from '../../../database/db'
import User from '../../../models/user.model'
import {hash} from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    connectToDb()
    .catch(err=>res.json(err)) 

    if(req.method === 'POST'){
        if(!req.body) return res.status(404).json({error:'form data is missing'})
       
        const {username,email, password} = req.body
        const checkDuplicate = await User.findOne({email})
        console.log(checkDuplicate)
        if(checkDuplicate) return res.status(402).json({message: 'user already exists'})

        User.create({username, email, password:await hash(password,12),  role:"user"}, function(err, data ){
            if(err) return res.status(404).json({err})
            res.status(201).json({status:true, user:data})
        })
    } else { 
        res.status(500).json({message: 'HTTP method not valid'})
    }
}



