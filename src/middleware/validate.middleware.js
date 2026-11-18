// export const validate = (schema) => {

//     return (req,res,next)=>{

//         const result =
//         schema.safeParse(req.body);

//         if(!result.success){

//             return res.status(400).json({

//                 success:false,

//                 message:"Validation failed",

//                 errors:
//                 result.error?.errors?.issues?.map(
//                     error => error.message
//                 )

//             });

//         }

//         req.body = result.data;

//         next();

//     };

// };

export const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        // FIX: Use 'issues' instead of 'errors' for Zod, with optional chaining
        errors: result.error?.issues?.map((error) => error.message) || [],
      });
    }

    req.body = result.data;
    next();
  };
};
