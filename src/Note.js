import React, { Component } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ApiContext from "./ApiContext";
import PropTypes from "prop-types";
class Note extends Component {
  static defaultProps = {
    onDeleteNote: () => {},
  };
  static contextType = ApiContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { id, name, modified } = this.props;
    return (
      <div className="Box">
        <h2>
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>

        <div className="boxDetails">
          {/* Date Modified on <span>{format(modified, "Do MMM YYYY")}</span> */}
          <span> Date Modified on {modified}</span>
          <button type="button" onClick={this.handleClickDelete}>
            Delete Note
          </button>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
};

export default Note;
