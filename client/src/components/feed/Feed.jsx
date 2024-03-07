import "./Feed.css";
import React, { useState, useRef, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select/creatable";
import FeedChildFollow from "./FeedChildFollow";
import FeedChildRecent from "./FeedChildRecent";
import FeedChild from "./ChildFeed";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
const Feed = () => {
  const navigate = useNavigate();
  const titleValue = useRef(null);
  const descriptionValue = useRef(null);
  const feedLeftSide = useRef(null);
  const feedMiddleSide = useRef(null);
  const createBlogButtonReference = useRef(null);
  const createBlogReference = useRef(null);

  // const [scrollY, setScrollY] = useEffect(2);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedLocation, setSelectedLocaton] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [techStackOfCreatingBlog, setTechStackOfCreatingBlog] = useState([]);
  const [recentBlogsArr, setRecentBlogsArr] = useState([]);
  // const [selectedRole, setSelectedRole] = useState(null);

  const [allBlogsArr, setAllBlogsArr] = useState([]);
  const univOptions = [
    { value: "stanford", label: "Stanford University" },
    { value: "harvard", label: "Harvard University" },
    { value: "mit", label: "Massachusetts Institute of Technology" },
    { value: "caltech", label: "California Institute of Technology" },
    { value: "oxford", label: "University of Oxford" },
  ];

  const locationOptions = [
    { value: "bangalore", label: "Bangalore, India" },
    { value: "hyderabad", label: "Hyderabad, India" },
    { value: "pune", label: "Pune, India" },
    { value: "chennai", label: "Chennai, India" },
    { value: "mumbai", label: "Mumbai, India" },
  ];

  const companyOptions = [
    { value: "google", label: "Google" },
    { value: "facebook", label: "Facebook" },
    { value: "amazon", label: "Amazon" },
    { value: "microsoft", label: "Microsoft" },
    { value: "apple", label: "Apple" },
  ];

  const roleOptions = [
    { value: "software_engineer", label: "Software Engineer" },
    { value: "data_scientist", label: "Data Scientist" },
    { value: "product_manager", label: "Product Manager" },
    { value: "designer", label: "Designer" },
    { value: "engineer", label: "Engineer" },
  ];

  const techStackOptions = [
    { value: "react", label: "React.js" },
    { value: "node", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "ruby", label: "Ruby on Rails" },
  ];

  const handleChangeUniversity = (selectedOptions) => {
    setSelectedUniversity(selectedOptions);
    // console.log(selectedOptions); // Log the selected options array
  };
  const handleChangeLocation = (selectedOptions) => {
    setSelectedLocaton(selectedOptions);
    // console.log(selectedOptions); // Log the selected options array
  };
  const handleChangeCompany = (selectedOptions) => {
    setSelectedCompany(selectedOptions);
    // console.log(selectedOptions); // Log the selected options array
  };
  const handleChangeRole = (selectedOptions) => {
    setSelectedRole(selectedOptions);
    // console.log(selectedOptions); // Log the selected options array
  };
  const handleChangeTitle = () => {
    if (titleValue.current) {
      setSelectedTitle(titleValue.current.value);
    }
  };

  const handleChangeDescription = (e) => {
    if (descriptionValue.current) {
      setSelectedDescription(descriptionValue.current.value);
    }
  };

  const searchFilter = () => {
    console.log(
      selectedCompany,
      selectedDescription,
      selectedLocation,
      selectedRole,
      selectedTechStack,
      selectedTitle,
      selectedUniversity
    );
  };
  const resetFilter = () => {
    if (titleValue.current && descriptionValue.current) {
      titleValue.current.value = "";
      descriptionValue.current.value = "";
      setSelectedCompany(null);
      setSelectedDescription(null);
      setSelectedLocaton(null);
      setSelectedRole(null);
      setSelectedTechStack(null);
    }
  };

  const handleChangeTechStack = (selectedOptions) => {
    console.log("selected option", selectedOptions);
    setSelectedTechStack(selectedOptions);
    console.log(selectedOptions); // Log the selected options array
  };

  const handleChangeTechStackOfCreatingBlog = (selectedOptions) => {
    setTechStackOfCreatingBlog(selectedOptions);
  };

  const submitBlogFormDetail = (e) => {
    e.preventDefault();

    const blogTitle = e.target.createBlogTitle.value;
    const blogDescription = e.target.createBlogDescription.value;
    const techy = [];
    techStackOfCreatingBlog.map((ele) => {
      techy.push(ele.label);
    });
    console.log(techy, "techy");
    const jsonData = {
      title: blogTitle,
      description: blogDescription,
      techStackUsed: techy,
    };

    fetch("http://localhost:5000/api/blog/addBlog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(jsonData),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("in client side response while adding blog", response);
        e.target.createBlogTitle.value = "";
        e.target.createBlogDescription.value = "";
        setTechStackOfCreatingBlog(null);
      })
      .catch((err) => {
        console.log("Some error occurred while adding blog", err);
      });
  };
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  // });
  useEffect(() => {
    window.onscroll = () => {
      const scrollY = window.scrollY;
      // console.log(scrollY);
      if (feedLeftSide.current && feedMiddleSide.current) {
        // console.log("yes outer");
        if (scrollY >= 79.3) {
          // console.log("yes");
          feedLeftSide.current.style.position = "fixed";
          feedMiddleSide.current.style.marginLeft = "24.45vw";
          feedLeftSide.current.style.marginTop = "-5rem";
        } else {
          feedLeftSide.current.style.position = "static";
          feedMiddleSide.current.style.marginLeft = "0vw";
          feedLeftSide.current.style.marginTop = "0rem";
        }
      }
    };

    if (createBlogReference.current && createBlogButtonReference.current) {
      // createBlogReference.current.style.height = "0rem";
      createBlogButtonReference.current.onclick = () => {
        if (localStorage.getItem("token")) {
          if (createBlogReference.current.style.height == "21rem") {
            createBlogReference.current.style.height = "0rem";
          } else {
            createBlogReference.current.style.height = "21rem";
          }
        } else {
          navigate("/login");
        }
      };
    }
  });

  useEffect(() => {
    //all blogs fetch call
    fetch("http://localhost:5000/api/blog/viewBlog/allBlogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response", response);
        const curBlogsArr = [];
        response.blogs.map((val) => {
          val.blogs.map((data) => {
            const curComments = [];
            data.comments.map((comment) => {
              curComments.push(comment.content);
            });

            const tempData = {
              name: val.user.name,
              title: data.title,
              description: data.description,
              techStackUsed: data.techStackUsed,
              comments: curComments,
            };
            curBlogsArr.push(tempData);
            // console.log("tempData", curComments);
          });
        });

        setAllBlogsArr(curBlogsArr);
        console.log(allBlogsArr);
      })
      .catch((err) => {
        console.log("Some error occurred while fetching the all blogs", err);
      });
  }, []);
  return (
    <div id="feed_container">
      <div id="feed_container_left" ref={feedLeftSide}>
        <div id="feed_container_leftTitle">Filters</div>

        {/* //university */}
        <div id="feed_container_university" class="feed_container_leftChild">
          Select university
        </div>
        <Select
          value={selectedUniversity}
          onChange={handleChangeUniversity}
          options={univOptions}
          isMulti={false} // Set to false to allow only one option to be selected
          className="feed_container_leftBoxChild"
        >
          {selectedUniversity && (
            <div>
              <h3>Selected Option:</h3>
              <p>{selectedUniversity.label}</p>
            </div>
          )}
        </Select>

        {/* //location */}
        <div id="feed_container_location" class="feed_container_leftChild">
          Select location
        </div>
        <Select
          value={selectedLocation}
          onChange={handleChangeLocation}
          options={locationOptions}
          className="feed_container_leftBoxChild"
          isMulti={false} // Set to false to allow only one option to be selected
        >
          {selectedLocation && (
            <div>
              <h3>Selected Option:</h3>
              <p>{selectedLocation.label}</p>
            </div>
          )}
        </Select>
        {/* //company */}
        <div id="feed_container_company" class="feed_container_leftChild">
          Select company
        </div>
        <Select
          value={selectedCompany}
          onChange={handleChangeCompany}
          options={companyOptions}
          className="feed_container_leftBoxChild"
          isMulti={false} // Set to false to allow only one option to be selected
        >
          {selectedCompany && (
            <div>
              <h3>Selected Option:</h3>
              <p>{selectedCompany.label}</p>
            </div>
          )}
        </Select>

        {/* //role */}
        <div id="feed_container_role" class="feed_container_leftChild">
          Select role
        </div>
        <Select
          value={selectedRole}
          className="feed_container_leftBoxChild"
          onChange={handleChangeRole}
          options={roleOptions}
          isMulti={false} // Set to false to allow only one option to be selected
        >
          {selectedRole && (
            <div>
              <h3>Selected Option:</h3>
              <p>{selectedRole.label}</p>
            </div>
          )}
        </Select>

        {/* //title */}

        <div id="feed_container_title" class="feed_container_leftChild">
          Select title
        </div>
        <form>
          <input
            onChange={handleChangeTitle}
            id="feed_container_title_input"
            type="text"
            className="feed_container_leftBoxInputChild"
            placeholder="Enter your title here"
            name="specifiedTitle"
            ref={titleValue}
          ></input>
        </form>

        {/* description */}
        <div id="feed_container_description" class="feed_container_leftChild">
          Select description
        </div>
        <form>
          <input
            onChange={handleChangeDescription}
            id="feed_container_description_input"
            type="text"
            className="feed_container_leftBoxInputChild"
            placeholder="Enter your description here"
            name="specifiedDescription"
            ref={descriptionValue}
          ></input>
        </form>

        <div id="feed_container_techStack" class="feed_container_leftChild">
          Choose Tech Stack
        </div>
        {/* <div id="feed_container_techStack" class="feed_container_leftChild"> */}
        <CreatableSelect
          value={selectedTechStack}
          className="feed_container_leftBoxChild"
          onChange={handleChangeTechStack}
          options={techStackOptions}
          isMulti
        />
        <div id="feed_container_left_filterSearch">
          <button id="searchButton" onClick={searchFilter}>
            Search
          </button>
          <button id="resetButton" onClick={resetFilter}>
            Reset
          </button>
        </div>
      </div>
      <div id="feed_container_middle" ref={feedMiddleSide}>
        <div
          id="feed_container_middle_createBlogHeading"
          ref={createBlogButtonReference}
        >
          Create New Blog
        </div>
        <form
          onSubmit={submitBlogFormDetail}
          id="feed_container_middle_blogDetails"
          ref={createBlogReference}
        >
          <div id="feed_container_middle_blogDetails_title">Enter Title</div>
          <input
            type="text"
            name="createBlogTitle"
            placeholder="Enter your title here"
            id="feed_container_middle_blogDetails_titleInput"
          />
          <div id="feed_container_middle_blogDetails_description">
            Enter Description
          </div>
          <input
            type="text"
            name="createBlogDescription"
            placeholder="Enter your Description here"
            id="feed_container_middle_blogDetails_descriptionInput"
          />
          <div id="feed_container_middle_blogDetails_techStackHeading">
            Choose Tech Stack
          </div>
          <CreatableSelect
            value={techStackOfCreatingBlog}
            className="feed_container_middle_blogDetailsTechStack"
            onChange={handleChangeTechStackOfCreatingBlog}
            options={techStackOptions}
            isMulti
          />
          <button type="submit" id="addBlogButton">
            Add Blog
          </button>
          <button type="reset" id="resetBlogButton">
            Reset
          </button>
        </form>
        {allBlogsArr.length > 0 ? (
          <div>
            {allBlogsArr.map((ele) => {
              return (
                <FeedChild
                  key={uuidv4()}
                  name={ele.name}
                  title={ele.title}
                  description={ele.description}
                  techStackUsed={ele.techStackUsed}
                  comments={ele.comments}
                />
              );
            })}
          </div>
        ) : (
          <div>No Blogs present</div>
        )}
      </div>
      <div id="feed_container_right">
        <FeedChildRecent />
      </div>
    </div>
  );
};
export default Feed;
