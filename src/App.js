import { Route, Link } from "react-router-dom";
import React, { Component } from "react";
import NoteListNav from "./NoteListNav";
import NotePageNav from "./NotePageNav";
import NotePageMain from "./NotePageMain";
import NoteListMain from "./NoteListMain";
import ApiContext from "./ApiContext";
import AddFolder from "./AddFolder";
import AddNote from "./AddNote";
import AddFolderError from "./AddFolerError";
import AddNoteError from "./AddNoteError";
class App extends Component {
  state = {
    notes: [],
    folders: [],
  };
  componentDidMount() {
    Promise.all([
      fetch("http://localhost:9090/notes"),
      fetch("http://localhost:9090/folders"),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };
  handleAddFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };
  handleAddNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };
  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.handleDeleteNote,
    };
    return (
      <ApiContext.Provider value={value}>
        <div>
          <header>
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
            <hr />
          </header>
          <section id="main">
            <nav className="mx-3">
              <AddFolderError>
                {["/", "/folder/:folderId"].map((path) => (
                  <Route exact key={path} path={path} component={NoteListNav} />
                ))}{" "}
              </AddFolderError>
              <Route path="/note/:noteId" component={NotePageNav} />
              <Route path="/add-folder" component={AddFolder} />
              <Route path="/add-note" component={AddNote} />
            </nav>

            <main className="mx-3">
              <AddNoteError>
                {["/", "/folder/:folderId"].map((path) => (
                  <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteListMain}
                  />
                ))}
              </AddNoteError>
              <Route path="/note/:noteId" component={NotePageMain} />
            </main>
          </section>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
