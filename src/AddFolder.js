import React, { Component } from "react";
import ApiContext from "./ApiContext";
import NotefulForm from "./NotefulForm";
import PropTypes from "prop-types";
class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const folder = {
      name: e.target["name"].value,
    };
    fetch(`http://localhost:9090/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folder),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((folder) => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    return (
      <NotefulForm onSubmit={this.handleSubmit}>
        <h2>Add Folder</h2>
        <div className="inputdiv">
          <label htmlFor="name">
            Name<span className="red">*</span>
          </label>
          <input type="text" name="name" id="name" required />
        </div>
        <br />
        <div>
          <button type="submit">Sumbit</button>
          <button role="link" onClick={() => this.props.history.goBack()}>
            Cancle
          </button>
        </div>
      </NotefulForm>
    );
  }
}

AddFolder.PpropTypes = {
  history: PropTypes.string.isRequired,
};
export default AddFolder;
