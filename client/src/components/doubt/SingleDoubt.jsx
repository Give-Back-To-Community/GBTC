import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SingleDoubt.css";
import { useNavigate } from "react-router-dom";

const SingleDoubt = () => {
  const navigate = useNavigate();
  const { url } = useParams();
  const [doubtDetails, setDoubtDetails] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [canDeleteDoubts, setCanDeleteDoubts] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    }
    fetch(`http://localhost:5000/api/doubts/singleDoubt/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(
              `Error occurred while fetching the single doubt ${err.message}`
            );
          });
        }

        return res.json();
      })
      .then((response) => {
        console.log(response);
        setDoubtDetails(response.curDoubt);
        console.log("m" + doubtDetails._id + "doubtDetails");
      })
      .catch((err) => {
        console.log(err);
        alert("Error in fetching this doubt .Please try again later");
      });

    console.log("m" + doubtDetails + "doubtDetails");
    fetch("http://localhost:5000/api/doubts/canDelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: doubtDetails._id }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("can delete doubt", response);
        setCanDeleteDoubts(true);
      })
      .catch((err) => {
        setCanDeleteDoubts(false);

        console.log("Not authorized to delete this doubt", err);
      });
  }, []);

  const deleteDoubt = () => {
    fetch(`http://localhost:5000/api/doubts/${doubtDetails._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .catch((res) => res.json())
      .then((response) => {
        alert("Successfully deleted the doubt navigating to all doubts page");
        navigate("/doubt");
      })
      .catch((err) => {
        console.log("Some error occured while deleting the doubt", err);
        alert(`Some error occured while deleting the doubt ,${err}`);
      });
  };

  const postAnswer = (e) => {
    e.preventDefault();

    const content = e.target.answerInput.value;
    if (!content) {
      alert("Answer is empty");
      return;
    }

    fetch(`http://localhost:5000/api/doubts/${url}/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ content }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        e.target.reset();
        setDoubtDetails(response);
      })
      .catch((err) => {
        console.log("Some error occurred while posting the answer");
      });
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <div id="single_doubt_container">
          <div id="single_doubt_container_title">{doubtDetails.title}</div>
          <div id="single_doubt_container_middle">
            <div id="single_doubt_container_leftContent">
              {doubtDetails.content}
            </div>
            <div id="single_doubt_container_rightPhoto">
              {doubtDetails.doubtPictureUrl ? (
                <img
                  id="single_doubt_container_rightPhoto_image"
                  src={doubtDetails.doubtPictureUrl}
                ></img>
              ) : (
                <div id="single_doubt_container_rightPhoto_noImage">
                  No image
                </div>
              )}
            </div>
          </div>
          <div id="single_doubt_container_answers">
            <div id="single_doubt_container_answers_header">Answers</div>
            <form
              id="single_doubt_container_answers_post"
              onSubmit={postAnswer}
            >
              <input
                type="text"
                id="single_doubt_container_answers_postInput"
                placeholder="Write your answer here"
                name="answerInput"
              ></input>
              <button
                type="submit"
                id="single_doubt_container_answers_post_button"
              >
                Post
              </button>
            </form>
            <div id="single_doubt_container_answers_content">
              {doubtDetails.answers ? (
                doubtDetails.answers.length > 0 ? (
                  doubtDetails.answers.map((ele) => {
                    return (
                      <div id="single_doubt_container_answers_singleAnswerContainer">
                        <div id="single_doubt_container_answers_singleAnswerContainer_user">
                          <div id="single_doubt_container_answers_singleAnswerContainer_user_name">
                            {ele.user.name.toUpperCase()}
                          </div>
                          <div id="single_doubt_container_answers_singleAnswerContainer_user_college">
                            {" "}
                            {ele.user.college}
                          </div>
                        </div>
                        <div id="single_doubt_container_answers_singleAnswerContainer_content">
                          {ele.content}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="single_doubt_container_answers_noAnswers_class">
                    No answers available
                  </div>
                )
              ) : (
                <div
                  className="single_doubt_container_answers_noAnswers_class"
                  id="single_doubt_container_answers_noAnswers"
                >
                  No answers available
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div> Please login first to view this doubt</div>
      )}
    </>
  );
};

export default SingleDoubt;
