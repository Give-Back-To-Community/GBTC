import "./Doubt.css";
import Select from "react-select/creatable";
import { useEffect, useRef, useState } from "react";
const Doubt = () => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleChangeUniversity = (selectedOptions) => {
    setSelectedUniversity(selectedOptions);
    // console.log(selectedOptions); // Log the selected options array
  };
  const univOptions = [
    { value: "chitkara", label: "Chitkara University" },
    { value: "harvard", label: "Harvard University" },
    { value: "mit", label: "Massachusetts Institute of Technology" },
    { value: "caltech", label: "California Institute of Technology" },
    { value: "oxford", label: "University of Oxford" },
  ];

  return (
    <div id="doubts_container">
      <div id="doubts_container_left">
        <div id="doubts_container_left_addBlogTitle">
          <div id="doubts_container_left_addBlogTitle_circle">
            <span
              id="doubts_container_left_addBlogTitle_circleIcon"
              class="material-symbols-outlined"
            >
              add
            </span>
          </div>
          <div id="doubts_container_left_addBlogTitle_content">
            Post Your Doubt
          </div>
        </div>
        <div id="doubts_container_left_addBlogContainer">
          <div id="doubts_container_left_addBlogContainer_title">Title</div>
          <input
            type="text"
            id="doubts_container_left_addBlogContainer_inputTitle"
            name="inputtitle"
          ></input>
          <div id="doubts_container_left_addBlogContainer_content">Content</div>
          <input
            type="text"
            id="doubts_container_left_addBlogContainer_inputContent"
            name="inputContent"
          ></input>
          <div id="doubts_container_left_addBlogContainer_image">
            Add picture
          </div>
          <input
            type="file"
            id="doubts_container_left_addBlogContainer_inputPicture"
            name="inputPicture"
          />
          <button
            type="submit"
            id="doubts_container_left_addBlogContainerSubmit"
          >
            Post
          </button>
        </div>
      </div>
      <div id="doubts_container_middle">
        <div id="doubts_container_middle_filterContainer">
          <div id="doubts_container_middle_filterContainer_title">
            Filter Doubts
          </div>
          <div id="doubts_container_middle_filterContainer_box">
            <div id="doubts_container_middle_filterContainer_boxFlex">
              {/* Sort By */}
              {/* Sort By */}
              <div id="doubts_container_middle_filterContainer_boxFlex_SORTBY">
                <div id="doubts_container_middle_filterContainer_box_sortBy">
                  Sort By
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
                  value={selectedUniversity}
                  onChange={handleChangeUniversity}
                  options={univOptions}
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
                />
              </div>
            </div>
            <button id="submitFilter" type="submit">
              Search
            </button>
            <button id="resetFilter" type="reset">
              Reset
            </button>
          </div>
        </div>
        <div id="doubts_container_middle_allDoubtsContainer">
          <div id="doubts_container_middle_allDoubtsContainer1"></div>
          <div id="doubts_container_middle_allDoubtsContainer2"></div>
          <div id="doubts_container_middle_allDoubtsContainer3"></div>
          <div id="doubts_container_middle_allDoubtsContainer4"></div>
          <div id="doubts_container_middle_allDoubtsContainer5"></div>
          <div id="doubts_container_middle_allDoubtsContainer6"></div>
          <div id="doubts_container_middle_allDoubtsContainer7"></div>
          <div id="doubts_container_middle_allDoubtsContainer8"></div>
          <div id="doubts_container_middle_allDoubtsContainer9"></div>
          <div id="doubts_container_middle_allDoubtsContainer10"></div>
        </div>
      </div>
      <div id="doubts_container_right">
        <div id="doubts_container_right_title">Your Doubts</div>
        <div id="doubts_container_right_doubtContainer">
          <div id="doubts_container_right_doubtContainerChild1"></div>
          <div id="doubts_container_right_doubtContainerChild2"></div>
          <div id="doubts_container_right_doubtContainerChild3"></div>
          <div id="doubts_container_right_doubtContainerChild4"></div>
          <div id="doubts_container_right_doubtContainerChild5"></div>
        </div>
      </div>
    </div>
  );
};
export default Doubt;
