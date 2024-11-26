import response from "../../helpers/response.js";
import groups from "../../services/groups.js";

export const createGroup = async (req, res) => {
  const { groupName, members } = req.body;

  let allMembers = [req.user.userId, ...members];

  try {
    const group = await groups.createGroup(groupName);
    const { group_id } = group;

    const addMembers = await groups.addMembers(group_id, allMembers);

    return response.ok(
      res,
      { group, addMembers },
      "Group created successfully"
    );
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const result = await groups.getAll(req.user.userId);
    response.ok(res, result);
  } catch (error) {
    console.log(error);
    response.serverError(res);
  }
};

export const getGroupMembers = async (req, res) => {
  const { id } = req.query;
  try {
    const result = await groups.getGroupMembers(req.user.userId, id);
    return response.ok(res, result);
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};

export const getGroupExpenses = async (req, res) => {
  const { id, page } = req.query;

  try {
    const result = await groups.getGroupExpenses(id, page);
    return response.ok(res, result);
  } catch (error) {
    console.log(error);
    return response.serverError(res);
  }
};
