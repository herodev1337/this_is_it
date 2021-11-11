import React from 'react';
import {useParams} from "react-router-dom"

import "styles/css/colors.css"
import "styles/scss/sqit_games.scss"
import sqit_bg from "static/images/sqit/lowPolyBG.svg"

import Editor from "components/sqit/Editor"
import Sketch1 from "components/sqit/game2/Sketch1"

const Sqit = () => {
  // css overides body properties for every page so this is a workaround
  document.body.style.backgroundImage = `url(${sqit_bg})`;
  document.body.style.textAlign=  "center";
  document.body.style.marginBottom = "10vh";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundAttachment = "fixed";
  document.body.style.padding = "0 0 5% 0";
  document.body.style.margin = 0;

  console.log("Params: ", useParams())

  return (
    <div className="contentHolder">
      <div className="spacer"></div>

      <div className="contentHolders">
        <Sketch1/>
      </div>

      <div className="spacer"></div>

      <div className="timerHolder">
        <div className="timer">Time left: 60</div>
        <div className="gameTimer">
          <div className="value"></div>
        </div>
      </div>

    </div>
  )
}

export default Sqit

  