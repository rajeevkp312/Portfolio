import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    problem: { type: String },
    architecture: [{ type: String }],
    deployment: {
      frontend: { type: String },
      backend: { type: String }
    },
    tags: [{ type: String }],
    githubUrl: { type: String },
    liveUrl: { type: String },
    image: { type: String },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default mongoose.model('Project', ProjectSchema)
