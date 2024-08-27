import mongoose from "mongoose";

const ProjectsDataSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    image: String,
    tag: [String],
    gitUrl: String,
    previewUrl: String,
  },
  { timestamps: true }
);

const ProjectData =
  mongoose.models.ProjectsData ||
  mongoose.model("ProjectsData", ProjectsDataSchema);

export default ProjectData;
