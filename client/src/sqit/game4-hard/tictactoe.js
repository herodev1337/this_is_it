const fields = [false,false,false,false,false,false,false,false,false];

function simpleTicTacToe(){
    let checkPosition = checkPostionCircle()
    //checking cycle Position
    //horizontal
    if(checkPosition[0] && checkPosition[1]){

    }
    if(checkPosition[3] && checkPosition[4]){

    }
    if(checkPosition[6] && checkPosition[7]){

    }
    if(checkPosition[1] && checkPosition[2]){

    }
    if(checkPosition[4] && checkPosition[5]){

    }
    if(checkPosition[7] && checkPosition[8]){

    }
    if(checkPosition[0] && checkPosition[2]){

    }
    if(checkPosition[3] && checkPosition[5]){

    }
    if(checkPosition[6] && checkPosition[8]){

    }

    //vertical
    if(checkPosition[0] && checkPosition[3]){

    }
    if(checkPosition[1] && checkPosition[4]){

    }
    if(checkPosition[2] && checkPosition[5]){

    }
    if(checkPosition[6] && checkPosition[3]){

    }
    if(checkPosition[7] && checkPosition[4]){

    }
    if(checkPosition[8] && checkPosition[5]){

    }
    if(checkPosition[0] && checkPosition[6]){

    }
    if(checkPosition[1] && checkPosition[7]){

    }
    if(checkPosition[2] && checkPosition[8]){

    }

    // diagonal

    if(checkPosition[0] && checkPosition[4]){

    }
    if(checkPosition[8] && checkPosition[4]){

    }
    if(checkPosition[0] && checkPosition[8]){

    }
}

export { fields };