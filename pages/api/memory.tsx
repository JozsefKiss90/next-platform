import connectToDb from '../../database/db'
import Memory from '../../models/memory.model'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDb();
    } catch (err) {
        console.error('Database connection failed', err);
        return res.status(500).json({ message: 'Database connection failed', error: err });
    }

    try {
        if (req.method === 'GET') {
            const memoryData = await Memory.find();
            res.status(200).json({ data: memoryData });
        } else if (req.method === 'POST') {
            if (!req.body) {
                return res.status(400).json({ error: 'Form data is missing' });
            }

            const { memorySpan, email } = req.body;
            const newMemory = new Memory({ memorySpan, email });
            await newMemory.save();
            res.status(201).json({ status: true, memory: newMemory });
        } else {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error handling request', error);
        res.status(500).json({ message: 'Error handling request', error });
    }
}
