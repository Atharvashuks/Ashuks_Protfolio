import mongoose from "mongoose";

const ProjectSectionSchema = new mongoose.Schema(
  {
    name: String,
    tag: String,
  },
  { timestamps: true }
);

const ProjectSection =
  mongoose.models.ProjectSection ||
  mongoose.model("ProjectSection", ProjectSectionSchema);

export default ProjectSection;
