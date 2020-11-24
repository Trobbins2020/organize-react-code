import React, { Component } from "react";
import Note from "./Note";
import ApiContext from "./ApiContext";
import { findNote } from "./helper";
import PropTypes from "prop-types";

class NotePageMain extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;
  handleDeleteNote = (noteId) => {
    this.props.history.push(`/`);
  };
  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: "" };
    const { id, name, modified, content } = note;
    return (
      <section>
        <Note
          id={id}
          name={name}
          modified={modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div>
          {content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}
NotePageMain.PpropTypes = {
  match: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};
export default NotePageMain;
