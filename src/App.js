import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  // const [message, setErrorMessage] = useState("");
  const [notification, setNotification] = useState(null);
  const [classStatus, setStatus] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("the useeffect entered");
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const clearStorage = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const newObj = {
        title,
        author,
        url,
      };
      const newBlog = await blogService.create(newObj);
      console.log(newBlog);
      setBlogs([...blogs, newBlog]);
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      setTitle("");
      setAuthor("");
      setUrl("");
      setStatus("message");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (exception) {
      // ...
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      // setErrorMessage("Wrong credentials");
      // setTimeout(() => {
      //   setErrorMessage(null);
      // }, 5000);
      setNotification("Wrong username or password");
      setStatus("delete");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  if (user === null) {
    console.log("the null entered", user);
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification classStatus={classStatus} notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            {/* {message} */}
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  } else {
    console.log("the else entered", user);
    return (
      <div>
        <h2>blogs</h2>
        <Notification classStatus={classStatus} notification={notification} />
        <Logout user={user} clearStorage={clearStorage} />
        <h2>create new</h2>
        <form onSubmit={handleCreate}>
          <div>
            Title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>
        {blogs
          // .filter((blog) => blog.user.username === user.username)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    );
  }
};

export default App;
