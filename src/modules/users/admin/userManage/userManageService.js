import ApiError from "../../../../utils/apiError.js";
import {
    findAllUsers,
    findUserById,
    updateStatus,
    removeUser
}
from "./userManegeRepo.js";




// Get users

export const getUsers = async(query)=>{

    return await findAllUsers(query);

};



// Get user

export const getUser = async(id)=>{


    const user =
        await findUserById(id);


    if(!user){

        throw new ApiError(
            404,
            "User not found"
        );

    }


    return user;

};



// Block user

export const blockUser = async(id)=>{


    const user =
        await updateStatus(
            id,
            "BLOCKED"
        );


    if(!user){

        throw new ApiError(
            404,
            "User not found"
        );

    }


    return user;

};



// Activate user

export const activateUser = async(id)=>{


    return await updateStatus(
        id,
        "ACTIVE"
    );

};



// Delete user

export const deleteUser = async(id)=>{


    const user =
        await removeUser(id);


    if(!user){

        throw new ApiError(
            404,
            "User not found"
        );

    }


};