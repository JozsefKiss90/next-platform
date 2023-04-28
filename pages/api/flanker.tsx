import connectToDb from '../../database/db'
import FlankerTask from '../../models/flanker.model'

export default async function handler(req, res) {
    connectToDb()
    .catch(err=>res.json(err)) 

    if(req.method === 'GET') {
        try {
            const rtData = await FlankerTask.find();
            res.status(200).json({ data: rtData });
          } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error });
          }
    }
    else if(req.method === 'POST') {
        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log("req body: " + {...req.body})
        const {rt,accuracy,email,loads} = req.body
        const checkDuplicate = await FlankerTask.find({email})
        console.log(checkDuplicate)
        if(checkDuplicate.length > 3) return res.status(422).json({message: 'user already exists'})

        FlankerTask.create({rt,accuracy,email,loads}, function(err, data ){
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