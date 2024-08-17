import { StatusCodes } from "http-status-codes";
import prisma from "../../config/database.js";
import { date, time } from "../../utils/constants.js";

import response from "../../helpers/response.js";

export const getAllSpendings = async (req, res) => {
  const data = await prisma.spendings.findMany();
  return response.ok(res, data, "Fetched data");
};
