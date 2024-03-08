import "./ChildRecent.css";
import { Link } from "react-router-dom";
const ChildRecent = (props) => {
  return (
    <Link
      style={{ color: "black", textDecoration: "none" }}
      to={`/feed/${props.url}`}
    >
      <div id="child_feed_recent">
        <div id="child_feed_recent_title">{props.title + "..."}</div>
        <div id="child_feed_recent_description">
          {props.description + "..."}
        </div>
      </div>
    </Link>
  );
};
export default ChildRecent;
