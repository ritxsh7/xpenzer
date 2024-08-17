import prisma from "../config/database.js";

class UserService {
  createUser = async (username, phone, password) => {
    try {
      const newUser = await prisma.users.create({
        data: {
          username,
          phone,
          password,
        },
      });
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

export default new UserService();
