import type { Note } from '../types/note';
import { NoteCard } from './NoteCard';

interface NotesListProps {
    notes: Note[];
    onDeleteNote: (id: number) => void;
}

export const NotesList = ({ notes, onDeleteNote }: NotesListProps) => {
    if (notes.length === 0) {
        return <div className="no-notes">Заметок пока нет. Добавьте первую!</div>;
    }

    return (
        <div className="notes-grid">
            {notes.map((note) => (
                <NoteCard key={note.id} note={note} onDelete={onDeleteNote} />
            ))}
        </div>
    );
};