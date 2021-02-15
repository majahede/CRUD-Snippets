import mongoose from 'mongoose'

// Create a schema.
const snippetSchema = new mongoose.Schema({
  value: {
    type: String
  },
  userId: {
    type: Object
  }
})

// create a model using the schema.
export const Snippet = mongoose.model('Snippet', snippetSchema)
