import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

//COMPONENTS
import InputPost from "./InputPost";
import ListPosts from "./ListPosts";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
      localStorage.setItem("user_id", parseRes.user_id);
      localStorage.setItem("user_name", parseRes.user_name);
      setLoggedUser(parseRes.user_id);
    } catch (err) {
      console.error(err.message);
    }
  }
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setAuth(false);
    toast.success("Logged out successfully!");
  };
  //get all posts
  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/posts");
      const jsonData = await response.json();
      setPosts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  //delete post
  const deletePost = async (id) => {
    try {
      const deletePost = await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
      });
      setPosts(posts.filter((post) => post.post_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getName();
    getPosts();
  }, []);
  return (
    <Fragment>
      <div className="container d-flex">
        <h1 className="mr-auto p-2">Hello {name}</h1>
        <button className="btn btn-primary p-2" onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>
      <InputPost />
      <ListPosts
        posts={posts}
        loggedUser={loggedUser}
        deletePost={(id) => deletePost(id)}
      />
    </Fragment>
  );
};

export default Dashboard;
