import React from "react";
import LoginPage from "../components/LoginPage";
import useAuth from "../hooks/useAuth";
import ViewAllTask from "../components/ViewAllTask";

const Home = () => {
  const { user } = useAuth();
  return (
    <div>
      <ViewAllTask></ViewAllTask>
    </div>
  );
};

export default Home;
