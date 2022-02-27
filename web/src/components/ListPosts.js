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
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Content</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.posts.map((post) => {
            if (post.author_id === props.loggedUser) {
              return (
                <tr key={post.post_id}>
                  <td>{post.content}</td>
                  <td>
                    <EditPost post={post} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePost(post.post_id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <CommentPost post={post} />
                  </td>
                  <td>
                    {post.post_time > localStorage.getItem("user_last_log")
                      ? "new"
                      : ""}
                  </td>
                </tr>
              );
            }
            return (
              <tr key={post.post_id}>
                <td>{post.content}</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <CommentPost post={post} />
                </td>
                <td>
                  {post.post_time > localStorage.getItem("user_last_log")
                    ? "new"
                    : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListPosts;
