const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});

const WorkOrderSchema = new mongoose.Schema({
  carId: { type: String },
  userId: { type: String, required: true }, // Add userId field
  serviceType: { type: String, required: true },
  startDate: { type: Date, required: true },
  completionDate: { type: Date },
  technicianAssigned: { type: String },
  tasks: [TaskSchema],
  laborHours: { type: Number },
  costOfService: { type: Number },
  status: { type: String, default: "Pending" },
  serviceNotes: { type: String },
  warrantyOnWork: { type: String },
});

WorkOrderSchema.plugin(AutoIncrement, { inc_field: "workOrderId" });

const WorkOrder = mongoose.model("WorkOrder", WorkOrderSchema);
module.exports = { WorkOrder };


