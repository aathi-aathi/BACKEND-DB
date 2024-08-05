import express from 'express'
import { db } from '../db-utils/mongodb-connection.js'

const getStudents = express.Router()

getStudents.get('/:mentorId',async(req,res)=>{
   const {mentorId} = req.params 
   try {
        const studentsData = await db.collection('students').find({mentorId:mentorId}).toArray()
     res.send(studentsData)
   } catch (error) {
    res.status(500).send({message:'Something went wrong'})
   }

})


export default getStudents;
