import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./api/routes/authRoutes";
import adminRoutes from "./api/routes/adminRoutes";
import weatherRoutes from "./api/routes/weatherRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/weather", weatherRoutes);



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});