import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import icon from "./images/icon.png";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

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
      localStorage.setItem("user_last_log", parseRes.user_last_log);
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
      //a and b compare posts ID
      const sortedData = jsonData.sort((a, b) => b.post_id - a.post_id);
      setPosts(sortedData);
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
  //Delete account
  const deleteAccount = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      const deleteAccount = await fetch(
        `http://localhost:5000/delete/${userId}`,
        {
          method: "DELETE",
        }
      );
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              className="logo img-fluid col-4"
              object-fit="cover"
              src={icon}
            ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={(e) => logout(e)}>Logout</Nav.Link>
              <Nav.Link onClick={(e) => deleteAccount(e)}>
                Dalete Account
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container d-flex row">
        <h1 className="mr-auto p-2 text-secondary col-3">Hello {name}</h1>
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
