const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    hospital: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    units: {
      type: Number,
      required: true,
      min: 1,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    urgency: {
      type: String,
      enum: ["Normal", "Urgent", "Emergency"],
      default: "Normal",
    },

    status:{
      type:String,
      enum:["Pending","Accepted","Rejected","Cancelled"],
      default:"Pending"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);