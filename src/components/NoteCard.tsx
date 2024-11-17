import React from 'react';
import { FileText, Trash2, Tag as TagIcon } from 'lucide-react';
import { Note } from '../types';

interface NoteCardProps {
  note: Note;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function NoteCard({ note, isActive, onSelect, onDelete }: NoteCardProps) {
  return (
    <div
      className={`p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-100 ${
        isActive ? 'bg-gray-100' : ''
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-gray-500" />
          <h3 className="font-medium text-gray-900 truncate">{note.title}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <Trash2 size={16} className="text-gray-500" />
        </button>
      </div>
      <p className="mt-1 text-sm text-gray-500 truncate">{note.content}</p>
      
      {note.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs"
            >
              <TagIcon size={12} />
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <p className="mt-2 text-xs text-gray-400">
        {new Date(note.updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}