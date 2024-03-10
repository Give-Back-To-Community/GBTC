import { useEffect } from "react";
import "./ChildRecent.css";
import { Link } from "react-router-dom";
const ChildRecent = (props) => {
  return (
    <Link
      style={{ color: "black", textDecoration: "none" }}
      to={`/feed/${props.url}`}
    >
      <div id="child_feed_recent">
        <div id="child_feed_recent_imageContainer">
          <img
            id="child_feed_recent_image"
            src={props.profilePictureUrl}
            alt="DP"
          />
        </div>
        <div id="child_feed_recent_userName">{props.userName}</div>
        <div id="child_feed_recent_userCollege">{props.userCollege}</div>
        <div id="child_feed_recent_title">{props.title + "..."}</div>
        <div id="child_feed_recent_description">
          {props.description + "..."}
        </div>
      </div>
    </Link>
  );
};
export default ChildRecent;
