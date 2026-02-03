import mongoose from 'mongoose'

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    level: { type: Number, min: 0, max: 100, default: 80 },
    category: { type: String, trim: true },
    icon: { type: String, trim: true }
  },
  { timestamps: true }
)

export default mongoose.model('Skill', SkillSchema)
