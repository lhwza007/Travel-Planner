import PlanDetail from "../components/PlanDetail"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import MyNav from "../components/Nav.jsx";
export default function SharePlan(){
    const location = useLocation();
    const plan_id = location.state?.plan_id || null;
    // console.log("plan_id in SharePlan:", plan_id);
    return(
        <>
        <MyNav />
        <PlanDetail plan_id={plan_id}/>
        
        </>
    )
}