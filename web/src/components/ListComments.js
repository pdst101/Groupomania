import React, { Fragment, useState, useEffect } from "react";

const ListComments = (e) => {
  const [comments, setComments] = useState([]);
  const loggedUser = localStorage.getItem("user_id");
  //get all comments
  const getComments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/comments?id=" + e.post
      );
      const jsonData = await response.json();
      setComments(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getComments();
  }, []);
  //delete post
  const deleteComment = async () => {
    try {
      const deleteComment = await fetch(`http://localhost:5000/comments/`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div className="mt-5 text-center">
        <h3>Comments</h3>
      </div>
      {comments.map((comment) => {
        if (comment.author_id == loggedUser) {
          return (
            <div
              key={comment.comment_id}
              className="border border-secondary rounded m-3 p-2"
            >
              <div>
                <strong>{comment.content}</strong> by{" "}
                <strong>
                  <i>{comment.user_name}</i>
                </strong>
              </div>
              <div>
                <button className="btn btn-warning mx-3">Edit</button>
                <button
                  onClick={(e) => deleteComment(e)}
                  className="btn btn-danger mx-3"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={comment.comment_id}
              className="border border-secondary rounded m-3 p-2"
            >
              <div>{comment.content}</div>
              <div>
                by{" "}
                <strong>
                  <i>{comment.user_name}</i>
                </strong>
              </div>
            </div>
          );
        }
      })}
    </Fragment>
  );
};

export default ListComments;
