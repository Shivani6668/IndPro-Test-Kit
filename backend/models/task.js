const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,  // Ensure priority is specified
    },
    dueDate: { type: Date, required: true },  // Ensure due date is specified
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

TaskSchema.index({ title: "text" });

module.exports = mongoose.model("Task", TaskSchema);











