// import mongoose from "mongoose";

// export const connectDB = async () =>{
//     mongoose.connect("",{
//         dbName:"MERN STACK LIBRARY Management System"
//     })
//   .then(() =>{
//     console.log("Database connected successfully");
//   })
//     .catch(err=>{
//         console.error("Error connecting to database:", err);
//     })
// }


import mongoose from 'mongoose';
export async function connectDB() {
  try {
    await mongoose.connect(process.env.CONNECT_DB_URL);
    console.log("You successfully connected to MongoDB! diwash ");
    return mongoose;
  } catch (err) {
    console.dir(err);
  }
}
// Call this only when your application terminates
export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
}

// wpwwI91lb9HVe1EX