import React, {useState} from 'react'
import Content from './contents/Content'


let IsCategory; Boolean;
const Karriere = () => {
    return (
        <>
          <div id="karriere_header">
            <div className="button active_button" onClick={() => {IsCategory = true}}>
                <h3>Kategorien</h3>
            </div>
            <div className="button" onClick={() => {IsCategory = false}}>
                <h3>Karriere</h3>
            </div>
          </div>

          <div id="searchbar">
            ich bin die searchbar
          </div>

          <div id="karriere_main_content">
              <Content />
          </div>
        </>
    )
}
export {IsCategory}
export default Karriere
