import "./ChildRecent.css";
const ChildRecent = (props) => {
  return (
    <div id="child_feed_recent">
      <div id="child_feed_recent_title">{props.title}</div>
      <div id="child_feed_recent_description">{props.description}</div>
    </div>
  );
};
export default ChildRecent;
