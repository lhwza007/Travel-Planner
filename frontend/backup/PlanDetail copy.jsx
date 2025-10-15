import { useState,useEffect } from "react";
import axios from "axios";

export default function PlanDetail({plan_id}){

    const [planData,setPlanData]=useState([]);
    
    const fetchData=async()=>{
        try{
            const response = await axios.get("http://localhost:8800/api/getData/planDetail",{params:{plan_id:plan_id}});
            setPlanData(response.data);
        }catch(error){
            console.log("Error fetching plan details:", error);
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
    console.log("ข้อมูล",planData);
    
    return(
        <>
        {planData.map((plan)=>(
            <div key={plan.park_id}>
                <h2>{plan.park_name}</h2>
                <p>{plan.plan_name}</p>
                
                
            </div>
        ))}

        
        
        </>
    )
}