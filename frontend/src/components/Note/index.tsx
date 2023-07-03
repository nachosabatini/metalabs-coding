import { useState, useEffect, FC } from "react";
import clsx from "clsx";
import { GoPencil, GoTrash } from "react-icons/go";
import { Note } from "../../types";
import { BsFillCheckCircleFill } from "react-icons/bs";

type NoteProps = {
  note?: Note;
  onSave: (note: Note) => Promise<void>;
  onDelete?: (noteId: number) => void;
};

const NoteCard: FC<NoteProps> = ({ note, onSave, onDelete }) => {
  const [noteInputs, setNoteInputs] = useState<Note>({
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
    if (isEdit) {
      onSave({ ...noteInputs, id: note?.id });
    } else {
      onSave(noteInputs);
      setNoteInputs({ title: "", content: "" });
    }
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
        isEdit ? "bg-amber-200" : "bg-teal-200"
      )}
    >
      <input
        type="text"
        placeholder="Title"
        className="bg-transparent placeholder:text-gray-700 text-gray-900 placeholder:font-normal font-bold border-none w-full p-4 focus:outline-none"
        value={noteInputs.title}
        name="title"
        onChange={handleInputChange}
      />
      <textarea
        placeholder="Content"
        className="bg-transparent placeholder:text-gray-700 text-gray-900 border-none w-full p-4 focus:outline-none resize-none"
        value={noteInputs.content}
        name="content"
        onChange={handleInputChange}
      />
      <div className="flex items-center justify-between flex-row-reverse pt-4">
        {isEdit ? (
          <>
            <GoTrash
              onClick={handleDeleteClick}
              className="text-amber-900 cursor-pointer"
              size="1.1rem"
            />
            <button
              onClick={handleSaveClick}
              disabled={!noteInputs.content || !noteInputs.title}
              className="disabled:cursor-not-allowed"
            >
              <GoPencil size="1.1rem" className="text-amber-950" />
            </button>
          </>
        ) : (
          <button
            onClick={handleSaveClick}
            disabled={!noteInputs.content || !noteInputs.title}
            className="disabled:cursor-not-allowed"
          >
            <BsFillCheckCircleFill size="1.1rem" className="text-teal-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
