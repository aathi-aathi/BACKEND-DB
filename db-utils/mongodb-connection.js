import {MongoClient} from "mongodb"

// Mongo URI
const cloudCluster ='@cluster0.gwbexdp.mongodb.net'
const dbName='Education'
const dbUserName = "Aathi";
const dbPassword = "irnR4cYFFdFADSqd"
const cloudURI =`mongodb+srv://${dbUserName}:${dbPassword}${cloudCluster}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(cloudURI)
const db = client.db(dbName);
const connectToDb=async()=>{
try{
    await client.connect();
    console.log("mongodb connect successfully")
}
catch(err){
    console.log("err",err)
    process.exit(1)
}
}
export {client,db}
export default connectToDb