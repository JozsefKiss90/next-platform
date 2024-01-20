import connectToDb from '../../database/db'
import RtTask from '../../models/rt.model'
import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    connectToDb()
    .catch(err=>res.json(err)) 
    
    if(req.method === 'GET') {
        
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
     
    try { 
        const userData = await verifyToken(req);
        console.log(userData)
        if (!userData) {
          return res.status(403).json({ message: 'Forbidden' });
        }
        const rtData = await RtTask.find();
        res.status(200).json({ data: rtData }); 
        } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error });
        }
    }

    else if(req.method === 'POST') {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if(!token || token.role != 'user') {
            res.status(403).json({ message: 'unauthorized'});
        } 

        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log("req body: " + {...req.body})
        const {rt,rtArray,email} = req.body
 
        RtTask.create({rt,rtArray,email}, function(err, data ){ 
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

async function verifyToken(req: NextApiRequest) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return null;
  
    try {
      const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
      return decoded;  // or true if you just want to know it's valid
    } catch (error) {
      console.error("Token verification error:", error);
      return null;
    }
  }