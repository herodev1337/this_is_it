import Category from "./Category";
import Career from "./Career";
import React from "react";
import { IsCategory } from "../Karriere"

function activeClass (e) {
  
}


const Content = () => {
    if (IsCategory === true) {
        return <Category />
    }
  return <Career />  
}
export default Content
