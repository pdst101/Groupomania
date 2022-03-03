import React, { Fragment, useState } from "react";

const EditComment = ({ comment }) => {
  const [content, setContent] = useState(comment.content);

  //Edit content
  const editContent = async (e) => {
    e.preventDefault();
    try {
      const body = { content };
      const response = await fetch(
        `http://localhost:5000/comments/${comment.comment_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      window.location = "/dashboard/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#id${comment.comment_id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${comment.comment_id}`}
        onClick={() => setContent(comment.content)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Post</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setContent(comment.content)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => editContent(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setContent(comment.content)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditComment;
