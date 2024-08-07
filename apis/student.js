import express from 'express'
import { db } from '../db-utils/mongodb-connection.js'

const studentRouter = express.Router()
studentRouter.get('/',async(req,res)=>{
    const data =await db.collection('students').find({}).toArray()
    res.send(data)
})
studentRouter.post("/",async(req,res)=>{
    const {body}=req
    try {
        const collection = db.collection("students")
    await collection.insertOne({
        ...body,
        id:Date.now().toString(),
        mentor:null,
        prev_mentors:[],
})
res.send({msg:"Inserted Data successfully"})
    } catch (error) {
        res.status(500).send({message:'Something went wrong'})
    }   
})
studentRouter.put("/",async(req,res)=>{
    const userData = req.body
    console.log(userData)
    try {
         const checkmentor= await db.collection('students').findOne({id:userData.studentId,mentorId:userData.mentorId})
         console.log('student',checkmentor)
         const mentorObj = await db.collection('mentors').findOne({id:userData.mentorId})
         const studentObj = await db.collection('students').findOne({id:userData.studentId})
    if(checkmentor == null){
        await db.collection("students").updateOne({id:userData.studentId},{$set:{mentor:mentorObj.name,mentorId:userData.mentorId}})
        await db.collection("mentors").updateOne({id:userData.mentorId},{$push:{"students":studentObj.name}})
        await db.collection('students').updateOne({id:userData.studentId},{$push:{"prev_mentors":mentorObj.name}})
        res.send({message:"Teacher assigned successfully"})
       
         
    }
    else{
        res.status(402).send({message:'The student already assigned to this mentor',code:1})
    }
    } catch (error) {
        res.status(500).send({message:'Something went wrong'})
    }
       

})
export default studentRouter;