import mongoose from 'mongoose'

// Create a schema.
const snippetSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  userId: {
    type: Object
  },
  username: {
    type: String
  }
}, {
  timestamps: true
})

// create a model using the schema.
export const Snippet = mongoose.model('Snippet', snippetSchema)
