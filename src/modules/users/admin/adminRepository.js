import Admin from "../../users/admin/adminModel.js";


// Find admin by User ID

export const findAdminByUserId = async (userId) => {

    return await Admin
        .findOne({
            userId
        })
        .populate(
            "userId",
            "name email role avatar phone"
        );

};



// Create admin profile

export const createAdmin = async (data) => {

    return await Admin.create(data);

};



// Update admin profile

export const updateAdminByUserId = async (
    userId,
    data
) => {

    return await Admin.findOneAndUpdate(

        {
            userId
        },

        {
            $set:data
        },

        {
            new:true
        }

    )
    .populate(
        "userId",
        "name email role avatar phone"
    );

};



// Update permissions

export const updateAdminPermissions = async (
    userId,
    permissions
) => {

    return await Admin.findOneAndUpdate(

        {
            userId
        },

        {
            $set:{
                permissions
            }
        },

        {
            new:true
        }

    );

};



// Update last login

export const updateLastLogin = async (
    userId
) => {

    return await Admin.findOneAndUpdate(

        {
            userId
        },

        {
            $set:{
                lastLogin:new Date()
            }
        },

        {
            new:true
        }

    );

};



// Check permission

export const getAdminPermissions = async (
    userId
) => {

    const admin = await Admin.findOne(
        {
            userId
        }
    )
    .select("permissions");


    return admin;

};



// Delete admin profile

export const deleteAdminByUserId = async (
    userId
) => {

    return await Admin.findOneAndDelete(
        {
            userId
        }
    );

};