import mongoose from "mongoose";

const ActivementDetailsSchema = new mongoose.Schema(
  {
    prefix: String,
    metrix: String,
    value: String,
    postfix: String,
  },
  { timestamps: true }
);

const HeroSectionSchema = new mongoose.Schema(
  {
    Logo: String,
    header: [],
    summary: String,
    achivementNumbers: [ActivementDetailsSchema],
  },
  { timestamps: true }
);

const HeroSection =
  mongoose.models.HeroSection ||
  mongoose.model("HeroSection", HeroSectionSchema);

export default HeroSection;
