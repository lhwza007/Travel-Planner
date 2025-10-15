import Recommend from "../components/Recommend.jsx";
import ParkList from "../components/Park-lists.jsx";
import { useState } from "react";
import { checkAuth } from "../../context/checkAuth";

export default function Plan() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  async function verify() {
    const result = await checkAuth();
    setIsAuthenticated(result);
  }
  verify();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {
      user &&
        <Recommend /> 
      }
      <hr style={{ marginBottom: "30px" }} />
        <ParkList />
      
    </>
  );
}