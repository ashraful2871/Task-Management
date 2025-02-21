import React from "react";
import ViewAllTaskCard from "./ViewAllTaskCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
import useAuth from "../hooks/useAuth";
const ViewAllTask = () => {
  const { user } = useAuth();
  const { data: allTask, isLoading } = useQuery({
    queryKey: ["all-task", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/all-task/${user?.email}`
      );
      return data;
    },
  });
  console.log(allTask);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2>view all task </h2>
      <div className="grid grid-cols-3 gap-5">
        {" "}
        {allTask.map((task) => (
          <ViewAllTaskCard key={task._id} task={task}></ViewAllTaskCard>
        ))}
      </div>
    </div>
  );
};

export default ViewAllTask;
