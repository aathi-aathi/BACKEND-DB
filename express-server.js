import express from 'express'
import connectToDb from './db-utils/mongodb-connection.js';
import mentorRouter from './apis/mentor.js';
import studentRouter from './apis/student.js';
import getStudents from './apis/get-students.js';
import prevMentors from './apis/prev-mentors.js';
import cors from 'cors'
import select_student from './apis/select_student.js';
const server= express();
server.use(cors())
await connectToDb()
server.use(express.json());
server.use("/mentor",mentorRouter)
server.use("/student",studentRouter)
server.use('/get-students',getStudents)
server.use('/prev-mentors',prevMentors)
server.use('/select-student',select_student)
const port= 8010;
server.listen(port,()=>{
    console.log(Date().toString(),"express port : " ,port)
})
