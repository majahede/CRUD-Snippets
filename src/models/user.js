import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Create a schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minlength: [8, 'The password must be at least 8 charachters.'],
    required: true
  }
}, {
  timestamps: true
})

// hash anbd salt
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

// create a model using the schema.
export const User = mongoose.model('User', userSchema)
