import React from "react";
import AvatarComp from "../common/Avatar";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import groupStyles from "./styles";
import Members from "./Members";

const GroupHeader = ({ name, profile, expand, setExpand, members }) => {
  /*GroupHeader comp here */

  let memberString = members
    .map((mem) => mem.username)
    .join(", ")
    .concat(", You");

  return (
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
          <AvatarComp name={name} color={profile} size="40" />
          <div className={groupStyles.header.profile(expand)}>
            <h1 className={groupStyles.header.name}>{name}</h1>
            {!expand && (
              <p className={groupStyles.header.members}>
                {memberString.length > 25
                  ? memberString.substr(0, 25).concat("...")
                  : memberString}
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
  );
};

export default GroupHeader;
