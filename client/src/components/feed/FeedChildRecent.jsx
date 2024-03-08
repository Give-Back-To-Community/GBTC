import "./FeedChildRecent.css";
import { v4 as uuidv4 } from "uuid";
import ChildRecent from "./ChildRecent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeedChildRecent = () => {
  const [recentBlogsArr, setRecentBlogsArr] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // console.log("coming in recent feed");
    setIsLoaded(true);
    //recent blogs fetch call
    fetch("http://localhost:5000/api/extra/recentBlogs")
      .then((res) => res.json())
      .then((response) => {
        const recBlog = [];
        // console.log("recentBlogs", response);
        response.recentBlogs.map((ele) => {
          const tempData = {
            title: ele.title,
            description: ele.description,
            url: ele.url,
            userName: ele.user.name,
            userUniversity: ele.user.college,
          };
          recBlog.push(tempData);

          console.log(isLoaded);
        });
        setRecentBlogsArr(recBlog);
        setIsLoaded(false);
      })
      .catch((err) => {
        console.log("Some error occurred while fetching recent blogs", err);
      });
  }, []);
  return (
    <div id="feed_child_recentContainer">
      <div id="feed_child_recentContainerTitle">Recently Uploaded Blogs</div>
      <div id="feed_child_recentContainerBlogs">
        {!isLoaded ? (
          recentBlogsArr.length > 0 ? (
            recentBlogsArr.map((val) => {
              return (
                <ChildRecent
                  key={uuidv4()}
                  title={val.title.substring(0, Math.min(val.title.length, 25))}
                  description={val.description.substring(
                    0,
                    Math.min(val.description.length, 40)
                  )}
                  url={val.url}
                  userName={val.userName.toUpperCase()}
                  userCollege={val.userUniversity}
                />
              );
            })
          ) : (
            <div>No recent blogs</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};
export default FeedChildRecent;
