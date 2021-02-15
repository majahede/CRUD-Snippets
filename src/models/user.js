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

/**
 * Authenticate user.
 *
 * @param {string} username - username.
 * @param {string} password - password.
 *
 * @returns {object} - user
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }
  return user
}

// create a model using the schema.
export const User = mongoose.model('User', userSchema)
