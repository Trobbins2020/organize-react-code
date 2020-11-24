import React, { Component } from "react";
import ApiContext from "./ApiContext";
import { findNote, findFolder } from "./helper";
import PropTypes from "prop-types";

class NotePageNav extends Component {
  static defaultProps = {
    history: {
      goBack: () => {},
    },
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;
  render() {
    const { history } = this.props;
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <div id="notenav">
        <button role="link" onClick={() => history.goBack()}>
          Go Back
        </button>
        {folder && <h3>{folder.name}</h3>}
      </div>
    );
  }
}

NotePageNav.PpropTypes = {
  match: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired,
};

export default NotePageNav;
