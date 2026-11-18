import ApiError from "../../../utils/apiError.js"

import {
    findAdminByUserId,
    updateAdminByUserId,
    updateAdminPermissions,
    updateLastLogin,
    deleteAdminByUserId
}
from "./adminRepository.js";



export const getAdminProfile = async(userId)=>{


    const admin =
        await findAdminByUserId(userId);



    if(!admin){

        throw new ApiError(
            404,
            "Admin not found"
        );

    }


    return admin;

};





export const updateAdminProfile = async(
    userId,
    data
)=>{


    const admin =
        await findAdminByUserId(userId);



    if(!admin){

        throw new ApiError(
            404,
            "Admin not found"
        );

    }



    const updatedAdmin =
        await updateAdminByUserId(
            userId,
            data
        );



    return updatedAdmin;

};





export const changeAdminPermissions = async(
    userId,
    permissions
)=>{


    const admin =
        await findAdminByUserId(userId);



    if(!admin){

        throw new ApiError(
            404,
            "Admin not found"
        );

    }



    return await updateAdminPermissions(
        userId,
        permissions
    );

};





export const updateAdminLogin = async(userId)=>{

    return await updateLastLogin(userId);

};





export const deleteAdminProfile = async(userId)=>{


    const admin =
        await findAdminByUserId(userId);



    if(!admin){

        throw new ApiError(
            404,
            "Admin not found"
        );

    }



    await deleteAdminByUserId(userId);

};