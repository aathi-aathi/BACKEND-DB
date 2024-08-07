import express from "express";
import { db } from "../db-utils/mongodb-connection.js";

const select_student = express.Router()
select_student.put('/:studentId',async(req,res)=>{
  const studentId = req.params.studentId
  const studentObj= await db.collection('students').findOne({id:studentId,isSelected:false})
  console.log('Student',studentObj)
    if(studentObj){
    await db.collection('students').updateOne({id:studentId},{$set:{isSelected:true}})
    res.send({msg:'student selected'})
   }else{
    await db.collection('students').updateOne({id:studentId},{$set:{isSelected:false}})
    res.send({msg:'un selected'})
  }
  
  
})
export default select_student;