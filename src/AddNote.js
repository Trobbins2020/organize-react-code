import React, { Component } from "react";
import NotefulForm from "./NotefulForm";
import ApiContext from "./ApiContext";
import PropTypes from "prop-types";
class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      name: e.target["name"].value,
      content: e.target["content"].value,
      folderId: e.target["folderId"].value,
      modified: new Date(),
    };
    fetch(`http://localhost:9090/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/folder/${note.folderId}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { folders = [] } = this.context;
    return (
      <section>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="inputdiv">
            <div>
              <label htmlFor="name-input">
                Name<span className="red">*</span>
              </label>
            </div>
            <div>
              <input type="text" id="name-input" name="name" required />
            </div>
          </div>
          <div className="inputdiv">
            <label htmlFor="content-input">
              Content<span className="red">*</span>
            </label>
            <textarea id="content-input" name="content" required />
          </div>
          <div className="inputdiv">
            <label htmlFor="folder_select">
              Folder<span className="red">*</span>
            </label>
            <select id="folder_select" name="folderId" required>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="buttons">
            <button type="submit">Add note</button>
            <button role="link" onClick={() => this.props.history.goBack()}>
              Cancle
            </button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}

AddNote.PpropTypes = {
  history: PropTypes.string.isRequired,
};
export default AddNote;
