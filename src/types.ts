export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export type NoteValidationError = {
  title?: string;
  content?: string;
}