import { z } from "zod";


// Register validation

export const registerSchema = z.object({

    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name too long"),


    email: z
        .string()
        .email("Invalid email address"),


    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),


    role: z
        .enum([
            "ADMIN",
            "OWNER",
            "CUSTOMER"
        ])
        .optional()

});


export const verifyEmailSchema = z.object({

    email:z.string().email(),

    otp:z.string()
        .length(6)

});




// Login validation

export const loginSchema = z.object({

    email: z
        .string()
        .email("Invalid email address"),


    password: z
        .string()
        .min(8, "Password must be at least 8 characters")

});