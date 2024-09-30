import { useEffect, useState } from "react";
import AvatarComp from "../common/Avatar";
import { BiArrowBack } from "react-icons/bi";
import { NavLink, useParams } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import groupStyles from "./styles";
import Members from "./Members";
import { useSelector } from "react-redux";
import groupsApi from "../../api/modules/groups";
import HeaderSkeleton from "../skeletons/HeaderSkeleton";

const GroupHeader = ({
  expand,
  setExpand,
  members,
  setMembers,
  groupDetails,
}) => {
  /*GroupHeader comp here */

  //url
  const { id } = useParams();

  const [fetching, setFetching] = useState([]);

  //handlers
  const fetchGroupMembers = async () => {
    try {
      setFetching(true);
      const result = await groupsApi.getGroupMembers(id);

      setMembers(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchGroupMembers();
  }, [groupDetails]);

  const getMembersString = () =>
    members
      .map((mem) => mem.username)
      .join(", ")
      .concat(", You");

  return (
    groupDetails &&
    (fetching ? (
      <HeaderSkeleton />
    ) : (
      <div className={groupStyles.header.wrapper(expand)}>
        <div>
          <div className={groupStyles.header.back}>
            {expand ? (
              <BiArrowBack onClick={() => setExpand(false)} />
            ) : (
              <NavLink to="/groups">
                <BiArrowBack />
              </NavLink>
            )}
          </div>
          <div
            className={groupStyles.header.avatar(expand)}
            onClick={() => setExpand(true)}
          >
            <AvatarComp
              name={groupDetails.group_name}
              color={groupDetails.group_profile}
              size="40"
            />
            <div className={groupStyles.header.profile(expand)}>
              <h1 className={groupStyles.header.name}>
                {groupDetails.group_name}
              </h1>
              {!expand && (
                <p className={groupStyles.header.members}>
                  {getMembersString().length > 25
                    ? getMembersString().slice(0, 25).concat("...")
                    : getMembersString()}
                </p>
              )}
            </div>
          </div>
          <div className={groupStyles.header.icons}>
            <HiOutlineDotsVertical />
          </div>
        </div>
        {expand && <Members members={members} />}
      </div>
    ))
  );
};

export default GroupHeader;
