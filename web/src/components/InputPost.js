import React, { Fragment, useState } from "react";

const InputPost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const fileOnChange = (e) => {
    setImage(e.target.files[0]);
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (image == "") {
      try {
        let authorId = localStorage.getItem("user_id");

        const fileName = "";
        const body = { content, authorId, fileName };
        const respon = await fetch("http://localhost:5000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        window.location = "/dashboard/";
      } catch (err) {
        console.error(err.message);
      }
    } else {
      try {
        let authorId = localStorage.getItem("user_id");
        let form = new FormData();
        form.append("image", image);
        const response = await fetch("http://localhost:5000/multer", {
          method: "POST",
          body: form,
        });
        const parseRes = await response.json();
        const fileName = parseRes;
        const body = { content, authorId, fileName };
        const respon = await fetch("http://localhost:5000/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        window.location = "/dashboard/";
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5 text-secondary">Create Post</h1>
      <form
        className="row"
        action="/multer"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="col-3">
          <input type="file" onChange={fileOnChange} />
        </div>
        <input
          type="text"
          className="form-control w-75 col-7 h-auto"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-success col-2" onClick={onSubmitForm}>
          Add
        </button>
      </form>
    </Fragment>
  );
};

export default InputPost;
