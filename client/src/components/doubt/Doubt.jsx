import "./Doubt.css";
import Select from "react-select/creatable";
import { useEffect, useRef, useState } from "react";
import DoubtChild from "./DoubtChild";
import { v4 as uuidv4 } from "uuid";
import MyDoubt from "./MyDoubt";
import { Link } from "react-router-dom";
const Doubt = () => {
  const filterTitle = useRef(null);
  const filterBox = useRef(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedResolved, setSelectedResolved] = useState(null);
  const [globalDoubtArr, setGlobalDoubtArr] = useState([]);
  const [allDoubtArr, setAllDoubtArr] = useState([]);
  const [myDoubtArr, setMyDoubtArr] = useState([]);
  const [isLoadingPostDoubtButton, setIsLoadingPostDoubtButton] =
    useState(false);
  const filterTitleInput = useRef(null);
  const filterContentInput = useRef(null);
  const submitFilter = useRef(null);
  const resetFilter = useRef(null);

  const handleChangeUniversity = (selectedOptions) => {
    setSelectedUniversity(selectedOptions);
    // console.log(selectedOptions); // Log the selected options array
  };
  const handleChangeResolved = (selectedOptions) => {
    setSelectedResolved(selectedOptions);
    // console.log(selectedOptions); // Log the selected options array
  };
  const univOptions = [
    { value: "chitkara", label: "Chitkara University" },
    { value: "harvard", label: "Harvard University" },
    { value: "mit", label: "Massachusetts Institute of Technology" },
    { value: "caltech", label: "California Institute of Technology" },
    { value: "oxford", label: "University of Oxford" },
  ];
  const resolveOptions = [
    { value: 0, label: "Yes , resolved doubt" },
    { value: 1, label: "No , no answers available" },
  ];

  //filter button clicked
  //filter button clicked
  //filter button clicked  //filter button clicked
  //filter button clicked
  //filter button clicked
  //filter button clicked
  //filter button clicked

  useEffect(() => {
    if (
      submitFilter.current &&
      filterTitleInput.current &&
      filterContentInput.current &&
      resetFilter.current
    ) {
      submitFilter.current.onclick = () => {
        console.log(globalDoubtArr);

        const newFilteredData = globalDoubtArr.filter((doubt) => {
          const titleMatch =
            filterTitleInput.current.value == "" ||
            doubt.title
              .toLowerCase()
              .includes(filterTitleInput.current.value?.toLowerCase());
          const contentMatch =
            filterContentInput.current.value == "" ||
            doubt.content
              .toLowerCase()
              .includes(filterContentInput.current.value?.toLowerCase());

          const universityMatch =
            !selectedUniversity ||
            doubt.college
              .toLowerCase()
              .includes(selectedUniversity.label.toLowerCase());
          const resolvedMatch =
            !selectedResolved ||
            (selectedResolved.value == 0 && doubt.resolved) ||
            (selectedResolved.value == 1 && !doubt.resolved);

          return titleMatch && contentMatch && universityMatch && resolvedMatch;
        });
        setAllDoubtArr(newFilteredData);
      };

      resetFilter.current.onclick = () => {
        filterTitleInput.current.value = "";
        filterContentInput.current.value = "";
        setSelectedUniversity(null);
        setSelectedResolved(null);
        setAllDoubtArr(globalDoubtArr);
      };
    }
  });

  const clickedFilter = () => {};

  // for filter animation
  // for filter animation
  // for filter animation
  // for filter animation
  // for filter animation

  useEffect(() => {
    if (filterBox.current && filterTitle.current) {
      filterTitle.current.onclick = () => {
        if (filterBox.current.style.height == "0rem") {
          filterBox.current.style.height = "21rem";
        } else {
          filterBox.current.style.height = "0rem";
        }
      };
    }
  }, []);

  // fetching all doubts
  // fetching all doubts
  // fetching all doubts
  // fetching all doubts
  // fetching all doubts

  const fetchAllDoubt = () => {
    fetch("https://gbtc-hd4r.onrender.com/api/doubts/view/all")
      .then((res) => res.json())
      .then((response) => {
        // console.log("all doubts arr", response.populatedQuery);
        const curArr = [];
        response.populatedQuery?.map((ele, index) => {
          curArr.push({
            title: ele.title,
            content: ele.content,
            name: ele.user.name,
            college: ele.user.college,
            resolved: ele.resolved,
            doubtPictureUrl: ele.doubtPictureUrl,
            profilePictureUrl: ele.user.profilePictureUrl,
            url: ele.url,
          });
        });
        setAllDoubtArr(curArr);
        setGlobalDoubtArr(curArr);
        // console.log(allDoubtArr);
      })
      .catch((err) => {
        console.log(
          "Some error occurred while fetching all doubts",
          err.message
        );
      });
  };
  useEffect(() => {
    fetchAllDoubt();
  }, []);

  // fetching my doubts
  // fetching my doubts
  // fetching my doubts
  // fetching my doubts
  // fetching my doubts

  const fetchMyDoubts = () => {
    fetch("https://gbtc-hd4r.onrender.com/api/doubts/view/my", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        const arr = [];
        response?.myDoubt?.map((ele) => {
          arr.push({
            title: ele.title,
            content: ele.content,
            name: ele.user.name,
            college: ele.user.college,
            resolved: ele.resolved,
            doubtPictureUrl: ele.doubtPictureUrl,
            profilePictureUrl: ele.user.profilePictureUrl,
            url: ele.url,
          });
        });
        setMyDoubtArr(arr);
        // console.log("my doubts arr", myDoubtArr);
      })
      .catch((err) => {
        console.log(
          "Some error occurred while fetching my doubts",
          err.message
        );
      });
  };
  useEffect(() => {
    fetchMyDoubts();
  }, []);

  // adding doubt
  // adding doubt
  // adding doubt
  // adding doubt

  const addDoubtForm = async (e) => {
    setIsLoadingPostDoubtButton(true);

    e.preventDefault();

    const title = e.target.inputTitle?.value;
    const content = e.target.inputContent?.value;

    if (!title || !content) {
      setIsLoadingPostDoubtButton(false);

      if (!title) {
        alert("Please enter title");
        return;
      } else {
        alert("Please enter content");
        return;
      }
    }

    const file = e.target.inputPicture?.files[0];
    // console.log(title, content, file);

    let doubtPictureUrl = "";
    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
    if (file) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: uploadFormData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          doubtPictureUrl = data.secure_url;
          // console.log("blog picture", doubtPictureUrl);
        } else {
          console.error("Image upload failed");
          return;
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        return;
      }
    }

    fetch("https://gbtc-hd4r.onrender.com/api/doubts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, content, doubtPictureUrl }),
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log("response from adding the doubt", response);
        setIsLoadingPostDoubtButton(false);
        fetchMyDoubts();
        fetchAllDoubt();
        e.target.reset();
        alert("Successfully added your doubt");
      })
      .catch((err) => {
        console.log(
          "Some error  occurred while fetching all doubts",
          err.message
        );
        setIsLoadingPostDoubtButton(false);
      });
  };

  return (
    <div id="doubts_container">
      <div id="doubts_container_left">
        <div id="doubts_container_left_addDoubtTitle">
          <div id="doubts_container_left_addDoubtTitle_circle">
            <span
              id="doubts_container_left_addDoubtTitle_circleIcon"
              class="material-symbols-outlined"
            >
              add
            </span>
          </div>
          <div id="doubts_container_left_addDoubtTitle_content">
            Post Your Doubt
          </div>
        </div>
        {localStorage.getItem("token") ? (
          <form
            id="doubts_container_left_addDoubtContainer"
            onSubmit={addDoubtForm}
          >
            <div id="doubts_container_left_addDoubtContainer_title">Title</div>
            <input
              type="text"
              id="doubts_container_left_addDoubtContainer_inputTitle"
              name="inputTitle"
            ></input>
            <div id="doubts_container_left_addDoubtContainer_content">
              Content
            </div>
            <input
              type="text"
              id="doubts_container_left_addDoubtContainer_inputContent"
              name="inputContent"
            ></input>
            <div id="doubts_container_left_addDoubtContainer_image">
              Add picture
            </div>
            <input
              type="file"
              id="doubts_container_left_addDoubtContainer_inputPicture"
              name="inputPicture"
            />
            <div id="loadingPostDoubt">
              {isLoadingPostDoubtButton ? "Loading..." : ""}
            </div>
            <button
              type="submit"
              id="doubts_container_left_addDoubtContainerSubmit"
            >
              Post
            </button>
          </form>
        ) : (
          <div id="noTokenPostDoubt">Please login to post your doubts</div>
        )}
      </div>
      <div id="doubts_container_middle">
        <div id="doubts_container_middle_filterContainer">
          <div
            id="doubts_container_middle_filterContainer_title"
            ref={filterTitle}
          >
            Filter Doubts
          </div>
          <div id="doubts_container_middle_filterContainer_box" ref={filterBox}>
            <div id="doubts_container_middle_filterContainer_boxFlex">
              {/* Sort By */}
              {/* Sort By */}
              <div id="doubts_container_middle_filterContainer_boxFlex_SORTBY">
                <div id="doubts_container_middle_filterContainer_box_sortBy">
                  Select University
                </div>
                <Select
                  value={selectedUniversity}
                  onChange={handleChangeUniversity}
                  options={univOptions}
                  isMulti={false} // Set to false to allow only one option to be selected
                  className="doubts_container_middle_filterContainer_box_sortBySelect"
                ></Select>
              </div>
              {/* resolved */}
              {/* resolved */}
              <div id="doubts_container_middle_filterContainer_boxFlex_RESOLVED">
                <div id="doubts_container_middle_filterContainer_box_resolved">
                  Resolved
                </div>
                <Select
                  value={selectedResolved}
                  onChange={handleChangeResolved}
                  options={resolveOptions}
                  isMulti={false} // Set to false to allow only one option to be selected
                  className="doubts_container_middle_filterContainer_box_resolvedSelect"
                ></Select>
              </div>
              {/* title */}
              {/* title */}
              <div id="doubts_container_middle_filterContainer_boxFlex_TITLE">
                <div id="doubts_container_middle_filterContainer_box_title">
                  Title
                </div>
                <input
                  type="text"
                  id="doubts_container_middle_filterContainer_box_titleInput"
                  name="titleFilterInput"
                  ref={filterTitleInput}
                />
              </div>
              {/* content */}
              {/* content */}
              <div id="doubts_container_middle_filterContainer_boxFlex_CONTENT">
                <div id="doubts_container_middle_filterContainer_box_content">
                  Content
                </div>
                <input
                  type="text"
                  id="doubts_container_middle_filterContainer_box_contentInput"
                  name="conventFilterInput"
                  ref={filterContentInput}
                />
              </div>
            </div>
            <button id="submitFilter" type="submit" ref={submitFilter}>
              Search
            </button>
            <button id="resetFilter" type="reset" ref={resetFilter}>
              Reset
            </button>
          </div>
        </div>
        <div id="doubts_container_middle_allDoubtsContainer">
          {allDoubtArr.length > 0 ? (
            allDoubtArr.map((ele) => {
              return (
                <DoubtChild
                  key={uuidv4()}
                  name={ele.name}
                  title={ele.title}
                  content={ele.content}
                  college={ele.college}
                  resolved={ele.resolved}
                  doubtPictureUrl={ele.doubtPictureUrl}
                  profilePictureUrl={ele.profilePictureUrl}
                  url={ele.url}
                />
              );
            })
          ) : (
            <div id="shimmerUi_doubtChild">
              <div
                id="shimmerUi_doubtChild_1"
                className="shimmerUi_doubtChildClass"
              ></div>
              <div
                id="shimmerUi_doubtChild_2"
                className="shimmerUi_doubtChildClass"
              ></div>
              <div
                id="shimmerUi_doubtChild_3"
                className="shimmerUi_doubtChildClass"
              ></div>
              <div
                id="shimmerUi_doubtChild_4"
                className="shimmerUi_doubtChildClass"
              ></div>
              <div
                id="shimmerUi_doubtChild_5"
                className="shimmerUi_doubtChildClass"
              ></div>
            </div>
          )}
        </div>
      </div>
      <div id="doubts_container_right">
        <div id="doubts_container_right_title">Your Doubts</div>

        {localStorage.getItem("token") ? (
          <>
            {myDoubtArr.length > 0 ? (
              <div id="doubts_container_right_doubtContainer">
                {myDoubtArr.map((ele) => {
                  return (
                    // <Link
                    //   style={{ textDecoration: "none", color: "black" }}
                    //   to={`/doubt/${ele.url}`}
                    // >
                    <MyDoubt
                      key={uuidv4()}
                      title={ele.title.substring(
                        0,
                        Math.min(30, ele.title.length)
                      )}
                      content={ele.content.substring(
                        0,
                        Math.min(120, ele.content.length)
                      )}
                      url={ele.url}
                    />
                    // </Link>
                  );
                })}
              </div>
            ) : (
              <div id="shimmerUi_myDoubt">
                <div
                  id="shimmerUi_myDoubt_child1"
                  className="shimmerUi_myDoubt_child"
                ></div>
                <div
                  id="shimmerUi_myDoubt_child2"
                  className="shimmerUi_myDoubt_child"
                ></div>
                <div
                  id="shimmerUi_myDoubt_child3"
                  className="shimmerUi_myDoubt_child"
                ></div>
                <div
                  id="shimmerUi_myDoubt_child4"
                  className="shimmerUi_myDoubt_child"
                ></div>
                <div
                  id="shimmerUi_myDoubt_child5"
                  className="shimmerUi_myDoubt_child"
                ></div>
              </div>
            )}
          </>
        ) : (
          <div style={{ marginTop: "2rem" }}>
            {" "}
            Login to view all your doubts
          </div>
        )}
      </div>
    </div>
  );
};
export default Doubt;
