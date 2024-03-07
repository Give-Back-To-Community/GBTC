import { useEffect, useState, useRef } from "react";
import FeedChildRecent from "./FeedChildRecent";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import SameAuthorFeed from "./SameAuthorFeed";
import "./SingleFeed.css";
const SingleFeed = () => {
  const { url } = useParams();
  const likeButton = useRef(null);
  const [blogData, setBlogData] = useState([]);
  const [sameAuthorBlogArr, setSameAuthorBlogArr] = useState([]);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const [blogComments, setBlogComments] = useState([]);
  const [curBlogAuthorDetails, setCurBlogAuthorDetails] = useState([]);

  useEffect(() => {
    // console.log("Calling single feed");
    console.log(localStorage.getItem("token"));
    fetch("http://localhost:5000/api/extra/singleBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ url }),
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
        if (response.isLikedByCurrentUser) {
          setIsUpvoted(true);
        }
        setCurBlogAuthorDetails(response.blogRecord);

        response = response.populatedQueryFirst;

        const commentArr = [];
        // console.log("prev blogComment", blogComments);
        // setBlogCommen([]);
        response.comments &&
          response.comments.map((comment) => {
            commentArr.push({
              content: comment.content,
              name: comment.user.name,
            });
          });
        setBlogComments(commentArr);
        // console.log("commentArr", blogComments);
        console.log(response);
        const curData = {
          title: response.title,
          description: response.description,
          likes: response.likes ? response.likes.length : 0,
          techStackUsed: response.techStackUsed,
          //   comments: commentArr,
        };
        setBlogData(curData);
        console.log("curData", curData);
      })
      .catch((err) => {
        console.log(
          "Some error occurred while fetching the single blog",
          err.message
        );
      });

    if (likeButton.current) {
      likeButton.current.onclick = () => {
        console.log(isUpvoted);
        if (isUpvoted) {
          alert("Already upvoted");
          return;
        }
        fetch("http://localhost:5000/api/blog/like/addLike", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ url }),
        })
          .then((res) => res.json())
          .then((response) => {
            // console.log("response from adding like", response);
            alert("upvote successfully");
          })
          .catch((err) => {
            console.log("some error occurred while liking the blog", err);
          });
      };
    }

    fetch("http://localhost:5000/api/extra/curAuthorBlogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => {
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
        setSameAuthorBlogArr(response.populatedQuery);
      })
      .catch((err) => {
        console.log(
          "SOme error occurred while fetching all current author blogs",
          err.message
        );
      });
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.commentInput.value;
    console.log("target", content);
    fetch("http://localhost:5000/api/comment/addComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ url, content }),
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
        console.log(response);
      })
      .catch((err) => {
        console.log(
          "SOme error occurred while fetching all current author blogs",
          err.message
        );
      });
  };
  return (
    <div id="single_feed_container">
      <div id="single_feed_container_first">
        <div id="single_feed_container_left">
          <div id="single_feed_container_left_userDetails">
            <div id="single_feed_container_left_userDetails_name">
              {curBlogAuthorDetails
                ? curBlogAuthorDetails?.name?.toUpperCase()
                : ""}
            </div>
            <div id="single_feed_container_left_userDetails__college">
              {curBlogAuthorDetails.college}
            </div>
          </div>
          <div id="single_feed_container_left_title">{blogData.title}</div>
          <div id="single_feed_container_left_description">
            {blogData.description}
          </div>
          <div id="single_feed_container_left_image">image here</div>

          <div id="single_feed_container_left_techStack">
            {/* {blogData.techStackUsed.map((ele) => ele + " , ")} */}
            <div id="single_feed_container_left_techStack_title">
              Tech Stack
            </div>
            <div id="single_feed_container_left_techStack_stack">
              {blogData?.techStackUsed?.length > 0
                ? blogData.techStackUsed.map((ele) => {
                    return (
                      <div
                        id="single_feed_container_left_techStack_child"
                        key={uuidv4()}
                      >
                        {ele}
                      </div>
                    );
                  })
                : "No tech stack specified"}
            </div>
          </div>
          <div id="single_feed_container_left_likes">
            <div id="single_feed_container_left_likesCall" ref={likeButton}>
              {isUpvoted ? "Upvoted" : "Upvote"}
              <span
                class="material-symbols-outlined"
                id="single_feed_container_left_likesCallIcon"
              >
                thumb_up
              </span>
            </div>
            <div id="single_feed_container_left_likes_count">
              Upvotes: {blogData.likes}
            </div>
          </div>
          <div id="single_feed_container_left_comments">
            {blogData.comments}
          </div>
        </div>
        <div id="single_feed_container_middle">
          <div id="single_feed_container_middle_title">
            More blogs from same Author
          </div>
          {sameAuthorBlogArr ? (
            sameAuthorBlogArr.blogs ? (
              sameAuthorBlogArr.blogs.length > 0 ? (
                sameAuthorBlogArr.blogs.map((ele) => {
                  return (
                    <SameAuthorFeed
                      title={ele.title.substring(
                        0,
                        Math.min(ele.title.length, 15)
                      )}
                      description={ele.description.substring(
                        0,
                        Math.min(ele.description.length, 60)
                      )}
                      key={uuidv4()}
                      url={ele.url}
                    />
                  );
                })
              ) : (
                <div>No more blogs</div>
              )
            ) : (
              <div>No more blogs</div>
            )
          ) : (
            <div>No more blogs</div>
          )}
        </div>
        <div id="single_feed_Container_right">
          <FeedChildRecent />
        </div>
      </div>
      <div id="single_feed_container_second">
        <div id="single_feed_container_second_title">Comments</div>
        <div id="single_feed_container_second_postComment">
          <form onSubmit={handleSubmit} id="single_feed_container_second_form">
            <input
              type="text"
              placeholder="Enter your comment"
              name="commentInput"
              id="single_feed_container_second_realInput"
            ></input>
            <button type="submit" id="single_feed_container_second_button">
              Post Comment
            </button>
          </form>
        </div>
        <div id="single_feed_container_second_comment">
          {blogComments.length > 0 ? (
            blogComments.map((ele) => {
              return (
                <div
                  key={uuidv4()}
                  id="single_feed_container_second_commentContainer"
                >
                  <div id="single_feed_container_second_commentContainer_name">
                    {ele.name.toUpperCase()}
                  </div>
                  <div id="single_feed_container_second_commentContainer_content">
                    {ele.content}
                  </div>
                </div>
              );
            })
          ) : (
            <div>No comments found</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SingleFeed;
