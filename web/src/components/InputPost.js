import React, { Fragment, useState } from "react";

const InputPost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const fileOnChange = (e) => {
    setImage(e.target.files[0]);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      let authorId = localStorage.getItem("user_id");
      const body = { content, authorId };
      let form = new FormData();
      form.append("image", image);
      const response = await fetch("http://localhost:5000/multer", {
        method: "POST",
        body: form,
      });
      const respon = await fetch("http://localhost:5000/posts", {
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
      <h1 className="text-center mt-5">Create Post</h1>
      <form action="/multer" method="POST" encType="multipart/form-data">
        <input type="file" onChange={fileOnChange} />
        <input
          type="text"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-success" onClick={onSubmitForm}>
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default InputPost;
