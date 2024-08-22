import mongoose from "mongoose";

const TabDataSchema = new mongoose.Schema(
  {
    title: String,
    id: String,
    content: [String],
  },
  { timestamps: true }
);

const AboutSchema = new mongoose.Schema(
  {
    aboutme: String,
    tabData: [TabDataSchema],
    letsConnect: String,
  },
  { timestamps: true }
);

const About = mongoose.models.About || mongoose.model("About", AboutSchema);

export default About;
