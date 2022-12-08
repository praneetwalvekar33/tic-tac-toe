const blocks = document.querySelectorAll(".click");

let turns = 0;
blocks.forEach(element => {
    element.addEventListener("click",()=>{
        
        
        if(turns%2==0 && turns<9){
            element.innerHTML = "x";
        }else if(turns<9){
            element.innerHTML = "o";
        }
        fontStyle(element);
        turns++;
        console.log(turns);
    })
});

function fontStyle(element){
    element.style.justifyContent = "center";
    element.style.fontSize = "25vw";
    element.style.lineHeight = "10vw";
}