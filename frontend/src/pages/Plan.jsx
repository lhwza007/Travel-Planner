import Recommend from "../components/Recommend.jsx";
import ParkList from "../components/Park-lists.jsx";

export default function Plan() {
  return (
    <>
      <Recommend />
      <hr style={{ marginBottom: "30px" }} />
      <ParkList />
    </>
  );
}