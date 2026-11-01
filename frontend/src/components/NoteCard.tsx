import type { Note } from '../types/note';

interface NoteCardProps {
    note: Note;
    onDelete: (id: number) => void;
}

export const NoteCard = ({ note, onDelete }: NoteCardProps) => {
    return (
        <div className="note-card">
            <button
                className="delete-btn"
                onClick={() => onDelete(note.id)}
                aria-label="Удалить заметку"
            >
                ✕
            </button>
            <div className="note-content">{note.content}</div>
        </div>
    );
};