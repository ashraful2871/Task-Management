import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const ViewAllTaskCard = ({ task, refetch }) => {
  const { _id, title, description, category } = task;
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
        console.log(id);
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL}/delete-task/${id}`
        );
        console.log(data);
        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <p>{category}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Edit</button>
        </div>
        <div className="card-actions justify-end">
          <button onClick={() => handleDelete(_id)} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllTaskCard;
