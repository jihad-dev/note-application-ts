// import React from 'react';
// import { PlusCircle, Search } from 'lucide-react';
// import { useNotesStore } from '../store';
// import { NoteCard } from './NoteCard';

// export function Sidebar() {
//   const {
//     notes,
//     activeNoteId,
//     searchQuery,
//     addNote,
//     deleteNote,
//     setActiveNote,
//     setSearchQuery,
//   } = useNotesStore();

//   const filteredNotes = notes.filter(
//     (note) =>
//       note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       note.tags.some((tag) =>
//         tag.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//   );

//   return (
//     <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
//       <div className="p-4">
//         <button
//           onClick={addNote}
//           className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
//         >
//           <PlusCircle size={20} />
//           <span>New Note</span>
//         </button>
        
//         <div className="mt-4 relative">
//           <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search notes..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         {filteredNotes.map((note) => (
//           <NoteCard
//             key={note.id}
//             note={note}
//             isActive={activeNoteId === note.id}
//             onSelect={() => setActiveNote(note.id)}
//             onDelete={() => deleteNote(note.id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }




import React, { useState } from 'react';
import { PlusCircle, Search, Menu, X } from 'lucide-react';
import { useNotesStore } from '../store';
import { NoteCard } from './NoteCard';

export function Sidebar() {
  const {
    notes,
    activeNoteId,
    searchQuery,
    addNote,
    deleteNote,
    setActiveNote,
    setSearchQuery,
  } = useNotesStore();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div>
      {/* Mobile Header */}
      <div className="sm:hidden flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">My Notes</h1>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } sm:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-gray-50 border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0 sm:static sm:w-64 w-64 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 sm:block hidden">
            My Notes
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none sm:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Add Note Button */}
        <div className="p-4">
          <button
            onClick={addNote}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusCircle size={20} />
            <span>New Note</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isActive={activeNoteId === note.id}
              onSelect={() => setActiveNote(note.id)}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
