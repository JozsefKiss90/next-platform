import GameModel from '../../models/game.model';
import connectToDb from '../../database/db'
import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import { authOptions } from './auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //const clientSessionString = req.headers['x-session'] as string;
    //const clientSession = JSON.parse(clientSessionString);
    
    const session = await getServerSession(req, res, authOptions)   
    

    if(!session || session.user?.role != 'user') {
        return res.status(403).json({ message: 'unauthorized'});
    }
    connectToDb()
    .catch(err=>res.json(err)) 
    if(req.method === 'GET') {
        try {
            const rtData = await GameModel.find();
            res.status(200).json({ data: rtData });
          } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error });
          }
    }
    else if(req.method === 'POST') {
        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log("req body: " + {...req.body})
        const {game,email,rank,bestRank,gameTime,age} = req.body
        console.log(req.body)
        GameModel.create({game,email,rank,bestRank,gameTime,age}, function(err, data ){
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