import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ViewAllTaskCard = ({ task, refetch }) => {
  const { _id, title, description, category } = task;
  const [isOpen, setIsOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title,
    description,
    category,
  });

  // Open modal and reset fields for the selected task
  const openModal = () => {
    setEditedTask({ title, description, category }); // Reset values
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL}/delete-task/${id}`
        );
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  const handleEdit = async () => {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/update-task/${_id}`,
      editedTask
    );
    if (data.modifiedCount > 0) {
      Swal.fire({
        title: "Updated!",
        text: "Your task has been updated.",
        icon: "success",
      });
      refetch();
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Task Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <p>{category}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={openModal}>
              Edit
            </button>
            <button onClick={() => handleDelete(_id)} className="btn btn-error">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal (placed outside the card to avoid overlap issues) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              className="input input-bordered w-full mb-2"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
            <textarea
              className="textarea textarea-bordered w-full mb-2"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            ></textarea>
            <input
              type="text"
              className="input input-bordered w-full mb-2"
              value={editedTask.category}
              onChange={(e) =>
                setEditedTask({ ...editedTask, category: e.target.value })
              }
            />
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-primary" onClick={handleEdit}>
                Save Changes
              </button>
              <button className="btn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAllTaskCard;
