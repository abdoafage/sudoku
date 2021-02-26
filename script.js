const levels={
    Easy:[
        [[7,8,0,4,0,0,1,2,0],
         [6,0,0,0,7,5,0,0,9],
         [0,0,0,6,0,1,0,7,8],
         [0,0,7,0,4,0,2,6,0],
         [0,0,1,0,5,0,9,3,0],
         [9,0,4,0,6,0,0,0,5],
         [0,7,0,3,0,0,0,1,2],
         [1,2,0,0,0,7,4,0,0],
         [0,4,9,2,0,6,0,0,7]],
 
         [[7,8,0,4,0,0,1,2,0],
         [6,0,0,0,7,5,0,0,9],
         [0,0,0,6,0,1,0,7,8],
         [0,0,7,0,4,0,2,6,0],
         [0,0,1,0,5,0,9,3,0],
         [9,0,4,0,6,0,0,0,5],
         [0,7,0,3,0,0,0,1,2],
         [1,2,0,0,0,7,4,0,0],
         [0,4,9,2,0,6,0,0,7]],
     ],

    Medium:[
        [[0,4,0,0,0,0,0,6,8],
         [0,0,0,0,4,0,0,0,0],
         [0,6,0,0,8,0,0,2,0],
         [0,8,4,0,1,0,6,7,0],
         [1,0,5,0,0,3,0,9,0],
         [0,0,0,0,0,0,1,5,0],
         [0,0,8,0,0,0,0,0,0],
         [0,0,0,0,2,1,3,0,0],
         [0,7,1,6,0,0,0,0,0]],

        [[0,4,0,0,0,0,0,6,8],
         [0,0,0,0,4,0,0,0,0],
         [0,6,0,0,8,0,0,2,0],
         [0,8,4,0,1,0,6,7,0],
         [1,0,5,0,0,3,0,9,0],
         [0,0,0,0,0,0,1,5,0],
         [0,0,8,0,0,0,0,0,0],
         [0,0,0,0,2,1,3,0,0],
         [0,7,1,6,0,0,0,0,0]]
    ],
    
    Hard:[
        [[7,0,0,0,0,0,0,0,6],
         [0,0,0,0,0,9,0,0,0],
         [0,6,2,0,3,4,8,7,0],
         [0,4,1,6,0,5,0,0,0],
         [0,0,8,0,0,0,1,0,0],
         [0,0,0,8,0,1,4,6,0],
         [0,1,7,9,8,0,5,3,0],
         [0,0,0,4,0,0,0,0,0],
         [8,0,0,0,0,0,0,0,2]],

        [[7,0,0,0,0,0,0,0,6],
         [0,0,0,0,0,9,0,0,0],
         [0,6,2,0,3,4,8,7,0],
         [0,4,1,6,0,5,0,0,0],
         [0,0,8,0,0,0,1,0,0],
         [0,0,0,8,0,1,4,6,0],
         [0,1,7,9,8,0,5,3,0],
         [0,0,0,4,0,0,0,0,0],
         [8,0,0,0,0,0,0,0,2]]
    ]
}
let counter=0;
let levelIndex=0;
let levelList=["Easy","Medium","Hard"];
let br=levels["Easy"][0];
let ORG_br=levels["Easy"][1];

let prevIndex=null;
let currentIndex=null;

const sodoku_APP=document.querySelector(".sodoku_APP");

function createSodokuBoard(BOARD,ORG_bro=null){
    sodoku_APP.textContent="";
    let TABLE=document.createElement("table");
    console.log(ORG_bro)
    if(ORG_bro==null){
        for(let x=0;x<9;x++){
            let TR=document.createElement("tr");
            for(let z=0;z<9;z++){
                let TD=document.createElement("td");
                if(BOARD[x][z]!=0){
                    TD.textContent=BOARD[x][z];
                    TD.classList.add("notAllow")
                }else{
                    TD.classList.add("color");
                }
                TR.appendChild(TD);
            }
            TABLE.appendChild(TR);
        }
    }else{
        for(let x=0;x<9;x++){
            let TR=document.createElement("tr");
            for(let z=0;z<9;z++){
                let TD=document.createElement("td");
                if(BOARD[x][z]==ORG_bro[x][z]){
                    TD.textContent=BOARD[x][z];
                }else{
                    TD.textContent=BOARD[x][z];
                    TD.classList.add("color");
                }
                TR.appendChild(TD);
            }
            TABLE.appendChild(TR);
        }
        TABLE.setAttribute("style","pointer-events: none;")
    }
    sodoku_APP.appendChild(TABLE);

    let divBtn=document.createElement("div");
    let solveBtn=document.createElement("button");
    let nextBtn=document.createElement("button");
    let checkBtn=document.createElement("button");

    solveBtn.textContent="SOLVE ALL";
    nextBtn.textContent="NEXT";
    checkBtn.textContent="CHECK";

    divBtn.setAttribute("class","buttons");

    solveBtn.addEventListener("click",solveAll);
    nextBtn.addEventListener("click",()=>{
        for(let x=0;x<9;x++){
            for(let z=0;z<9;z++){
                //br[x][z]=ORG_br[x][z];
                levels[levelList[levelIndex]][0][x][z]=levels[levelList[levelIndex]][1][x][z];
            }
        }
        levelIndex=(levelIndex+1)%3;
        br=levels[levelList[levelIndex]][0];
        ORG_br=levels[levelList[levelIndex]][1];
        document.querySelector(".level").textContent=levelList[levelIndex];
        createSodokuBoard(br);
        Solve(br);
    });
    checkBtn.addEventListener("click",checkFromAllBoard);

    divBtn.appendChild(solveBtn);
    divBtn.appendChild(nextBtn);
    divBtn.appendChild(checkBtn);

    sodoku_APP.appendChild(TABLE);
    sodoku_APP.appendChild(divBtn);
}


function check(BOARD,[X,Y],number){
    // check row.
    for(let i=0;i<9;i++){
        if(BOARD[X][i] == number && i != Y)return false;
    }

    // check columns.
    for(let i=0;i<9;i++){
        if(BOARD[i][Y] == number && i != X)return false;
    }

    // check BOX.
    const ROW=Math.floor(X/3);
    const COL=Math.floor(Y/3);
    for(let i = ROW*3 ; i < ROW*3 + 3 ; i++ ){
        for(let j = COL*3 ;j<COL*3+3;j++){
            if(BOARD[i][j] == number && i!=X && j!=Y )return false;
        }
    }
    return true;
}
function Solve(BOARD){
    let find=get_empty(BOARD);
    console.log(find);
    let X,Y;
    if( find == null )return true;
    else{
        [X,Y]=find;
    }
    for(let number=1;number<=9;number++){
        if(check(BOARD,[X,Y],number)){
            BOARD[X][Y]=number;
            if(Solve(BOARD)){

                return true;
            }
            BOARD[X][Y]=0;
        }
        counter++;
    }
    
    return false;
}

function get_empty(BOARD){
    for(let x=0;x<9;x++){
        for(let z=0;z<9;z++){
            if(BOARD[x][z]=="")return [x,z];
        }
    }
    return null;
}

console.log("start");

createSodokuBoard(br);

function solveAll(){
    createSodokuBoard(br,ORG_br);
    console.log(counter);
}

Solve(br);
console.log(br);
console.log(ORG_br);
document.addEventListener("click",(event)=>{
    try{
        console.log(event.path.find(e=>e.tagName=="TD").dataset.index)
        let INDEX=event.path.find(e=>e.tagName=="TD");
        console.log(INDEX);
        currentIndex=INDEX;
        if(prevIndex!=null){
            if(prevIndex.classList.contains("select")){
                prevIndex.classList.remove("select");
            }
        }
        if(INDEX.classList.contains("select")){
            INDEX.classList.remove("select");
        }else{
            INDEX.classList.add("select");
            prevIndex=INDEX;
        }
        
    }catch(err){
        if(prevIndex!=null){
            prevIndex.classList.remove("select");
        }
        prevIndex=null;
        currentIndex=null;
    }
})


document.addEventListener("keypress",(event)=>{
    if(currentIndex != null){
        console.log(event)
        // console.log(this);
        console.log(event.key);
        console.log(currentIndex);
        currentIndex.textContent=event.key;
    }
})



function checkFromAllBoard(){
    let rowsOfTable=document.querySelectorAll("table tr");

    console.log(rowsOfTable);
    for(let x=0;x<9;x++){
        let ROW=rowsOfTable[x].children;
        for(let z=0;z<9;z++){
            if(parseInt(ROW[z].textContent) != br[x][z]){
                ROW[z].classList.add("incorrect");
                ROW[z].classList.remove("color");
            }
            console.log(ROW[z],parseInt(ROW[z].textContent),  br[x][z]);
        }
    }
    setTimeout(() => {
        for(let x=0;x<9;x++){
            let ROW=rowsOfTable[x].children;
            for(let z=0;z<9;z++){
                console.log(ROW[z]);
                if(ROW[z].classList.contains("incorrect")){
                    ROW[z].classList.remove("incorrect");
                    ROW[z].classList.add("color");
                }
            }
        }
    }, 1500);

}