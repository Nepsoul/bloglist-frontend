import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  //console.log(setMessage);
  const handleBlogCreate = (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");

    dispatch(
      setNotification({
        message: `a new blog ${title} added by ${author}`,
        type: "update",
      })
    );
    setTimeout(() => {
      dispatch(setNotification({ message: null, type: null }));
      //setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <form onSubmit={handleBlogCreate}>
        <div>
          title:{""}
          <input
            id="title"
            type="text"
            name="title"
            value={title}
            placeholder="title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:{""}
          <input
            id="author"
            type="text"
            name="author"
            value={author}
            placeholder="author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:{""}
          <input
            id="url"
            type="text"
            name="url"
            value={url}
            placeholder="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id="add" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
