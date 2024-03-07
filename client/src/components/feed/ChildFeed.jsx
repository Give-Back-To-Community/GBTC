import "./ChildFeed.css";

const ChildFeed = (props) => {
  return (
    <div id="single_blog_container">
      <div id="single_blog_container_authorName">
        Author Name - {props.name}
      </div>
      <div id="single_blog_container_title"> Title - {props.title}</div>
      <div id="single_blog_container_description">
        {" "}
        Description - {props.description}
      </div>
      <div id="single_blog_container_techStack">
        {" "}
        Tech Stack Used{" "}
        {props.techStackUsed.map((ele) => {
          return ele + " , ";
        })}
      </div>
      <div id="single_blog_container_comments">
        {" "}
        Comments - {props.comments}
      </div>
    </div>
  );
};
export default ChildFeed;
