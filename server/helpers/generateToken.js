import jwt from "jsonwebtoken";

const generateToken = (isUser) => {
  const token = jwt.sign(
    {
      userId: isUser.user_id,
      phone: isUser.phone,
      username: isUser.username,
      profile: isUser.profile_color,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

export default generateToken;
