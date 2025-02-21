import axios from "axios";
import { format } from "date-fns";
import React, { useState } from "react";
import Swal from "sweetalert2";

const ViewAllTaskCard = ({ task, refetch }) => {
  const [selectCategory, setSelectCategory] = useState("");
  const { _id, title, description, category, date } = task;
  const [isOpen, setIsOpen] = useState(false);

  // Open modal and reset fields for the selected task
  const openModal = () => {
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
          `${import.meta.env.VITE_API_URL}/task/${id}`
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

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const editedTask = { title, description, selectCategory };
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/task/${_id}`,
      editedTask
    );
    console.log(data);
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
          <p>{format(new Date(date), "dd MMM yyyy")}</p>
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

            {/* Form Starts Here */}
            <form onSubmit={handleEdit}>
              {/* Title Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered w-full mb-2"
                  value={title}
                  required
                />
              </div>

              {/* Description Textarea */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full mb-2"
                  value={description}
                  required
                ></textarea>
              </div>

              {/* Category Dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  className="select select-bordered w-full mb-2"
                  value={category}
                  onChange={(e) => setSelectCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
            {/* Form Ends Here */}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewAllTaskCard;
