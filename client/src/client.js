// import "./sqit/game1/sketch1"

const path = window.location.pathname;

switch (path) {
  case '/sqit/game1':
    console.log('Imported game1/sketch1');
    // import './sqit/game1/sketch1';
    require('./sqit/game1/sketch1');
    break;

  case '/sqit/game2':
    console.log('Imported game2/sketch2');
    break;

  case '/sqit/game4':
    console.log('Imported game4/sketch2');
    require('./sqit/game4/sketch2');
    break;

  case '/sqit/game4hard':
    console.log('Imported game4hard/sketch3');
    require('./sqit/game4-hard/sketch3');
    break;
}

console.log('Aus der client.js');
