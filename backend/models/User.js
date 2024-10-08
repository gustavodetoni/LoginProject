const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true, 
    unique: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    type: String, 
    required: true 
},
  fullName: {
    type: String,
    required: true
  },
  phone: { 
    type: String,
    required: true
  },
  birthDate: { 
    type: Date,
    required: true
  },
  resetPasswordToken: { 
    type: String,
    default: null
  },
  resetPasswordExpires: { 
    type: Date,
    default: null
  }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
