import React, { Fragment, useState } from "react";
import ListComments from "./ListComments";
import TextField from "@mui/material/TextField";

const CommentPost = ({ post }) => {
  const [comment, setComment] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const userName = localStorage.getItem("user_name");
      const authorId = localStorage.getItem("user_id");
      const postId = post.post_id;
      const body = { comment, authorId, postId, userName };
      const response = await fetch("http://localhost:5000/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/dashboard/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div>
        <h4 className="text-center mt-5">Add Comment</h4>
      </div>
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Comment content"
          className="form-control w-75 col-7 h-auto"
          multiline
          maxRows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div>
        <button
          type="button"
          className="btn btn-success h-25 mx-4"
          onClick={onSubmitForm}
        >
          Add Comment
        </button>
        <ListComments post={post.post_id} />
      </div>
    </Fragment>
  );
};

export default CommentPost;

{
  /* <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target={`#commentid${post.post_id}`}
      >
        Comments
      </button>
      <div
        className="modal"
        id={`commentid${post.post_id}`}
        onClick={() => setComment(post.comment)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Comment</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setComment(post.comment)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => onSubmitForm(e)}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setComment(post.comment)}
              >
                Close
              </button>
              <ListComments post={post.post_id} />
            </div>
          </div>
        </div>
      </div> */
}
