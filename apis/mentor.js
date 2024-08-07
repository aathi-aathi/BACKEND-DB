import express from 'express'
import { db } from '../db-utils/mongodb-connection.js'

const mentorRouter = express.Router()
mentorRouter.get('/',async(req,res)=>{
    const data =await db.collection('mentors').find({}).toArray()
    res.send(data)
})
mentorRouter.post("/",async(req,res)=>{
    const userData = req.body
    console.log(userData)
    try {
        const collection = db.collection("mentors")
    await collection.insertOne({
        ...userData,
        id:Date.now().toString(),
        students:[]
})
res.send({message:'Mentor created successfully'})
    } catch (error) {
        res.status(500).send({message:'Something went wrong'})
    }
})
mentorRouter.put("/:mentorId",async(req,res)=>{
    const {mentorId}=req.params;
    console.log(mentorId)

    try {
        let checkmentor;
          checkmentor= await db.collection('students').find({isSelected:true}).toArray()
         console.log(checkmentor) 
    
             const mentorObj = await db.collection('mentors').findOne({id:mentorId});
             console.log('mentor',mentorObj)
             checkmentor.map( async(student) =>{
                console.log('student',student)
                 await db.collection("mentors").updateOne({id:mentorId},{$push:{"students":student.name}})
                 await db.collection("students").updateOne({id:student.id},{$set:{mentor:mentorObj.name,mentorId:mentorObj.id}})
                await db.collection('students').updateOne({id:student},{$push:{"prev_mentors":mentorObj.name}})
                await db.collection('students').updateOne({id:student.id},{$set:{isSelected:false}})
             })
           
            res.send({message:"Student assigned successfully"})
    
    // else{
    //     res.send({message:'The mentor already assigned to this student'})
    // }

} 
        
     catch (error) {
        res.status(500).send({message:'Something went wrong'})
    }
   
})

export default mentorRouter;