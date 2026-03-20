import mongoose from 'mongoose'

const EducationSchema = new mongoose.Schema(
  {
    yearRange: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default mongoose.model('Education', EducationSchema)
