import Form from "react-bootstrap/Form";
import filter from "../assets/filter.svg";
import search from "../assets/search.svg";
import './Search.css'
import { useState } from "react";

export default function Search({ onSearchChange }) {
    const [inputValue, setInputValue] = useState(""); //สำหรับinput

    // เมื่อผู้ใช้พิมพ์
    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);
      onSearchChange(value); // ← ส่งไป Home.jsx ทันที
    };


    return(
        <div className="container my-4 searchBarContainer">
        <div className="searchGroup">
          SEARCH
          <Form style={{ width: "100%", display: "flex" }}>
          <Form.Group className="w-100" style={{ margin: "0px 10px" }}>
            <Form.Control 
              type="text" 
              placeholder="Search Here..." 
              value={inputValue} // ← ควบคุมค่า
              onChange={handleInputChange} // ← เรียกเมื่อพิมพ์
              style={{borderRadius: "10px" }} 
              
            />
          </Form.Group>
          {/* <img src={search} alt="search" style={{ width: "40px" }} /> */}
        </Form>
          
        </div>
      </div>
    )
}