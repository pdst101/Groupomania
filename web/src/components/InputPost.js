import React, { Fragment, useState } from "react";
// import axios from 'axios';

const InputPost = () => {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  //   const onFormSubmit = (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();
  //     formData.append('image', file);
  //     const config = {
  //       headers: {'content-type': 'multipart/form-data',}
  //     },
  // };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let authorId = localStorage.getItem("user_id");
      const body = { content, authorId };
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/dashboard/";
    } catch (err) {
      console.error(err.message);
    }
  };
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Create Post</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        {/* <input type="file" name="image" onChange={onInputChange} /> */}
        <input
          type="text"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputPost;
