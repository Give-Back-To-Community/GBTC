import { useEffect, useState } from "react";
import FeedChildRecent from "./FeedChildRecent";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./SingleFeed.css";
const SingleFeed = () => {
  const { url } = useParams();
  const [blogData, setBlogData] = useState([]);
  const [sameAuthorBlogArr, setSameAuthorBlogArr] = useState([]);

  const [blogComments, setBlogComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/extra/singleBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        response = response.populatedQuery;
        const commentArr = [];
        console.log("prev blogComment", blogComments);
        // setBlogComments([]);
        response.comments &&
          response.comments.map((comment) => {
            commentArr.push({
              name: comment.content,
              content: comment.user.name,
            });
          });
        setBlogComments(commentArr);
        console.log("commentArr", blogComments);

        const curData = {
          title: response.title,
          description: response.description,
          likes: response.likes,
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
  }, []);
  return (
    <div id="single_feed_container">
      <div id="single_feed_container_first">
        <div id="single_feed_container_left">
          <div id="single_feed_container_left_title">{blogData.title}</div>
          <div id="single_feed_container_left_description">
            {blogData.description}
          </div>
          <div id="single_feed_container_left_likes">
            Likes {blogData.likes}
          </div>
          <div id="single_feed_container_left_techStack">
            {/* {blogData.techStackUsed.map((ele) => ele + " , ")} */}
            <div id="single_feed_container_left_techStack_title">
              Tech Stack
            </div>
            <div id="single_feed_container_left_techStack_stack">
              {blogData.techStackUsed
                ? blogData.techStackUsed.map((ele) => {
                    return <div key={uuidv4()}>{ele}</div>;
                  })
                : "No tech stack sepcified"}
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
          <FeedChildRecent />
        </div>
        <div id="single_feed_Container_right">
          <FeedChildRecent />
        </div>
      </div>
      <div id="single_feed_container_second">
        <div id="single_feed_container_second_title">Comments</div>
        <div id="single_feed_container_second_comment">
          {blogComments.length > 0 ? (
            blogComments.map((ele) => {
              return (
                <div key={uuidv4()}>
                  <div>User {ele.name}</div>
                  <div>Content {ele.content}</div>
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
