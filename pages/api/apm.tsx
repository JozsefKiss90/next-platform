import connectToDb from '../../database/db'
import apmTask from '../../models/apm.model'

export default async function handler(req, res) {
    connectToDb()
    .catch(err=>res.json(err)) 

    if(req.method === 'GET') {
        try {
            const apmData = await apmTask.find();
            res.status(200).json({ data: apmData });
          } catch (error) {
            res.status(500).json({ message: 'Error fetching data', error });
          }
    }
    else if(req.method === 'POST') {
        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log("req body: " + {...req.body})
        const {performance,email} = req.body
        const checkDuplicate = await apmTask.find({email})
       
        if(checkDuplicate.length > 3) return res.status(422).json({message: 'user already exists'})
 
        apmTask.create({performance,email}, function(err, data ){
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