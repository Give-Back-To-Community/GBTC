import "./SameAuthorFeed.css";
import { Link } from "react-router-dom";
const SameAuthorFeed = (props) => {
  return (
    <Link
      style={{ color: "black", textDecoration: "none" }}
      to={`/feed/${props.url}`}
    >
      <div id="same_author_child">
        <div id="same_author_child_title">{props.title + "..."}</div>
        <div id="same_author_child_description">
          {props.description + "..."}
        </div>
      </div>
    </Link>
  );
};

export default SameAuthorFeed;
