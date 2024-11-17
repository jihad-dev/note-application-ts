// import React from 'react';
// import { useNotesStore } from '../store';
// import { TagInput } from './TagInput';

// export function Editor() {
//   const { notes, activeNoteId, updateNote, addTag, removeTag } = useNotesStore();
//   const activeNote = notes.find((note) => note.id === activeNoteId);

//   if (!activeNote) {
//     return (
//       <div className="flex-1 flex items-center justify-center bg-gray-50">
//         <p className="text-gray-500">Select a note or create a new one</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col h-screen bg-white">
//       <div className="px-8 py-6 space-y-4 border-b border-gray-200">
//         <input
//           type="text"
//           value={activeNote.title}
//           onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
//           className="w-full text-3xl font-bold focus:outline-none"
//           placeholder="Note title"
//         />
//         <TagInput
//           tags={activeNote.tags}
//           onAddTag={(tag) => addTag(activeNote.id, tag)}
//           onRemoveTag={(tag) => removeTag(activeNote.id, tag)}
//         />
//       </div>
//       <textarea
//         value={activeNote.content}
//         onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
//         className="flex-1 px-8 py-4 text-lg resize-none focus:outline-none"
//         placeholder="Start writing your note..."
//       />
//     </div>
//   );
// }




import React from 'react';
import { useNotesStore } from '../store';
import { TagInput } from './TagInput';

export function Editor() {
  const { notes, activeNoteId, updateNote, addTag, removeTag } = useNotesStore();
  const activeNote = notes.find((note) => note.id === activeNoteId);

  if (!activeNote) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-center px-4">
          Select a note or create a new one
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-white">
      {/* Header Section */}
      <div className="px-4 py-4 md:px-8 md:py-6 space-y-3 border-b border-gray-200">
        <input
          type="text"
          value={activeNote.title}
          onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
          className="w-full text-xl md:text-3xl font-bold focus:outline-none bg-gray-50 p-2 md:p-3 rounded-lg"
          placeholder="Note title"
        />
        <TagInput
          tags={activeNote.tags}
          onAddTag={(tag) => addTag(activeNote.id, tag)}
          onRemoveTag={(tag) => removeTag(activeNote.id, tag)}
          className="text-sm md:text-base"
        />
      </div>

      {/* Content Section */}
      <textarea
        value={activeNote.content}
        onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
        className="flex-1 px-4 py-3 md:px-8 md:py-4 text-base md:text-lg resize-none focus:outline-none bg-gray-50"
        placeholder="Start writing your note..."
      />
    </div>
  );
}
