import mongoose from "mongoose";

const uri =
  "mongodb+srv://Yana:123456789-AAA@cluster.jpltf2e.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
