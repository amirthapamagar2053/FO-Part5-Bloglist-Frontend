import { useState } from "react";

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
  const [view, setView] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showDetails = { display: view ? "" : "none" };
  const handleView = () => setView(!view);

  const buttonView = view ? "hide" : "view";
  return (
    <>
      <div style={blogStyle}>
        <div>
          {blog.title} - {blog.author}
          <button onClick={handleView} id="view-button">
            {buttonView}
          </button>
        </div>
        <div style={showDetails}>
          <p>{blog.url}</p>
          <p>
            {blog.likes}{" "}
            <button id="like-button" onClick={() => handleLikeBlog(blog.id)}>
              likes
            </button>
            {/* <p>{blog.user.username} </p> */} {/*Commented out for test*/}
            <button id="remove" onClick={() => handleDeleteBlog(blog.id)}>
              remove
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
export default Blog;
