import mongoose from "mongoose";

// nehalpradhan23

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MongoURL as string);
    console.log("Database connected...");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
