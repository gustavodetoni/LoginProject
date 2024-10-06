const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  host: "smt.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const resetToken = generateToken();
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 300000; //milisegundos -> 5 minutos
    await user.save();

    const mailOptions = {
      to: user.email,
      subject: 'Redefinição de Senha',
      text: `Você está recebendo este email porque solicitou a redefinição da sua senha.\n\n` +
            `Por favor, use o seguinte código para redefinir sua senha: ${resetToken}\n\n` +
            `Esse código é válido por 5 minutos.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Erro ao enviar email', error });
      }
      res.json({ message: 'Código de redefinição de senha enviado para o email' });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const generateToken = () => {
    const token = Math.floor(100000 + Math.random() * 900000);
    return token.toString();
  };

router.post('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ message: 'Código de redefinição inválido ou expirado' });
    }

    user.password = newPassword; 
    user.resetPasswordToken = undefined; 
    user.resetPasswordExpires = undefined; 
    await user.save();

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/validate-token', async (req, res) => {
  const { resetToken } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Código de validação inválido ou expirado' });
    }

    res.json({ message: 'Código de validação bem-sucedido' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
