import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  value: {
    type: String
  }
})

// create a model using the schema.
export const Snippet = mongoose.model('Snippet', schema)

// An instance of a model is called a document.
