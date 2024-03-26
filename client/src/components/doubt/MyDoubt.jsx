import "./MyDoubt.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const MyDoubt = (props) => {
  return (
    <div id="my_doubt_container">
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={`/doubt/${props.url}`}
      >
        <div id="my_doubt_container_title">{props.title}</div>
        <div id="my_doubt_container_content">{props.content}</div>
      </Link>
    </div>
  );
};
export default MyDoubt;
