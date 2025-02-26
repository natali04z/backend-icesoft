import { connect } from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_CNN);
    console.log(" Conexión a MongoDB establecida");
  } catch (error) {
    console.error(" Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
