require('dotenv').config();
const express = require('express');
const connectDB = require('./server/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const resetPasswordRoutes = require('./routes/resetPasswordRoutes');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/auth', resetPasswordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
