import React, { Fragment } from "react";
import EditPost from "./EditPost";
import CommentPost from "./CommentPost";

const ListPosts = (props) => {
  //delete post
  const deletePost = async (id) => {
    props.deletePost(id);
  };
  return (
    <Fragment>
      <div className="mt-5 text-center">
        {/* <div>
          <div className="row my-3 table-headers p-3">
            <div className="col-6">Content</div>
            <div className="col-2">Edit</div>
            <div className="col-2">Delete</div>
            <div className="col-2">Comments</div>
          </div>
        </div> */}
        <div>
          {props.posts.map((post) => {
            if (post.author_id === props.loggedUser) {
              return (
                <div className="singlePost row" key={post.post_id}>
                  <div className="col-12">
                    <img
                      className=""
                      src={`http://localhost:5000/multer/static/${post.file_name}`}
                      style={
                        post.file_name != ""
                          ? { display: "block", margin: "auto", width: "50%" }
                          : { display: "none" }
                      }
                    />

                    <div className="post-content">{post.content}</div>
                  </div>
                  <div className="col-6">
                    <EditPost post={post} />
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePost(post.post_id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="col-12">
                    <CommentPost post={post} />
                  </div>
                  <div>
                    {post.post_time > localStorage.getItem("user_last_log")
                      ? "new"
                      : ""}
                  </div>
                </div>
              );
            }
            return (
              <div className="singlePost row" key={post.post_id}>
                <div className="col-12 m-auto">
                  <img
                    src={`http://localhost:5000/multer/static/${post.file_name}`}
                    style={
                      post.file_name != ""
                        ? { display: "block", margin: "auto", width: "50%" }
                        : { display: "none" }
                    }
                  />
                  <div className="post-content">{post.content}</div>
                </div>
                <div className="col-6"></div>
                <div className="col-6"></div>
                <div className="col-12">
                  <CommentPost post={post} />
                </div>
                <div>
                  {post.post_time > localStorage.getItem("user_last_log")
                    ? "new"
                    : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default ListPosts;
