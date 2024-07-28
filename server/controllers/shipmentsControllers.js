const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { mailTransporter } = require("../utils/Mailer");
const APIFeatures = require("../utils/ApiFeatures");
const shipmentStatus = require("../model/shipmentStatus");
const shipmentStatusWorkflow = require("../model/shipmentStatusWorkflow");
const shipmentStatusWorkflowItem = require("../model/shipmentStatusWorkflowItem");
const shipmentFragment = require("../model/shipmentFragment");
const shipment = require("../model/shipment");

// ShipmentStatu Controllers
exports.deleteShipmentStatus = catchAsync(async (req, res, next) => {
  const { ShipmentStatusID } = req.params;
  const ShipmentStatusitem = await shipmentStatus.findById(ShipmentStatusID);

  if (!ShipmentStatusitem) {
    next(new AppError("ShipmentStatus with this id doesn't existe", 401));
  }

  await shipmentStatus.findByIdAndDelete(ShipmentStatusID);

  res.status(200).send({
    status: ShipmentStatusitem,
  });
});

exports.addManystatus = catchAsync(async (req, res, next) => {
  //   const statusliste = await shipmentStatus.create(req.body);
  const statusliste = await shipmentStatus.create(req.body);
  res.status(200).send({
    status: statusliste,
  });
});

// status workflow controllers
exports.addManyWorkflows = catchAsync(async (req, res, next) => {
  const workflowliste = await shipmentStatusWorkflow.create(req.body);
  res.status(200).send({
    status: workflowliste,
  });
});
exports.deleteWorkflow = catchAsync(async (req, res, next) => {
  const { workflowID } = req.params;
  const workflowitem = await shipmentStatusWorkflow.findById(workflowID);

  if (!workflowitem) {
    next(new AppError("workflow with this id doesn't existe", 401));
  }

  await shipmentStatusWorkflow.findByIdAndDelete(workflowID);

  res.status(200).send({
    status: workflowitem,
  });
});

exports.getWorkflowStatusItem = catchAsync(async (req, res, next) => {
  const { workflowID } = req.params;
  const workflowitem = await shipmentStatusWorkflow.findById(workflowID);
  if (!workflowitem) {
    next(new AppError("workflow with this id doesn't existe", 401));
  }
  const listeStatus = await shipmentStatusWorkflowItem.find({
    workflow: workflowID,
  });

  if (listeStatus.length === 0) {
    next(new AppError("workflow has no status ", 401));
  }

  res.status(200).send({
    status: "successfuly",
    listeStatus,
  });
});

// shipment Status Work flow Item  Controllers
exports.addShimentStatusWorkFlowItem = catchAsync(async (req, res, next) => {
  const result = await shipmentStatusWorkflowItem.create(req.body);

  res.status(200).send({
    status: "successfully",
    result,
  });
});

exports.asignNewnextPossibleStatus = catchAsync(async (req, res, next) => {
  const { newPossibleStatusListe } = req.body;
  const { itemId } = req.params;

  const olditem = await shipmentStatusWorkflowItem.findById(itemId);
  if (!olditem) {
    return next(new AppError("Item nnot found", 401));
  }

  const newItm = await shipmentStatusWorkflowItem.findByIdAndUpdate(itemId, {
    $push: {
      next_possible_status: newPossibleStatusListe,
    },
  });

  res.status(200).send({
    statsu: "successfully",
    newItm,
  });
});

// workflow
exports.getAllworkflows = catchAsync(async (req, res, next) => {
  const workflows = await shipmentStatusWorkflow.find({}).populate({
    path: "StatusList",
    select: "name status next_possible_status",
  });

  res.status(200).send({
    status: "successfuly",
    workflows,
  });
});
exports.ChangeShipmentFragementStatus = catchAsync(async (req, res, next) => {
  const { newStatusId, fragmentId } = req.body;

  const fragment = await shipmentFragment.findById(fragmentId);

  if (!fragment) {
    return next(new AppError("Fragment doesnt existe ", 401));
  }

  const { shipmentId } = fragment;

  const statusItem = await shipmentStatusWorkflowItem.findById(newStatusId);
  const shipmentOfFragment = await shipment.findById(shipmentId);

  // edite current status
  fragment.currentstatus = newStatusId;
  fragment.save({ validateBeforeSave: false });

  if (
    fragment.position === shipmentOfFragment.shipment_fragments.length &&
    !fragment.hasNext &&
    statusItem.position === "end"
  ) {
    shipmentOfFragment.status = newStatusId;
    shipmentOfFragment.save({ validateBeforeSave: false });
  }
  res.status(200).send({
    status: "successfully",
    fragment,
    statusItem,
    shipmentOfFragment,
  });
});
// exports.addShipmentStatus = catchAsync(async (req, res, next) => {});
