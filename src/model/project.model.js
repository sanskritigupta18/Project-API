import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        required: true,
    },
    image:
    {
        type: String,
    },
    github_url:
    {
        type: String,
    },
    project_url:
    {
        type: String,
    },
    techstack:
    {
        type: [String],
    },
},{timestamps: true});

export const Project = mongoose.model("Project", projectSchema);