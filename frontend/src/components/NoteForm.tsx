import { useState } from 'react';

interface NoteFormProps {
  onAddNote: (content: string) => void;
}

export const NoteForm = ({ onAddNote }: NoteFormProps) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAddNote(content.trim());
    setContent('');
  };

  return (
    <div className="note-form-container">
      <label htmlFor="new-note" className="form-label">
        New Note
      </label>
      <form className="note-form" onSubmit={handleSubmit}>
        <textarea
          id="new-note"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введите текст заметки..."
          required
        />
        <button type="submit" className="send-btn" aria-label="Отправить">
          ➤
        </button>
      </form>
    </div>
  );
};