import "./App.css"
import { useState } from "react"

type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([])
  
  const handleAddNote = (title: string, content: string) => {
    setNotes([...notes, { id: Date.now(), title, content }])
  }

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  return (
    <>
      <div className="app-container">
        <form className="note-form">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Content" rows={10} required value={content} onChange={(e) => setContent(e.target.value)} />
          <button type="submit">Add Note</button>
        </form>
      </div>
      <div className="notes-container">
        {notes.map((note, index) => (
          <div className="note-item" key={index}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button>x</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
