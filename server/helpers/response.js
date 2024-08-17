import { StatusCodes } from "http-status-codes";

export default {
  ok: (res, data, message) =>
    res.status(StatusCodes.OK).json({
      message,
      data,
    }),
  serverError: (res, message) =>
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message,
    }),
};
