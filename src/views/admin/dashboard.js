import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector(state => state.auth)
  const dispatch = useDispatch();
  return (
    <>
      { user.isAuth ? null : <Link to="/login"></Link> }
      hello
    </>
  );
};

export default Dashboard;