import mongoose from 'mongoose'

const AchievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, trim: true },
    order: { type: Number, default: 0 },
    links: [
      {
        label: { type: String, trim: true },
        url: { type: String, trim: true }
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model('Achievement', AchievementSchema)
