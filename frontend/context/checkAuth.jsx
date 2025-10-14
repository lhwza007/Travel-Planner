import axios from "axios";

export async function checkAuth() {
  if (localStorage.getItem("user")) {
    return true;

  } else {
    try {
      const response = await axios.get(
        "http://localhost:8800/api/auth/checkAuth",
        {
          withCredentials: true,
        }
      );
      return response.data.isAuthenticated === true; // Assuming the response contains an 'id' field if authenticated

    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
      
    }
  }
}
