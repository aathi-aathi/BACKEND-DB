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
    const {body}=req;
    console.log(body)
    try {
         const checkmentor= await db.collection('students').findOne({id:body.studentId,mentorId:null})
    if(checkmentor){
          
            await db.collection("mentors").updateOne({id:mentorId},{$push:{"students":checkmentor.name}})
            await db.collection("students").updateOne({id:body.studentId},{$set:{mentorId:mentorId}})
            await db.collection('students').updateOne({id:body.studentId},{$push:{"prev_mentors":mentorId}})
            res.send({message:"Student assigned successfully"})
    }
    else{
        res.send({message:'The mentor already assigned to this student'})
    }
    } catch (error) {
        res.status(500).send({message:'Something went wrong'})
    }
   
})

export default mentorRouter;