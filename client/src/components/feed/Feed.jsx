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
  const nameValue = useRef(null);

  const [isBlogLoading, setIsBlogLoading] = useState(false);
  // const [scrollY, setScrollY] = useEffect(2);
  const [isUpdated, setIsUpdated] = useState();
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedLocation, setSelectedLocaton] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedTechStack, setSelectedTechStack] = useState([]);
  const [techStackOfCreatingBlog, setTechStackOfCreatingBlog] = useState([]);
  const [allBlogsArr, setAllBlogsArr] = useState([]);
  const [globalAllBlogsArr, setGlobalAllBlogsArr] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const univOptions = [
    { value: "chitkara", label: "Chitkara University" },
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
  const handleChangeName = () => {
    if (nameValue.current) {
      setSelectedName(nameValue.current.value);
    }
  };

  const handleChangeDescription = (e) => {
    if (descriptionValue.current) {
      setSelectedDescription(descriptionValue.current.value);
    }
  };

  const searchFilter = () => {
    console.log(
      selectedDescription,
      selectedTechStack,
      selectedTitle,
      selectedUniversity,
      selectedName
    );
    // console.log(allBlogsArr);
    // console.log(selectedUniversity);

    const filteredData = globalAllBlogsArr.filter((blog) => {
      const titleMatch =
        !selectedTitle ||
        blog.title.toLowerCase().includes(selectedTitle.toLowerCase());
      const descriptionMatch =
        !selectedDescription ||
        blog.description
          .toLowerCase()
          .includes(selectedDescription.toLowerCase());
      const nameMatch =
        !selectedName ||
        blog.name.toLowerCase().includes(selectedName.toLowerCase());
      const universityMatch =
        !selectedUniversity ||
        blog.college
          .toLowerCase()
          .includes(selectedUniversity.label.toLowerCase());
      const techStackMatch =
        !selectedTechStack ||
        selectedTechStack.some((filterTech) =>
          blog.techStackUsed.some(
            (blogTech) =>
              blogTech.toLowerCase() === filterTech.label.toLowerCase()
          )
        );

      return (
        titleMatch &&
        descriptionMatch &&
        nameMatch &&
        universityMatch &&
        techStackMatch
      );
    });

    setAllBlogsArr(filteredData);
    console.log(filteredData);
  };
  const resetFilter = () => {
    if (titleValue.current && descriptionValue.current && nameValue.current) {
      titleValue.current.value = "";
      descriptionValue.current.value = "";
      setSelectedCompany(null);
      setSelectedUniversity(null);
      setSelectedDescription(null);
      setSelectedLocaton(null);
      setSelectedTitle(null);
      setSelectedDescription(null);
      setSelectedRole(null);
      setSelectedTechStack(null);
      nameValue.current.value = "";
      setSelectedName(null);
      setAllBlogsArr(globalAllBlogsArr);
    }
  };

  const handleChangeTechStack = (selectedOptions) => {
    // console.log("selected option", selectedOptions);
    setSelectedTechStack(selectedOptions);
    // console.log(selectedOptions); // Log the selected options array
  };

  const handleChangeTechStackOfCreatingBlog = (selectedOptions) => {
    setTechStackOfCreatingBlog(selectedOptions);
  };
  const submitBlogFormDetail = (e) => {
    e.preventDefault();

    const blogTitle = e.target.createBlogTitle.value;
    const blogDescription = e.target.createBlogDescription.value;
    if (blogDescription == "") {
      alert("Please add description");
      return;
    }
    if (blogTitle == "") {
      alert("Please add title");
      return;
    }
    const techy = [];
    techStackOfCreatingBlog?.map((ele) => {
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
        // console.log("in client side response while adding blog", response);
        e.target.createBlogTitle.value = "";
        e.target.createBlogDescription.value = "";
        setTechStackOfCreatingBlog(null);
        setIsUpdated(response);
        console.log("isUpdated", isUpdated);
      })
      .catch((err) => {
        console.log("Some error occurred while adding blog", err);
      });
  };
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setIsBlogLoading(true);
    console.log("inside all blog fetching");
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
        const curBlogsArr = [];
        response.blogs.map((val) => {
          val.blogs.map((data) => {
            const curComments = [];
            data.comments.map((comment) => {
              curComments.push(
                JSON.stringify({
                  name: comment.user.name,
                  college: comment.user.college,
                  content: comment.content,
                })
              );
            });
            // console.log("cur comment", curComments);

            const tempData = {
              name: val.user.name,
              college: val.user.college,
              title: data.title,
              description: data.description,
              techStackUsed: data.techStackUsed,
              likes: data.likes ? data.likes.length : 0,
              comments: curComments,
              url: data.url,
            };
            curBlogsArr.push(tempData);
          });
        });

        setAllBlogsArr(curBlogsArr);
        setGlobalAllBlogsArr(curBlogsArr);
        setIsBlogLoading(false);
      })
      .catch((err) => {
        console.log("Some error occurred while fetching the all blogs", err);
      });
  }, [isUpdated]);
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
        {/*
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
        {/* //company 
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

        {/* //role */
        /*}
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

        {/* name */}

        <div id="feed_container_name" class="feed_container_leftChild">
          Select Name
        </div>
        <form>
          <input
            onChange={handleChangeName}
            id="feed_container_name_input"
            type="text"
            className="feed_container_leftBoxInputChild"
            placeholder="Enter your name here"
            name="specifiedname"
            ref={nameValue}
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
          <span class="material-symbols-outlined" id="addNewBlogIcon">
            add
          </span>
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
        {!isBlogLoading && allBlogsArr ? (
          allBlogsArr.length > 0 ? (
            <div>
              {allBlogsArr.map((ele) => {
                return (
                  <FeedChild
                    key={uuidv4()}
                    name={ele.name}
                    college={ele.college}
                    title={ele.title}
                    description={ele.description}
                    techStackUsed={ele.techStackUsed}
                    comments={ele.comments}
                    likes={ele.likes}
                    url={ele.url}
                  />
                );
              })}
            </div>
          ) : (
            <div>No Blogs present</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div id="feed_container_right">
        <FeedChildRecent key={isUpdated} />
      </div>
    </div>
  );
};
export default Feed;
