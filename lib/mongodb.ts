// import mongoose from "mongoose";

// // nehalpradhan23

// const connectToDB = async () => {
//   try {
//     await mongoose.connect(process.env.MongoURL as string);
//     console.log("Database connected...");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default connectToDB;

import mongoose from "mongoose";

async function connect(): Promise<void> {
  try {
    await mongoose.connect(process.env.MongoURL as string);
    console.log("DB connected...");
  } catch (error) {
    console.error(error);
  }
}

export default connect;
