import connectToDb from '../../database/db'
import User from '../../models/user.model';
import { getToken } from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../../service/UserServiceImpl';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (password != process.env.NEXT_EXTERNAL_API_AUTH_PASSWORD) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await connectToDb();

    const user = await User.findOne({ email: email });
    console.log(user?.email)
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const isValid = await userService.signInCredentials(user?.email, password);  

    if (isValid) {
        const token = jwt.sign(
            { email: user.email, role: user.role },  
            process.env.NEXTAUTH_SECRET!,                 
            { expiresIn: '1h' }                     
        );
        console.log("TOKEN IS: " + token);
        return res.status(200).json({ token: token });
    } else {
        return res.status(401).json({ error: 'Authentication failed' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
