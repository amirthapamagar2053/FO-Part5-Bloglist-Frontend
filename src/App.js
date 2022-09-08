import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Logout from "./components/Logout";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setErrorMessage] = useState("");
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
    }
  }, []);

  const clearStorage = () => {
    window.localStorage.clear();
    setUser(null);
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
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (user === null) {
    console.log("the null entered", user);
    return (
      <div>
        <h2>Log in to application</h2>
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
            {message}
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
        <Logout user={user} clearStorage={clearStorage} />
        {blogs
          .filter((blog) => blog.user.username === user.username)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
      </div>
    );
  }
};

export default App;
