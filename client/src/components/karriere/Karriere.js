import React from "react"
import Content from './contents/Content'
import {useState} from 'react'


const Karriere = () => {
//changing active Tab 
 const [activeTab, setActiveTab] = useState(1);
  const handleTab = (tab) => {
    setActiveTab(tab);
  };

    return (
        <>
          <div id="karriere_header">
            <div className={activeTab === 1 ? "button active-button" : "button"}
                 onClick={() => handleTab(1)}>
                <h3>Kategorien</h3>
            </div>
            <div className={activeTab === 2 ? "button active-button" : "button"}
                 onClick={() => handleTab(2)}>
                <h3>Karriere</h3>
            </div>
          </div>

          <div id="searchbar">
            ich bin die searchbar
          </div>

          <div id="karriere_main_content">
              <Content
                activeTab={activeTab}
              />
          </div>
        </>
    )
}
export default Karriere
