import mongoose from 'mongoose'

const ProfileImageSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    enum: ['hero', 'about']
  },
  url: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.model('ProfileImage', ProfileImageSchema)
