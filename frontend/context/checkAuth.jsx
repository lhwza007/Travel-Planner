import axios from 'axios';

export async function checkAuth() {
  console.log("8;p");
  try {
    const response = await axios.get('http://localhost:8800/api/auth/checkAuth', {
      withCredentials: true
    });

    return response.data.isAuthenticated ===true; // Assuming the response contains an 'id' field if authenticated
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
}