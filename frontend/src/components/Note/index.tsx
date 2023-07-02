import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { GoPencil, GoPaperclip, GoTrash } from "react-icons/go";

export type NoteData = {
  id?: number;
  title: string;
  content: string;
};

type NoteProps = {
  note?: NoteData;
  onSave: (note: NoteData) => Promise<void>;
  onDelete?: (noteId: number) => void;
};

const Note: React.FC<NoteProps> = ({ note, onSave, onDelete }) => {
  const [noteInputs, setNoteInputs] = useState<NoteData>({
    title: "",
    content: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (note) {
      setNoteInputs(note);
      setIsEdit(true);
    }
  }, [note]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNoteInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveClick = () => {
    isEdit ? onSave({ ...noteInputs, id: note?.id }) : onSave(noteInputs);
    setNoteInputs({ title: "", content: "" });
  };

  const handleDeleteClick = () => {
    if (onDelete && note && note.id) {
      onDelete(note.id);
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-col justify-between border rounded-lg drop-shadow p-4 min-h-[170px] whitespace-pre-wrap",
        isEdit ? "bg-amber-200" : "bg-teal-500"
      )}
    >
      <input
        type="text"
        placeholder="Title"
        className="bg-transparent placeholder:text-gray-500 text-gray-900 placeholder:font-normal font-bold border-none w-full p-4 focus:outline-none"
        value={noteInputs.title}
        name="title"
        onChange={handleInputChange}
      />
      <textarea
        placeholder="Content"
        className="bg-transparent placeholder:text-gray-500 text-gray-900 border-none w-full p-4 focus:outline-none resize-none"
        value={noteInputs.content}
        name="content"
        onChange={handleInputChange}
      />
      <div className="flex items-center justify-between">
        {isEdit ? (
          <>
            <button
              onClick={handleSaveClick}
              disabled={!noteInputs.content || !noteInputs.title}
            >
              <GoPencil size="1.1rem" className="text-amber-950" />
            </button>

            <GoTrash
              onClick={handleDeleteClick}
              className="text-amber-900 cursor-pointer"
              size="1.1rem"
            />
          </>
        ) : (
          <button
            onClick={handleSaveClick}
            disabled={!noteInputs.content || !noteInputs.title}
          >
            <GoPaperclip size="1.1rem" className="text-amber-950" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Note;
