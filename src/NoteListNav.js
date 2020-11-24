import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import ApiContext from "./ApiContext";
class NoteListNav extends Component {
  static contextType = ApiContext;
  render() {
    const { folders = [], notes = [] } = this.context;
    return (
      <div>
        <ul>
          {folders.map((folder) => (
            <NavLink to={`/folder/${folder.id}`} key={folder.id}>
              <li className="linkto">
                {folder.name}{" "}
                <strong>
                  ({notes.filter((note) => note.folderId === folder.id).length})
                </strong>
              </li>
            </NavLink>
          ))}
        </ul>
        <br />
        <Link to={`/add-folder`} className="linkto">
          Add Folder
        </Link>
      </div>
    );
  }
}

export default NoteListNav;
