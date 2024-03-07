import "./FeedChildRecent.css";
import { v4 as uuidv4 } from "uuid";
import ChildRecent from "./ChildRecent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeedChildRecent = () => {
  const [recentBlogsArr, setRecentBlogsArr] = useState([]);
  useEffect(() => {
    //recent blogs fetch call
    fetch("http://localhost:5000/api/extra/recentBlogs")
      .then((res) => res.json())
      .then((response) => {
        const recBlog = [];
        response.recentBlogs.map((ele) => {
          const tempData = {
            title: ele.title,
            description: ele.description,
            url: ele.url,
          };
          recBlog.push(tempData);
        });
        setRecentBlogsArr(recBlog);
      })
      .catch((err) => {
        console.log("Some error occurred while fetching recent blogs", err);
      });
  }, []);
  return (
    <div id="feed_child_recentContainer">
      <div id="feed_child_recentContainerTitle">Recently Uploaded Blogs</div>
      <div id="feed_child_recentContainerBlogs">
        {recentBlogsArr.map((val) => {
          return (
            <ChildRecent
              key={uuidv4()}
              title={val.title.substring(0, Math.min(val.title.length, 15))}
              description={val.description.substring(
                0,
                Math.min(val.description.length, 60)
              )}
              url={val.url}
            />
          );
        })}
      </div>
    </div>
  );
};
export default FeedChildRecent;
