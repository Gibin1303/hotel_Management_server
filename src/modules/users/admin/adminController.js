import asyncHandler from "../../../utils/asyncHandler.js";
import {
    getAdminProfile,
    updateAdminProfile,
    changeAdminPermissions,
    updateAdminLogin,
    deleteAdminProfile
} from "./adminService.js";



/**
 * Get Admin Profile
 * GET /api/v1/admin/profile
 */
export const getProfile = asyncHandler(
async (req, res) => {


    const userId = req.user.id;


    const admin =
        await getAdminProfile(userId);



    res.status(200).json({

        success:true,

        data:admin

    });


});





/**
 * Update Admin Profile
 * PATCH /api/v1/admin/profile
 */
export const updateProfile = asyncHandler(
async (req, res) => {


    const userId = req.user.id;


    const admin =
        await updateAdminProfile(
            userId,
            req.body
        );



    res.status(200).json({

        success:true,

        data:admin

    });


});





/**
 * Update Admin Permissions
 * PATCH /api/v1/admin/permissions
 */
export const updatePermissions = asyncHandler(
async (req, res) => {


    const userId = req.user.id;


    const {
        permissions
    } = req.body;



    const admin =
        await changeAdminPermissions(
            userId,
            permissions
        );



    res.status(200).json({

        success:true,

        data:admin

    });


});





/**
 * Update Last Login
 * PATCH /api/v1/admin/login
 */
export const updateLogin = asyncHandler(
async (req, res) => {


    const userId = req.user.id;


    const admin =
        await updateAdminLogin(
            userId
        );



    res.status(200).json({

        success:true,

        data:admin

    });


});





/**
 * Delete Admin Profile
 * DELETE /api/v1/admin/profile
 */
export const deleteProfile = asyncHandler(
async (req, res) => {


    const userId = req.user.id;


    await deleteAdminProfile(
        userId
    );



    res.status(200).json({

        success:true,

        message:"Admin profile deleted successfully"

    });


});