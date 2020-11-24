export const findFolder = (folders = [], ID) =>
  folders.find((folder) => folder.id === ID);

export const findNote = (notes = [], ID) =>
  notes.find((note) => note.id === ID);
