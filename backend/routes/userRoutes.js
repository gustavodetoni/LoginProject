const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users); 
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
});

router.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id); 
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' }); 
      }
      res.json({ message: 'Usuário deletado com sucesso' }); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });  

module.exports = router;