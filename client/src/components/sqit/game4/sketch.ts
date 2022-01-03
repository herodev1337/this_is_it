import $ from 'jquery';
import p5 from 'p5';
// import { EditorSingleton } from '../editor.js';
import * as helpers from '../helpers';

import {P5Extend4} from "../types"


/**
 * First we define all variables, which will be used in this function.
 * We also import p5 classes which just wrap simple shapes which are going to be drawn when executed.
 * 
 * Important Variables:
 * 
 * p.hardMode:boolean
 * 
 * This variable controls the Mode, which could be equals to "unbeatable", "easy" or "normal
 * p.playerWin:boolean
 * 
 * This variable controls the state of playerWin is true or not, 
 * if true, the Player has won,
 * if not, the Player has not won.
 * p.win:boolean
 * 
 * This variable controls the state of win is true or not, 
 * if true, the KI has won,
 * if not, the KI has not won,
 * if win = 2, the game ends with a tie.
 * p.yourTurn:boolean
 * 
 * This variable controls the state of yourTurn is true or not, 
 * if true, Player's turn,
 * if not, KI's turn.
 * 
 * @param {object} p P5 instance
 */
let sketch_builder = (p:P5Extend4) => {
  let getAngle:boolean[]|number[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  p.fields__ = [];
  p.yourTurn = false;
  let start = true;
  let created = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var createdCheck = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  p.win = false;
  var getAnim:number[][];
  let animCreated = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  let animFinished = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  let crosses:number[][][] = [];
  let allAnims:number[][][] = [];
  let circleAnimFinished = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  let updateEditor = false;
  p.hardMode = true;
  let pp = false;
  let pp2 = false;
  let pp3 = false;
  let pp4 = false;
  p.playerWin = false;



  p.setup = () => {
    p.rectMode(p.CENTER);
    p.angleMode(p.DEGREES);
   
    p.createCanvas(helpers.realWidth(90), helpers.view_2_px(50));
    p.ellipseMode(p.CENTER);

    p.frameRate(60);
    p.background($(':root').css('--color-navy-800'));
  };

  function calculateCross() {
    let printedCircle = 0;
    if (!p.yourTurn) {
      for (let i = 0; i <= created.length; i++) {
        if (created[i] === 1) {
          createdCheck[i] = created[i];
        }
      }
    }
    for (let i = 0; i <= createdCheck.length; i++) {
      if (createdCheck[i] === 1) {
        printedCircle++;
      }
    }
    if (p.hardMode) {
      if (
        printedCircle === 1 &&
        (createdCheck[1] === 1 ||
          createdCheck[0] === 1 ||
          createdCheck[3] === 1 ||
          createdCheck[5] === 1 ||
          createdCheck[7] === 1 ||
          createdCheck[8] === 1)
      ) {
        created[4] = 2;
      } else if (printedCircle === 1) {
        created[8] = 2;
      }
      if (printedCircle === 2) {
        if (createdCheck[4] === 1 && createdCheck[7] === 1) {
          created[1] = 2;
        }
        if (createdCheck[2] === 1 && createdCheck[3] === 1) {
          created[8] = 2;
        }
        if (createdCheck[0] === 1) {
          created[4] = 2;
        }

        if (
          createdCheck[0] === 1 &&
          (createdCheck[1] === 1 ||
            createdCheck[3] === 1 ||
            createdCheck[5] === 1 ||
            createdCheck[7] === 1 ||
            createdCheck[8] === 1)
        ) {
          created[2] = 2;
          p.win = true;
          if (!updateEditor) {
            p.set_win(p.win)
          }
          updateEditor = true;
        }

        if (
          createdCheck[1] === 1 &&
          (createdCheck[0] === 1 ||
            createdCheck[3] === 1 ||
            createdCheck[5] === 1 ||
            createdCheck[7] === 1 ||
            createdCheck[8] === 1)
        ) {
          p.win = true;
          created[2] = 2;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[3] === 1 &&
          (createdCheck[1] === 1 ||
            createdCheck[0] === 1 ||
            createdCheck[5] === 1 ||
            createdCheck[7] === 1 ||
            createdCheck[8] === 1)
        ) {
          created[2] = 2;
          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[5] === 1 &&
          (createdCheck[1] === 1 ||
            createdCheck[3] === 1 ||
            createdCheck[0] === 1 ||
            createdCheck[7] === 1 ||
            createdCheck[8] === 1)
        ) {
          created[2] = 2;
          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[7] === 1 &&
          (createdCheck[1] === 1 ||
            createdCheck[3] === 1 ||
            createdCheck[5] === 1 ||
            createdCheck[0] === 1 ||
            createdCheck[8] === 1)
        ) {
          created[2] = 2;
          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[8] === 1 &&
          (createdCheck[1] === 1 ||
            createdCheck[3] === 1 ||
            createdCheck[5] === 1 ||
            createdCheck[7] === 1 ||
            createdCheck[0] === 1)
        ) {
          created[2] = 2;
          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        } else {
          if (created[4] != 2 && created[7] != 1) {
            created[7] = 2;
            p.win = true;
            if (!updateEditor) {
            }
            updateEditor = true;
          }
        }

        if (createdCheck[7] === 1 && createdCheck[8] === 1) {
          created[2] = 2;
        }

        if (createdCheck[2] === 1 && createdCheck[8] === 1) {
          created[5] = 2;
        }
        if (createdCheck[1] === 1 && createdCheck[2] === 1) {
          if (created[6] != 2 || created[8] != 2) {
            created[0] = 2;
          }
        }

        if (createdCheck[2] === 1 && createdCheck[5] === 1 && created[4] != 2) {
          created[8] = 2;
          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }

        if (
          createdCheck[2] === 1 &&
          createdCheck[5] === 1 &&
          created[4] === 2
        ) {
          created[8] = 2;
        }
        if (
          created[6] != 2 &&
          created[8] != 2 &&
          (createdCheck[5] === 1 ||
            createdCheck[7] === 1 ||
            createdCheck[8] === 1 ||
            createdCheck[3] === 1 ||
            createdCheck[0] === 1) &&
          (createdCheck[0] === 1 ||
            createdCheck[1] ||
            createdCheck[3] ||
            createdCheck[7] ||
            createdCheck[8]) &&
          createdCheck[2] != 1
        ) {
          created[2] = 2;
          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (createdCheck[0] === 1 && createdCheck[2] === 1) {
          created[1] = 2;
        }
        if (createdCheck[7] === 1 && createdCheck[2] === 1) {
          created[0] = 2;
        }
      }
      if (printedCircle === 3 && !p.win) {
        if (
          created[0] === 1 &&
          created[7] === 1 &&
          created[2] === 1 &&
          created[1] === 2 &&
          created[4] === 2 &&
          created[6] === 2 &&
          created[8] != 2
        ) {
          created[5] = 2;
        }
        if (
          createdCheck[4] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[5] === 1 
          // &&
          // !createdCheck[1] === 1 &&
          // !createdCheck[2] === 1 &&
          // !createdCheck[8] === 1
        ) {
          created[3] = 2;
        }
        if (
          createdCheck[1] === 1 &&
          createdCheck[2] === 1 &&
          createdCheck[8] === 1
        ) {
          created[3] = 2;

          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }

        if (
          createdCheck[0] === 1 &&
          createdCheck[2] === 1 &&
          (createdCheck[3] === 1 || createdCheck[8] === 1)
        ) {
          created[7] = 2;

          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[2] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[4] === 1
        ) {
          created[3] = 2;

          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[2] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[3] === 1
        ) {
          created[4] = 2;

          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[3] === 1 &&
          createdCheck[2] === 1 &&
          (createdCheck[7] === 1 ||
            createdCheck[5] === 1 ||
            createdCheck[1] === 1)
        ) {
          created[0] = 2;

          p.win = true;

          if (!updateEditor) {
          }
          updateEditor = true;
        }

        if (
          createdCheck[1] === 1 &&
          createdCheck[2] === 1 &&
          (createdCheck[7] === 1 || createdCheck[5] === 1)
        ) {
          if (
            created[3] === 2 &&
            created[4] === 2 &&
            created[6] === 2 &&
            created[8] === 2
          ) {
            created[3] = 2;
          } else {
            created[0] = 2;
          }
          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }

        if (
          createdCheck[2] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[8] === 1
        ) {
          created[3] = 2;

          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[2] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[3] === 1
        ) {
          created[8] = 2;

          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[0] === 1 &&
          createdCheck[2] === 1 &&
          createdCheck[5] === 1
        ) {
          created[7] = 2;

          p.win = true;
          if (!updateEditor) {
          }
          updateEditor = true;
        }
        if (
          createdCheck[7] === 1 &&
          createdCheck[2] === 1 &&
          (createdCheck[5] === 1 || createdCheck[1] === 1)
        ) {
          if (created[4] === 1 && created[6] === 1 && created[8] === 1) {
            created[4] = 2;
          } else if (created[0] === 2 && created[4] === 2 && created[6] === 2) {
            created[3] = 2;
          } else {
            created[0] = 2;
          }
          p.win = true;
          if (!updateEditor) {
            // enterCallback();
          }
          updateEditor = true;
        }
        if (
          createdCheck[0] === 1 &&
          createdCheck[2] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[4] === 2 &&
          createdCheck[6] === 2 &&
          createdCheck[8] === 2
        ) {
          created[5] = 2;
        }
        if (
          createdCheck[1] === 1 &&
          createdCheck[2] === 1 &&
          createdCheck[3] === 1
        ) {
          p.win = true;
          created[8] = 2;
          if (!updateEditor) {
            // enterCallback();
          }
          updateEditor = true;
        }
        if (
          createdCheck[2] === 1 &&
          createdCheck[8] === 1 &&
          createdCheck[3] === 1
        ) {
          created[1] = 2;
        }
        if (
          createdCheck[0] === 1 &&
          createdCheck[2] === 1 &&
          createdCheck[7] === 1 
          // &&
          // !createdCheck[4] === 2 &&
          // !createdCheck[6] === 2 &&
          // !createdCheck[8] === 2
        ) {
          created[3] = 2;
        }
        if (
          createdCheck[0] === 1 &&
          createdCheck[2] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[4] === 2 &&
          createdCheck[6] === 2 &&
          createdCheck[8] === 2
        ) {
          created[3] = 2;
        }

        if (
          createdCheck[4] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[3] === 1
        ) {
          created[5] = 2;
        }
        if (
          createdCheck[4] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[5] === 1
        ) {
          created[3] = 2;
        }

        if (
          createdCheck[0] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[2] === 1
        ) {
          created[1] = 2;
        }
      }
      if (printedCircle === 4 && !p.win) {
        if (
          createdCheck[4] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[3] === 1 &&
          createdCheck[2] === 1
        ) {
          created[0] = 2;
          p.win = 2;
          if (!updateEditor) {
            // enterCallback();
          }
          updateEditor = true;
        }
        if (
          createdCheck[2] === 1 &&
          createdCheck[8] === 1 &&
          createdCheck[3] === 1 &&
          createdCheck[7] === 1
        ) {
          created[0] = 2;
          p.win = 2;
          if (!updateEditor) {
            // enterCallback();
          }
          updateEditor = true;
        }

        if (
          createdCheck[4] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[0] === 1 &&
          createdCheck[5] === 1
        ) {
          created[2] = 2;
          p.win = 2;
          if (!updateEditor) {
            // enterCallback();
          }
          updateEditor = true;
        }
        if (
          createdCheck[0] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[2] === 1 &&
          createdCheck[3] === 1
        ) {
          created[5] = 2;
          p.win = 2;
          if (!updateEditor) {
            // enterCallback();
          }
          updateEditor = true;
        }
        if (
          createdCheck[0] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[2] === 1 &&
          createdCheck[5] === 1
        ) {
          created[3] = 2;
          p.win = 2;
          if (!updateEditor) {
            // enterCallback();
          }
          updateEditor = true;
        }
        if (
          createdCheck[0] === 1 &&
          createdCheck[2] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[3] === 1
        ) {
          created[8] = 2;
        }

        if (
          createdCheck[4] === 1 &&
          createdCheck[5] === 1 &&
          createdCheck[7] === 1 &&
          createdCheck[2] === 1
        ) {
          created[0] = 2;
          if (!updateEditor) {
            // enterCallback();
          }
          updateEditor = true;
        }
      }
    } else {
      
      if (
        ((created[0] === 1 && created[1] === 1 && created[2] === 1) ||
          (created[3] === 1 && created[4] === 1 && created[5] === 1) ||
          (created[6] === 1 && created[7] === 1 && created[8] === 1) ||
          (created[0] === 1 && created[3] === 1 && created[6] === 1) ||
          (created[1] === 1 && created[4] === 1 && created[7] === 1) ||
          (created[2] === 1 && created[5] === 1 && created[8] === 1) ||
          (created[0] === 1 && created[4] === 1 && created[8] === 1)) &&
        !pp4
      ) {
        p.playerWin = true;
        // console.log('player wins ');
        pp4 = true;
        // enterCallback();
      }
      if (!p.playerWin) {
        if (printedCircle === 1 && !pp) {
          let i = randomCross();
          created[i] = 2;
          pp = true;
        }
        if (printedCircle === 2 && !pp2) {
          let i = randomCross();
          created[i] = 2;
          pp2 = true;
        }
        if (printedCircle === 3 && !pp3) {
          let i = randomCross();
          created[i] = 2;
          pp3 = true;
        }
        if (printedCircle === 4 && !pp4) {
          let i = randomCross();
          created[i] = 2;
          pp4 = true;
        }
      }
    }
    return createdCheck;
  }

  function randomCross() {
    let runs = 0;
    let randint = Math.random() * 9;
    for (let i = 0; i <= created.length; i++) {
      runs++;
      if (i === randint) {
        if (created[i] === 0) {
          return i;
        } else if (created[i] === 1) {
          i = 0;
          runs = 0;
          randint = Math.random() * 9;
        } else if (created[i] === 2) {
          i = 0;
          runs = 0;
          randint = Math.random() * 9;
        }
      }
      if (runs === 9) {
        i = 0;
        runs = 0;
        randint = Math.random() * 9;
      }
    }
  }

  function newCross(position:number,) {
    let checkPosition = checkPositionCircle();

    createdCheck = calculateCross();

    // field 6
    if (position === 6 && created[6] != 1) {
      if (start || created[6] === 2) {
        let cross6 = [
          [
            p.width / 2 - 70,
            p.height / 2 + 75,
            p.width / 2 - 125,
            p.height / 2 + 130,
          ],
          [
            p.width / 2 - 125,
            p.height / 2 + 75,
            p.width / 2 - 70,
            p.height / 2 + 130,
          ],
        ];
        start = false;
        p.yourTurn = true;
        checkPosition[6] = true;
        created[6] = 2;
        return cross6;
      }
    }

    //field 3
    if (position === 3 && created[3] != 1) {
      if (
        (!p.yourTurn && !checkPosition[3] && !start) ||
        (!start && created[3] === 2)
      ) {
        let cross3 = [
          [
            p.width / 2 - 70,
            p.height / 2 - 25,
            p.width / 2 - 125,
            p.height / 2 + 30,
          ],
          [
            p.width / 2 - 125,
            p.height / 2 - 25,
            p.width / 2 - 70,
            p.height / 2 + 30,
          ],
        ];
        checkPosition[3] = true;
        p.yourTurn = true;
        return cross3;
      }
    }
    //   field4
    if (position === 4 && created[4] != 1) {
      if (
        (!p.yourTurn && !checkPosition[4] && !start) ||
        (!start && created[4] === 2)
      ) {
        let cross4 = [
          [
            p.width / 2 - 25,
            p.height / 2 - 25,
            p.width / 2 + 30,
            p.height / 2 + 30,
          ],
          [
            p.width / 2 + 30,
            p.height / 2 - 25,
            p.width / 2 - 25,
            p.height / 2 + 30,
          ],
        ];
        checkPosition[2] = true;
        p.yourTurn = true;
        return cross4;
      }
    }
    //field 5
    if (position === 5 && created[5] != 1) {
      if (
        (!p.yourTurn && !checkPosition[5] && !start) ||
        (!start && created[5] === 2)
      ) {
        let cross5 = [
          [
            p.width / 2 + 125,
            p.height / 2 - 25,
            p.width / 2 + 70,
            p.height / 2 + 30,
          ],
          [
            p.width / 2 + 75,
            p.height / 2 - 25,
            p.width / 2 + 125,
            p.height / 2 + 30,
          ],
        ];
        checkPosition[5] = true;
        p.yourTurn = true;

        return cross5;
      }
    }

    //field 8

    if (position === 8 && created[8] != 1) {
      if (
        (!p.yourTurn && !checkPosition[8] && !start) ||
        (!start && created[8] === 2)
      ) {
        let cross8 = [
          [
            p.width / 2 + 125,
            p.height / 2 + 75,
            p.width / 2 + 70,
            p.height / 2 + 130,
          ],
          [
            p.width / 2 + 75,
            p.height / 2 + 75,
            p.width / 2 + 125,
            p.height / 2 + 130,
          ],
        ];
        checkPosition[8] = true;
        p.yourTurn = true;

        return cross8;
      }
    }

    //field 7
    if (position === 7 && created[7] != 1) {
      if (
        (!p.yourTurn && !checkPosition[7] && !start) ||
        (!start && created[7] === 2)
      ) {
        let cross7 = [
          [
            p.width / 2 - 25,
            p.height / 2 + 75,
            p.width / 2 + 30,
            p.height / 2 + 130,
          ],
          [
            p.width / 2 + 30,
            p.height / 2 + 75,
            p.width / 2 - 25,
            p.height / 2 + 130,
          ],
        ];
        checkPosition[7] = true;
        p.yourTurn = true;

        return cross7;
      }
    }

    //field 0
    if (position === 0 && created[0] != 1) {
      if (
        (!p.yourTurn && !checkPosition[0] && !start) ||
        (!start && created[0] === 2)
      ) {
        let cross0 = [
          [
            p.width / 2 - 70,
            p.height / 2 - 125,
            p.width / 2 - 125,
            p.height / 2 - 70,
          ],
          [
            p.width / 2 - 125,
            p.height / 2 - 125,
            p.width / 2 - 70,
            p.height / 2 - 70,
          ],
        ];
        checkPosition[0] = true;
        p.yourTurn = true;

        return cross0;
      }
    }

    //field 1
    if (position === 1 && created[1] != 1) {
      if (
        (!p.yourTurn && !checkPosition[1] && !start) ||
        (!start && created[1] === 2)
      ) {
        let cross1 = [
          [
            p.width / 2 - 25,
            p.height / 2 - 125,
            p.width / 2 + 30,
            p.height / 2 - 70,
          ],
          [
            p.width / 2 + 30,
            p.height / 2 - 125,
            p.width / 2 - 25,
            p.height / 2 - 70,
          ],
        ];
        checkPosition[1] = true;
        p.yourTurn = true;
        return cross1;
      }
    }

    //field 2
    if (position === 2 && created[2] != 1) {
      if (
        (!p.yourTurn && !checkPosition[2] && !start) ||
        (!start && created[2] === 2)
      ) {
        let cross2 = [
          [
            p.width / 2 + 125,
            p.height / 2 - 125,
            p.width / 2 + 70,
            p.height / 2 - 70,
          ],
          [
            p.width / 2 + 75,
            p.height / 2 - 125,
            p.width / 2 + 125,
            p.height / 2 - 70,
          ],
        ];
        checkPosition[2] = true;
        p.yourTurn = true;

        return cross2;
      }
    }
  }

  function animPos(position:number) {
    let cross = newCross(position);
    // console.log(position)
    return [
      [cross[0][0], cross[0][1], cross[0][2], cross[0][3]],
      [cross[1][0], cross[1][1], cross[1][2], cross[1][3]],
    ];
  }

  function animValid() {
    let animCreated = true;

    return animCreated;
  }

  function animCreate(position:number) {
    let cross = newCross(position);
    crosses[position] = cross;
    if (!animCreated[position]) {
      getAnim = animPos(position);

      allAnims[position] = getAnim;
    }
    animCreated[position] = animValid();

    let print = [
      [
        crosses[position][0][0],
        crosses[position][0][1],
        allAnims[position][0][0],
        allAnims[position][0][1],
      ],
      [
        allAnims[position][1][2],
        allAnims[position][1][3],
        crosses[position][1][2],
        crosses[position][1][3],
      ],
    ];

    if (!animFinished[position]) {
      if (p.frameCount && position != 5 && position != 8 && position != 3) {
        if (getAnim[0][0] <= getAnim[0][2] && getAnim[0][1] <= getAnim[0][3]) {
          getAnim[0][0] += 1.5;
          getAnim[0][1] += 1.5;
        } else if (
          getAnim[1][2] <= getAnim[1][0] &&
          getAnim[1][1] <= getAnim[1][3]
        ) {
          getAnim[1][2] += 1.5;
          getAnim[1][3] -= 1.5;
        } else {
          animFinished[position] = true;
        }

      }
      if(p.frameCount && position === 5 || position === 8 || position === 3){
      if (getAnim[0][0] <= getAnim[0][2] && getAnim[0][1] <= getAnim[0][3]) {
        getAnim[0][0] += 1.5;
        getAnim[0][1] += 1.5;
      } else if (
        getAnim[1][2] <= getAnim[1][0] &&
        getAnim[1][1] <= getAnim[1][3]
      ) {
        getAnim[1][2] += 1.5;
        getAnim[1][3] -= 1.5;
      } else {
        animFinished[position] = true;
      }
    }
      return print;
    }
  }
  let angle = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let point = 9000;

  p.draw = () => {
    // console.log("-----------------------",p.fields_)
    // background($(':root').css('--color-navy-800'));
    p.fill(255);
    p.rect(p.width / 2 - 50, p.height / 2, 5, 250);
    p.rect(p.width / 2 + 50, p.height / 2, 5, 250);
    p.stroke(255);

    p.rect(p.width / 2, p.height / 2 + 50, 250, 5);
    p.rect(p.width / 2, p.height / 2 - 50, 250, 5);

    p.noFill();

    const draw_cross = (i:number) => {
      // console.log(i)

      if (animFinished[i]) {
        let cross = newCross(i);
        p.line(cross[0][0], cross[0][1], cross[0][2], cross[0][3]);
        p.line(cross[1][0], cross[1][1], cross[1][2], cross[1][3]);
      } else {
        let x = animCreate(i);
        p.line(x[0][0], x[0][1], x[0][2], x[0][3]);
        p.line(x[1][0], x[1][1], x[1][2], x[1][3]);
      }
    };

    // draw_cross(6)
    // created.forEach((isCreated, i) => {
    //   if (i === 6) return;
    //   if (!p.yourTurn || isCreated === 2) draw_cross(i)
    // })

    if (!p.yourTurn || created[6] === 2) {
      draw_cross(6);
    }

    if (!p.yourTurn || created[4] === 2) {
      draw_cross(4);
    }
    if (!p.yourTurn || created[8] === 2) {
      draw_cross(8);
    }
    if (!p.yourTurn || created[1] === 2) {
      draw_cross(1);
    }
    if (!p.yourTurn || created[2] === 2) {
      draw_cross(2);
    }

    if (!p.yourTurn || created[0] === 2) {
      draw_cross(0);
    }

    if (!p.yourTurn || created[3] === 2) {
      draw_cross(3);
    }

    if (!p.yourTurn || created[5] === 2) {
      draw_cross(5);
    }

    if (!p.yourTurn || created[7] === 2) {
      draw_cross(7);
    }

    const draw_circle = ([first, second]:[number,number], circleAnimFinished:boolean[], position:number) => {
      if (!getAngle[position]) {
        getAngle[position] = angle[position];
      }
      // console.log(getAngle[position], angle[position]);

      if (angle[position] - parseInt(`${getAngle[position]}`) < 360) {
        angle[position] += 3;

        p.push();
        p.translate(p.width / 2 + first, p.height / 2 + second);
        p.rotate(angle[position]);
        p.circle(0, 25, 1);
        p.pop();
      } else {
        circleAnimFinished[position] = true;
        // angle[position] =0
      }

      let circles = newCircle(position);
      if (!circleAnimFinished[position]) {
        if (!getAngle[position]) {
          getAngle[position] = angle[position];
        }
        // console.log(getAngle[position], angle[position]);

        if (angle[position] - parseInt(`${getAngle[position]}`) < 360) {
          angle[position] += 3;

          p.push();
          p.translate(p.width / 2 + first, p.height / 2 + second);
          p.rotate(angle[position]);
          p.circle(0, 25, 1);
          p.pop();
        } else {
          circleAnimFinished[position] = true;
          // angle[position] =0
        }
      } else {
        // console.log(circles);
        // p.circle(circles[0][0], circles[0][1], circles[1][0], circles[1][1]);
        p.circle(circles[0], circles[1], circles[2]);
      }
    };

    const circleAdders = [
      [-100, -100],
      [0, -100],
      [100, -100],
      [-100, 0],
      [0, 0],
      [100, 0],
      [-100, 100],
      [0, 100],
      [100, 100],
    ];

    const createdCheck = [
      [0, 2],
      [1, 2],
      [1, 2],
      [1, 2],
      [1, 2],
      [1, 2],
      [1, 2],
      [1, 2],
      [1, 2],
    ];

    // if (!p.fields__) return

    // p.fields__.forEach((field, i) => {
    //   // if ([6, 8].includes(i)) {
    //   //   if (!(((p.fields__[i] && p.yourTurn) || created[i] ===  createdCheck[i][0]) && created[i] !=  createdCheck[i][1])) return;
    //   // } else
    //   if (
    //     !(
    //       (field || created[i] === createdCheck[i][0]) &&
    //       created[i] != createdCheck[i][1]
    //     )
    //   )
    //     {
    //     //   console.log("statement", (field || created[i] === createdCheck[i][0]) &&
    //     //   created[i] != createdCheck[i][1]
    //     // )
    //       return
    //     };

    //   // console.log("Goin through")
    //   let circles = newCircle(i);
    //   if (!circleAnimFinished[i])
    //     draw_circle(circleAdders[i], circleAnimFinished, i);
    //   else {
    //     p.circle(circles[0], circles[1], circles[2]);
    //   }
    // });

    // console.log(p.fields__)

    if (
      ((p.fields__[6] && p.yourTurn) || created[6] === 1) &&
      created[6] != 2
    ) {
      let circles = newCircle(6);
      draw_circle([-100, 100], circleAnimFinished, 6);
    }
    if (
      ((p.fields__[8] && p.yourTurn) || created[8] === 1) &&
      created[8] != 2
    ) {
      let circles = newCircle(8);
      draw_circle([100, 100], circleAnimFinished, 8);
    }

    if ((p.fields__[7] || created[7] === 1) && created[7] != 2) {
      let circles = newCircle(7);
      draw_circle([0, 100], circleAnimFinished, 7);
    }
    if ((p.fields__[5] || created[5] === 1) && created[5] != 2) {
      let circles = newCircle(5);
      draw_circle([+100, 0], circleAnimFinished, 5);
    }

    if ((p.fields__[0] || created[0] === 1) && created[0] != 2) {
      let circles = newCircle(0);
      if (!circleAnimFinished[0])
        draw_circle([-100, -100], circleAnimFinished, 0);
      else {
        // console.log(circles);
        // p.circle(circles[0][0], circles[0][1], circles[1][0], circles[1][1]);
        p.circle(circles[0], circles[1], circles[2]);
      }
    }

    if ((p.fields__[1] || created[1] === 1) && created[1] != 2) {
      let circles = newCircle(1);
      draw_circle([0, -100], circleAnimFinished, 1);
    }

    if ((p.fields__[2] || created[2] === 1) && created[2] != 2) {
      let circles = newCircle(2);
      draw_circle([100, -100], circleAnimFinished, 2);
    }

    if ((p.fields__[3] || created[3] === 1) && created[3] != 2) {
      let circles = newCircle(3);
      draw_circle([-100, 0], circleAnimFinished, 3);
    }

    if ((p.fields__[4] || created[4] === 1) && created[4] != 2) {
      let circles = newCircle(4);
      draw_circle([0, 0], circleAnimFinished, 4);
    }
  };

  function newCircle(position:number) {
    let checkPosition = checkPositionCircle();
    if (position === 0 && !checkPosition[0]) {
      let circle0 = [p.width / 2 - 100, p.height / 2 - 100, 50];
      checkPosition[0] = true;
      created[0] = 1;
      p.yourTurn = false;
      return circle0;
    }
    if (position === 1 && !checkPosition[1]) {
      let circle1 = [p.width / 2, p.height / 2 - 100, 50];
      checkPosition[1] = true;
      p.yourTurn = false;
      created[1] = 1;
      return circle1;
    }
    if (position === 2 && !checkPosition[2]) {
      let circle2 = [p.width / 2 + 100, p.height / 2 - 100, 50];
      checkPosition[2] = true;
      created[2] = 1;
      p.yourTurn = false;
      return circle2;
    }
    if (position === 3 && !checkPosition[3]) {
      let circle3 = [p.width / 2 - 100, p.height / 2, 50];
      checkPosition[3] = true;
      p.yourTurn = false;
      created[3] = 1;
      return circle3;
    }
    if (position === 4 && !checkPosition[4]) {
      let circle4 = [p.width / 2, p.height / 2, 50];
      checkPosition[4] = true;
      created[4] = 1;
      p.yourTurn = false;
      return circle4;
    }
    if (position === 5 && !checkPosition[5]) {
      let circle5 = [p.width / 2 + 100, p.height / 2, 50];
      checkPosition[5] = true;
      p.yourTurn = false;
      created[5] = 1;
      return circle5;
    }
    if (position === 6 && !checkPosition[6]) {
      let circle6 = [p.width / 2 - 100, p.height / 2 + 100, 50];
      checkPosition[6] = true;
      p.yourTurn = false;
      created[6] = 1;
      return circle6;
    }
    if (position === 7 && !checkPosition[7]) {
      let circle7 = [p.width / 2, p.height / 2 + 100, 50];
      checkPosition[7] = true;
      p.yourTurn = false;
      created[7] = 1;
      return circle7;
    }
    if (position === 8 && !checkPosition[8]) {
      let circle8 = [p.width / 2 + 100, p.height / 2 + 100, 50];
      checkPosition[8] = true;
      created[8] = 1;
      p.yourTurn = false;
      return circle8;
    }
  }

  function checkPositionCircle() {
    var checkPosition = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    return checkPosition;
  }

  // window.setup = p.setup;
  // window.draw = p.draw;
  // window.windowResized = p.windowResized;
  p.customResize = () => {
    p.setup();
  };
};

export { sketch_builder };
