require('dotenv').config();
const express = require('express');
const connectDB = require('./server/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();

app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/auth', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
