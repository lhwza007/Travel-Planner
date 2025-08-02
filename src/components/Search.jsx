import Form from "react-bootstrap/Form";
import search from "../assets/search.svg";
import filter from "../assets/filter.svg";

export default function Rearch() {
    return(
        <div className="container mt-4 searchBarContainer">
        <div className="searchGroup">
          SEARCH
          <Form style={{ width: "100%", display: "flex" }}>
            <Form.Group className="w-100" style={{ margin: "0px 10px" }}>
              <Form.Control type="text" placeholder="Search Here..." style={{borderRadius: "10px" }} />
            </Form.Group>
            <input
              type="image"
              src={search}
              alt="Submit"
              style={{ width: "40px" }}
            />
          </Form>
          <img src={filter} alt="filter" style={{ width: "40px" }} />
        </div>
      </div>
    )
}