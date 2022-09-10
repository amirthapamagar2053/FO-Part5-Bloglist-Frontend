import { useState } from "react";

const NoteForm = ({ handleCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    handleCreate({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
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
    </>
  );
};

export default NoteForm;
