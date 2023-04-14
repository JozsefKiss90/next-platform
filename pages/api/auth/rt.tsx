import connectToDb from '../../../database/db'
import RtTask from '../../../models/rt.model'

export default async function handler(req, res) {
    connectToDb()
    .catch(err=>res.json(err)) 

    if(req.method === 'POST'){
        if(!req.body) return res.status(404).json({error:'form data is missing'})
        console.log(req.body)
        const {rt,email, acc} = req.body
        const checkDuplicate = await RtTask.find({email})
        console.log(checkDuplicate)
        console.log('wut')
        if(checkDuplicate.length > 3) return res.status(422).json({message: 'user already exists'})

        RtTask.create({rt,email, acc}, function(err, data ){
            if(err) return res.status(404).json({err})
            res.status(201).json({status:true, user:data})
        })
    }
    else { 
        res.status(500).json({message: 'HTTP method not valid'})
    }
}



