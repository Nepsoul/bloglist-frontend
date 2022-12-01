import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import loginService from "./services/login";

const App = () => {
  const noteFormRef = useRef();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ message: null, type: null });

  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ message: exception.response.data.error, type: "error" });
      setTimeout(() => {
        setMessage({ message: null, type: null });
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="show me login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleBlogCreate = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      noteFormRef.current.togglevisibility();
    });
  };
  // const handleBlogcreate = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const newBlog = {
  //       title,
  //       author,
  //       url,
  //     };

  //     const createdBlog = await blogService.create(newBlog);
  //     setBlogs(blogs.concat(createdBlog));
  //     setTitle("");
  //     setAuthor("");
  //     setUrl("");
  //     setMessage({
  //       message: `a new blog ${createdBlog.title} added by ${createdBlog.author}`,
  //       type: "update",
  //     });
  //     console.log(blogs, "i am blog");
  //     setTimeout(() => {
  //       setMessage({ message: null, type: null });
  //       setMessage(null);
  //     }, 5000);
  //   } catch (exception) {
  //     setMessage({ message: exception.response.data.error, type: "error" });
  //   }
  //   setTimeout(() => {
  //     setMessage({ message: null, type: null });
  //     setMessage(null);
  //   }, 5000);
  // };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={noteFormRef}>
        <BlogForm createBlog={handleBlogCreate} />
      </Togglable>
    );
  };

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message?.message} type={message?.type} />
      {user === null ? (
        <>
          <h2>log into application</h2>
          {loginForm()}
        </>
      ) : (
        <>
          <span>{user.name} logged-in </span>
          <button onClick={logOut}>log out</button>

          <h2>create new</h2>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
