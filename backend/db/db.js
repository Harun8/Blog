import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  const mongoURI =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI;

  const dbname = "Blog";

  try {
    await mongoose.connect(mongoURI, {
      dbName: dbname,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("ERROR", error);
  }
};
