let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn0 = true;
  enableBtn();
  msgContainer.classList.add("hide");
  // Reset the text content of the boxes
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
    box.style.color = "";
  });
};

const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false; // Set disabled to false, not box.enable
  }
};

const disableBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "X";
      box.style.backgroundColor="violet";
      box.style.color="blue"
      turn0 = false;
    } else {
      box.innerText = "0";
      box.style.backgroundColor="yellow";
      box.style.color="green"
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const showWinner = (winner) => {
  if(winner){
      msg.innerText = `Congratulations, Winner is ${winner}`;
      msg.style.backgroundColor = "green";
    }
  else{
    msg.innerText = "Game was draw, Play again!";
    msg.style.backgroundColor = "red";
    }
  msg.style.borderRadius = "1.5rem";
  msgContainer.classList.remove("hide");
  disableBtn();
};

const gameDraw = ()=>{
  for(let box of boxes){
    if(box.innerText ===""){
       return false;  // There are still empty boxes, not a draw
    }
  }
  return true; // All boxes are filled, it's a draw
};



let checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
      }
    }
  }
  if(gameDraw()){
    showWinner("");
  }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
