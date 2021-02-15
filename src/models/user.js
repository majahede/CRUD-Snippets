import mongoose from 'mongoose'

// Create a schema.
const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
})

// create a model using the schema.
export const User = mongoose.model('User', userSchema)
