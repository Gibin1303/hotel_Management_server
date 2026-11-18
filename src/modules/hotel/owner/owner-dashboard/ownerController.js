import asyncHandler from "../../../../utils/asyncHandler.js";
import { getOwnerDashboard } from "../owner-dashboard/ownerService.js";
import { isUser } from "./ownerRepo.js";

export const getOwnerDashboardController = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;
  const user = req.user;

  console.log(ownerId, "dashboard");

  const dashboard = await getOwnerDashboard(ownerId);

  if (req.user.role === "ADMIN") {
    const adminDashboard = await isUser();

    return res.status(200).json({
      success: true,
      data: adminDashboard,
    });
  }

  res.status(200).json({
    success: true,
    data: dashboard,
  });
});
