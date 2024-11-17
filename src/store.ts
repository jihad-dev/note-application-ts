import { create } from 'zustand';
import { Note, NoteValidationError } from './types';
import { storage } from './utils/storage';

interface NotesStore {
  notes: Note[];
  activeNoteId: string | null;
  searchQuery: string;
  error: NoteValidationError | null;
  addNote: () => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  addTag: (noteId: string, tag: string) => void;
  removeTag: (noteId: string, tag: string) => void;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  notes: storage.getNotes(),
  activeNoteId: null,
  searchQuery: '',
  error: null,

  addNote: () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
    };

    set((state) => {
      const newNotes = [newNote, ...state.notes];
      storage.saveNotes(newNotes);
      return {
        notes: newNotes,
        activeNoteId: newNote.id,
      };
    });
  },

  updateNote: (id, updates) => {
    set((state) => {
      const updatedNotes = state.notes.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      );
      storage.saveNotes(updatedNotes);
      return { notes: updatedNotes };
    });
  },

  deleteNote: (id) => {
    set((state) => {
      const updatedNotes = state.notes.filter((note) => note.id !== id);
      storage.saveNotes(updatedNotes);
      return {
        notes: updatedNotes,
        activeNoteId: state.activeNoteId === id ? null : state.activeNoteId,
      };
    });
  },

  setActiveNote: (id) => {
    set({ activeNoteId: id });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  addTag: (noteId, tag) => {
    const { notes } = get();
    const note = notes.find((n) => n.id === noteId);
    if (note && !note.tags.includes(tag)) {
      const updatedTags = [...note.tags, tag];
      get().updateNote(noteId, { tags: updatedTags });
    }
  },

  removeTag: (noteId, tag) => {
    const { notes } = get();
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      const updatedTags = note.tags.filter((t) => t !== tag);
      get().updateNote(noteId, { tags: updatedTags });
    }
  },
}));