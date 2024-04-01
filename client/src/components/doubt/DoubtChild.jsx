import "./DoubtChild.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const DoubtChild = (props) => {
  useEffect(() => {
    console.log(props.doubtPictureUrl.length);
  }, []);
  return (
    <div id="doubt_child_container">
      <div id="doubt_child_container_userInfo">
        <div id="doubt_child_container_userInfo_first">
          <div id="doubt_child_container_profilePictureUrl">
            <img
              id="doubt_child_container_profilePictureUrl_image"
              src={props.profilePictureUrl}
            />
          </div>
          <div id="doubt_child_container_details">
            <div id="doubt_child_container_name">
              {props.name.toUpperCase()}
            </div>
            <div id="doubt_child_container_college">{props.college}</div>
          </div>
        </div>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/doubt/${props.url}`}
        >
          <div id="doubt_child_container_openInNew">
            <span
              className="material-symbols-outlined"
              id="doubt_child_container_openInNewLogo"
            >
              open_in_new
            </span>
          </div>
        </Link>
      </div>
      <div id="doubt_child_container_title">{props.title}</div>
      <div id="doubt_child_container_content">{props.content}</div>
      <div id="doubt_child_container_resolved">{props.resolved}</div>
      {props.doubtPictureUrl?.length > 0 ? (
        <div id="doubt_child_container_doubtPictureUrl">
          <img
            id="doubt_child_container_doubtPictureUrl_image"
            src={props.doubtPictureUrl}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default DoubtChild;
