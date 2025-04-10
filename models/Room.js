import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        unavailabledDates: [Date],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
