require('dotenv').config()
const express = require('express')
const { Connect } = require("./connection")
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./Router/Auth.Route')
const profileRouter = require('./Router/Profile.Route')
const botRouter = require('./Router/Bot.Route')
const DoctorRouter = require('./Router/Doctor.Route')
const AdminRouter = require('./Router/Admin.Route')
const helmet = require('helmet');
const app = express()
const PORT = process.env.PORT
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Vite default port
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet());

// Connect(process.env.MONGODB_URL).then(() => console.log("Database Connected Successfull!!")).catch((err) => console.log(err))
let isDBConnected = false;
async function connectToDB() {
    try {
        await Connect(process.env.MONGODB_URL);
        isDBConnected = true;
        console.log("Database Connected Successfull!!");
    } catch (error) {
        console.log(error);
    }
}
app.use((req, res, next) => {
    if (!isDBConnected) {
        connectToDB();
    }
    next();
}); 

app.use('/api', authRouter)
app.use('/api', profileRouter)
app.use('/api', botRouter)
app.use('/api', DoctorRouter)
app.use('/api', AdminRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
// app.listen(PORT, () => {
//   console.log("Server is Successfully Running!!");
// })

module.exports = app