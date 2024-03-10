import { useEffect, useState, useRef } from "react";
import "./ChildFeed.css";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, Link } from "react-router-dom";

const ChildFeed = (props) => {
  const navigate = useNavigate();
  const viewCommentButton = useRef(null);
  const commentDescriptionContainer = useRef(null);
  const [allComments, setAllComments] = useState([]);
  const openSingleBlog = useRef(null);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  useEffect(() => {
    console.log("picture url", props.blogPictureUrl);
    setAllComments([]);
    setIsLoadingComment(false);
    const realComment = props.comments.map((str) =>
      JSON.parse(str.replace(/\\/g, ""))
    );
    // console.log("creal comment", realComment);
    realComment.map((comment) => {
      return setAllComments((prev) => {
        return [...prev, comment];
      });
    });

    if (viewCommentButton.current && commentDescriptionContainer.current) {
      // console.log("attached event listenrr");
      commentDescriptionContainer.current.style.height = "0rem";

      viewCommentButton.current.onclick = () => {
        if (commentDescriptionContainer.current.style.height == "0rem") {
          commentDescriptionContainer.current.style.height = "auto";
        } else {
          commentDescriptionContainer.current.style.height = "0rem";
        }
      };
    }

    if (openSingleBlog.current) {
      openSingleBlog.current.onclick = () => {
        navigate(`/feed/${props.url}`);
      };
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.commentTextArea.value;
    setIsLoadingComment(true);
    fetch("http://localhost:5000/api/comment/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ url: props.url, content }),
    })
      .then(async (res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(
              `HTTP error! Status: ${res.status}, Message: ${data.message}`
            );
          });
        }
        return res.json();
      })
      .then((response) => {
        // console.log(response);
        e.target.commentTextArea.value = "";
        setAllComments((prev) => {
          return [
            ...prev,
            {
              content: response.newComment.content,
              name: response.newComment.name,
              college: response.newComment.college,
              profilePictureUrl: response.newComment.profilePictureUrl,
            },
          ];
        });
        // console.log("allComment", allComments);
        setIsLoadingComment(false);
      })
      .catch((err) => {
        console.log(
          "SOme error occurred while fetching all current author blogs",
          err.message
        );
      });
  };
  return (
    <div id="single_blog_container">
      <div id="single_blog_container_open">
        <span
          class="material-symbols-outlined"
          id="single_blog_container_openBlog"
          ref={openSingleBlog}
        >
          open_in_new
        </span>
      </div>
      <div id="single_blog_container_profilePicture">
        <img
          id="single_blog_container_profilePictureReal"
          src={props.profilePictureUrl}
          alt="profilePicture"
        />
      </div>
      <div id="single_blog_container_authorName">
        {props.name.toUpperCase()}
      </div>
      <div id="single_blog_container_authorCollege">{props.college}</div>
      <div id="single_blog_container_title"> {props.title}</div>
      <div id="single_blog_container_description">{props.description}</div>
      {props.blogPictureUrl ? (
        <div id="single_blog_container_imageContainer">
          <img
            id="single_blog_container_image"
            src={props.blogPictureUrl}
            alt="blogImage"
          ></img>
        </div>
      ) : (
        ""
      )}
      <div id="single_blog_container_techStack">
        <div id="single_blog_container_techStack_title">Tech Stack Used</div>
        <div id="single_blog_container_techStack_stack">
          {props.techStackUsed.length > 0 ? (
            props.techStackUsed.map((ele) => {
              return (
                <div id="single_blog_container_techStack_child" key={uuidv4()}>
                  {ele}
                </div>
              );
            })
          ) : (
            <div style={{ fontSize: "small" }}>No tech stack specified</div>
          )}
        </div>
      </div>
      <div id="single_blog_container_likes">
        {props.likes} upvotes
        <span style={{ marginLeft: "1rem" }}>
          {" "}
          <Link to={`/feed/${props.url}`}>Open blog</Link> to upvote
        </span>
      </div>
      <div id="single_blog_container_comments">
        <div id="single_blog_container_comments_title" ref={viewCommentButton}>
          View Comments
        </div>
        <span>{isLoadingComment ? <div>Loading...</div> : ""}</span>
        <div
          id="single_blog_container_comments_description"
          ref={commentDescriptionContainer}
        >
          <form
            id="single_blog_container_comments_description_postComment"
            onSubmit={handleSubmit}
          >
            <textarea
              placeholder="Write your comment here"
              id="single_blog_container_comments_description_postComment_textArea"
              name="commentTextArea"
            ></textarea>
            <button
              type="submit"
              id="single_blog_container_comments_description_postComment_title"
            >
              Post Comment
            </button>
          </form>
          <div id="single_blog_container_comments_description_showComment">
            {allComments.length > 0 ? (
              allComments.map((comment) => {
                return (
                  <div
                    key={uuidv4()}
                    id="single_blog_container_comments_description_showComment_container"
                  >
                    <div id="single_blog_container_comments_description_showComment_container_imageContainer">
                      <img
                        id="single_blog_container_comments_description_showComment_container_image"
                        src={comment.profilePictureUrl}
                      />
                    </div>
                    <div id="single_blog_container_comments_description_showComment_container_name">
                      {comment.name?.toUpperCase()}
                    </div>
                    <div id="single_blog_container_comments_description_showComment_container_college">
                      {comment.college}
                    </div>
                    <div id="single_blog_container_comments_description_showComment_container_content">
                      {comment.content}
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Write first comment to start the conversation</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChildFeed;
