import { useState, useEffect, useCallback } from 'react';
import type { Note } from './types/note';
import { NotesList } from './components/NotesList';
import { NoteForm } from './components/NoteForm';
import './App.css';

const API_URL = 'http://localhost:7070/notes';

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // GET: Получение списка заметок
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }
      const data: Note[] = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось загрузить заметки');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // POST: Добавление заметки
  const handleAddNote = async (content: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 0, content }),
      });

      if (!response.ok) {
        throw new Error('Не удалось добавить заметку');
      }

      await fetchNotes(); // Перезапрашиваем актуальный список
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка при добавлении');
    }
  };

  // DELETE: Удаление заметки
  const handleDeleteNote = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Не удалось удалить заметку');
      }

      await fetchNotes(); // Перезапрашиваем актуальный список
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Ошибка при удалении');
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Notes</h1>
        <button
          className={`refresh-btn ${loading ? 'spinning' : ''}`}
          onClick={fetchNotes}
          title="Обновить список"
          aria-label="Обновить"
        >
          🔄
        </button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <main className="main-content">
        <NotesList notes={notes} onDeleteNote={handleDeleteNote} />
        <NoteForm onAddNote={handleAddNote} />
      </main>
    </div>
  );
}
