import { useState } from "react";
const BlogForm = ({ createBlog, setMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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

    setMessage({
      message: `a new blog ${title} added by ${author}`,
      type: "update",
    });
    setTimeout(() => {
      setMessage({ message: null, type: null });
      setMessage(null);
    }, 5000);
  };

  return (
    <div>
      <form onSubmit={handleBlogCreate}>
        <div>
          title:{""}
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:{""}
          <input
            type="text"
            name="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:{""}
          <input
            type="text"
            name="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
