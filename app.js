const blocks = document.querySelectorAll(".click");

const resultMessage = document.querySelector(".result-message");
const newGameButton = document.querySelector(".btn-new-game");
hideNewGameButton();
let turns = 0;
let winner = false;

blocks.forEach(element => {
    
    element.addEventListener("click",()=>{
        if(element.innerHTML.trim()!="" || winner){
            return;
        }
        if(turns%2==0 && turns<9){
            element.innerHTML = "x";
            fontStyle(element,"#D0A5C0");
        }else if(turns<9){
            element.innerHTML = "o";
            fontStyle(element, "#8E7C93");
        }
        
        if(turns>=4){
            const coordinate = findCoordinatesOfBlock(element);
            checkForWinner(coordinate[0], coordinate[1], turns%2==0?1:2);
        }
        turns++;

        if(turns==9){
            showResultMessage();
            resultMessage.innerHTML = "It's a draw!";
            showNewGameButton();
        }
    });
});

newGameButton.addEventListener("click",()=>{
    hideResultMessage();
    hideNewGameButton();
    blocks.forEach(block =>{
        block.innerHTML = "";
    });
    turns = 0;
    winner = false;
});

function hideNewGameButton(){
    newGameButton.style.display= "none";
}

function hideResultMessage(){
    resultMessage.style.display = "none";
}

function showNewGameButton(){
    newGameButton.style.display= "block";
}

function showResultMessage(){
    resultMessage.style.display = "block";
}

function checkMatrix(matrix){
    console.log("Matrix start: ");
    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            console.log("i"+i+"j"+j+": "+matrix[i][j]);
        }
    }

}


function fontStyle(element, color){
    element.style.justifyContent = "center";
    element.style.fontSize = "14vw";
    element.style.lineHeight = "10vw";
    element.style.color = color;
}


function findCoordinatesOfBlock(element){

    let x = 0;
    let y = 0;

    if(element.classList.contains('00')){
        x = 0;
        y = 0;
    }else if(element.classList.contains('01')){
        x = 0;
        y = 1;
    }else if(element.classList.contains('02')){
        x = 0;
        y = 2;
    }else if(element.classList.contains('10')){
        x = 1;
        y = 0;
    }else if(element.classList.contains('11')){
        x = 1;
        y = 1;
    }else if(element.classList.contains('12')){
        x = 1;
        y = 2;
    }else if(element.classList.contains('20')){
        x = 2;
        y = 0;
    }else if(element.classList.contains('21')){
        x = 2;
        y = 1;
    }else{
        x = 2;
        y = 2;
    }

    return [x,y];
}


function checkForWinner(x, y, playerNotation){
    let i = 0;
    const blocksMatrix = new Array(3);

    for(let j=0; j<blocksMatrix.length; j++){
        blocksMatrix[j] = [];
    }

    
    for(let j=0; j<3; j++){        
        for(let k=0; k<3; k++){
            if(blocks[i].innerHTML.trim() == ""){
                blocksMatrix[j][k] = 0;
            }else if(blocks[i].innerHTML == "x"){
                blocksMatrix[j][k] = 1;
            }else{
                blocksMatrix[j][k] = 2;
            }
            i++;
        }
    }

    checkMatrix(blocksMatrix); 
    let isWinner = checkHorizontal(blocksMatrix, x, y, playerNotation);
    const player = playerNotation==1?"Player 1":"Player 2";

    if(isWinner){
        winner = true;
        showResultMessage();
        resultMessage.innerHTML = "Winner of the match is "+player;
        resultMessage.style.background = playerNotation==1?"#D0A5C0":"#8E7C93";
        showNewGameButton();
        return;
    }

    isWinner = checkVirtical(blocksMatrix, x, y, playerNotation);

    if(isWinner){
        winner = true;
        showResultMessage();
        resultMessage.innerHTML = "Winner of the match is "+player;
        resultMessage.style.background = playerNotation==1?"#D0A5C0":"#8E7C93";
        showNewGameButton();
        return;
    }

    isWinner = checkDiagonal(blocksMatrix, x, y, playerNotation);

    if(isWinner){
        winner = true;
        showResultMessage();
        resultMessage.innerHTML = "Winner of the match is "+player;
        resultMessage.style.background = playerNotation==1?"#D0A5C0":"#8E7C93";
        showNewGameButton()
        return;
    }
}

function checkHorizontal(matrix, x, y, playerNotation){
    
    let i = x;
    let j = y;

    let count = 0;

    j++;
    while(j<3 && matrix[i][j] == playerNotation){
        count++;
        j++;
    }
    
    if(count==2){
        return true;
    }

    j = y;
    j--;
    while(j>=0 && matrix[i][j] == playerNotation){
        count++;
        j--;
    }

    return count==2?true:false;
}

function checkVirtical(matrix, x, y, playerNotation){
    
    let i = x;
    let j = y;
    
    let count = 0;
    i++;
    while(i<3 && matrix[i][j] == playerNotation){
        count++;
        i++;
    }
    
    if(count == 2){
        return true;
    }

    i = x;
    i--;
    while(i>=0 && matrix[i][j] == playerNotation){
        count++;
        i--;
    }
    
    return count==2?true:false;
}

function checkDiagonal(matrix, x, y, playerNotation){
    if(x+y==0 || x+y==3){
        return false;
    }

    let i = x;
    let j = y;

    let count = 0;
    i++;
    j++;
    while((i<3&&j<3) && matrix[i][j]==playerNotation){
        i++;
        j++;
        count++;
    }

    if(count==2){
        return true;
    }
    i = x;
    j = y;

    i--;
    j--;
    while((i>=0&&j>=0) && matrix[i][j]==playerNotation){
        i--;
        j--;
        count++;
    }

    if(count==2){
        return true;
    }
    
    
    count = 0;
    i = x;
    j = y;
    i++;
    j--;
    while((i<3&&j>=0) && matrix[i][j]==playerNotation){
        i++;
        j--;
        count++;
    }

    if(count==2){
        return true;
    }

    i = x;
    j = y;
    i--;
    j++;
    while((i>=0&&j<3) && matrix[i][j]==playerNotation){
        i--;
        j++;
        count++;
    }

    return count==2?true:false;
}