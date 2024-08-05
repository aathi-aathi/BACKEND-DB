import express from 'express'
import { db } from '../db-utils/mongodb-connection.js'

const prevMentors = express.Router()
prevMentors.get('/:studentId',async(req,res)=>{
  const {studentId} = req.params
  try {
      const mentorsData = await db.collection('students').findOne({id:studentId},{projection:{'prev_mentors':1,_id:0}})
  const prevArr = mentorsData.prev_mentors
  const previous_mentor = prevArr[prevArr.length-2]
  const data = await db.collection('mentors').findOne({id:previous_mentor})
  res.send(data)
  } catch (error) {
    res.status(500).send({message:'Something went wrong'})
  }
})
export default prevMentors;