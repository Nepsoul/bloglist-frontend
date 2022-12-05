import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, blogs, setMessage, user }) => {
  const [display, setDisplay] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showToggle = () => {
    setDisplay(!display);
  };

  const raisedLike = async (id, addedlikes) => {
    const updatedBlog = blogs.find((blogs) => blogs.id === id);
    const newBlog = {
      likes: addedlikes,
      author: updatedBlog.author,
      title: updatedBlog.title,
      url: updatedBlog.url,
    };
    const response = await blogService.update(id, newBlog);
    setBlogs(blogs.map((blogs) => (blogs.id === id ? response : blogs)));
  };

  const increasedLikes = (id) => {
    raisedLike(id, blog.likes + 1);
  };

  const deletedBlog = async (id) => {
    // await blogService.remove(id);
    const del = blogs.find((blog) => blog.id === id);
    //setBlogs(blogs.filter((blog) => blog.id !== id));
    console.log(del, "itis de");
    console.log(blog.id, "blog id from del file");
    const notifyMessage = window.confirm(
      `Remove blog ${del.title} by ${del.author}`
    );
    if (notifyMessage) {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
    setMessage({
      message: `${blog.title} blog is deleted by ${blog.author}`,
      type: "error",
    });
    setTimeout(() => {
      setMessage({ message: null, type: null });
    }, 5000);
  };

  return (
    <div style={blogStyle}>
      {!display ? (
        <div>
          {blog.title}
          <button onClick={showToggle}>view</button>
        </div>
      ) : (
        <div>
          <div>
            {blog.title}
            <button onClick={showToggle}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{" "}
            <button onClick={() => increasedLikes(blog.id)}>like</button>
          </div>
          <div>{blog.author}</div>
          <div>
            {blog.user.id === user.id || blog.user ? (
              <button
                style={{
                  color: "brown",
                  backgroundColor: "lightpink",
                  font: " bold",
                }}
                onClick={() => {
                  deletedBlog(blog.id);
                }}
              >
                remove
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
