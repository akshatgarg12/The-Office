const mongoose = require("mongoose");
const { ObjectId, Date } = mongoose.SchemaTypes;

const requestDataSchema = new mongoose.Schema({
  // if request is bonus
  amount: {
    type: Number,
  },
  // if request is leave
  dates: {
    type: [Date],
  },
  message: {
    type: String,
    required: [true, "message is required"],
  },
});

const requestSchema = new mongoose.Schema(
  {
    employee_id: {
      type: ObjectId,
      ref: "Employee",
      required: [true, "employee id is required"],
    },
    type: {
      type: String,
      enum: ["bonus", "leave", "payroll"],
      required: [true, "employee id is required"],
    },
    data: {
      type: requestDataSchema,
      required: [true, "body of request is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      required: [true, "status is required"],
      default: "pending",
    },
    resolved_by: {
      type: ObjectId,
      ref: "Employee",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("Request", requestSchema);
