// import jwt from "jsonwebtoken";

// export const generateToken = (payload)=>{

//     return jwt.sign(
//         payload,
//         process.env.JWT_SECRET,
//         {
//             expiresIn:"7d"
//         }
//     );

// };

import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id ,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );
};

export const createRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );
};
