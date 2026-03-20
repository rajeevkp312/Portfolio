import mongoose from 'mongoose'

const InternshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    grade: { type: String, trim: true },
    description: { type: String, trim: true },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default mongoose.model('Internship', InternshipSchema)
