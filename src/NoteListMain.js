import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "./Note";
import ApiContext from "./ApiContext";
import PropTypes from "prop-types";
class NoteListMain extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;
  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = !folderId
      ? notes
      : notes.filter((note) => note.folderId === folderId);
    return (
      <div>
        <ul>
          {notesForFolder.map((note) => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
              <br />
            </li>
          ))}
        </ul>
        <Link to={`/add-note`} className="linkto">
          Add Note
        </Link>
      </div>
    );
  }
}
NoteListMain.PpropTypes = {
  match: PropTypes.string.isRequired,
};
export default NoteListMain;
