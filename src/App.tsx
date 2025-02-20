import React from "react"
import "./App.css"
import { useState } from "react"

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleCancel = () => {
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }

  const handleDeleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  }

  const handleUpdateNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content
    }

    const updatedNotes = notes.map(note =>
      note.id === selectedNote.id ? updatedNote : note
    );

    setNotes(updatedNotes)
    setTitle("")
    setContent("")
    setSelectedNote(null);
  }

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("title:", title)
    console.log("content:", content)

    const userNote = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    setNotes([userNote, ...notes]);
    setTitle("");
    setContent("");
  };

  return (
    <>
      <div className="app-container">
        <form className="note-form" onSubmit={(event) => selectedNote ? handleUpdateNote(event) : handleAddNote(event)}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={content} rows={10} required onChange={(e) => setContent(e.target.value)} />

          {selectedNote ? (
            <div className="button-container">
              <button type="submit">Update Note</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>
      </div>
      <div className="notes-container">
        {notes.map((note, index) => (
          <div className="note-item" key={index} onClick={() => handleNoteClick(note)}>
            <button className="delete-button" onClick={(event) => handleDeleteNote(note.id)}>x</button>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
