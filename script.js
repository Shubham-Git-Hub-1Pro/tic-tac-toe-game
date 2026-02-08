let turn = "x";
let gameOver = false;

let xScore = 0;
let oScore = 0;
let drawScore = 0;


const changeTurn = () => {
  return turn === "x" ? "o" : "x";
};


const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let win = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];

  win.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      gameOver = true;

      let winner = boxtext[e[0]].innerText;
      document.getElementById("info").innerText = winner + " won";

      
      if (winner === "x") {
        xScore++;
        document.getElementById("xScore").innerText = xScore;
      } else {
        oScore++;
        document.getElementById("oScore").innerText = oScore;
      }

      
      document.querySelector(".imgbox img").classList.add("imgwidth");

      
      let line = document.querySelector(".line");
      line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      line.classList.add("linewidth");
    }
  });
};


const checkDraw = () => {
  let boxtext = document.querySelectorAll(".boxtext");
  let filled = Array.from(boxtext).every((e) => e.innerText !== "");

  if (filled && !gameOver) {
    gameOver = true;
    drawScore++;
    document.getElementById("drawScore").innerText = drawScore;
    document.getElementById("info").innerText = "Match Draw";
  }
};


let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");

  element.addEventListener("click", () => {
    if (boxtext.innerText === "" && !gameOver) {
      boxtext.innerText = turn;
      boxtext.classList.add(turn);

      turn = changeTurn();
      checkWin();
      checkDraw();

      if (!gameOver) {
        document.getElementById("info").innerText = "Turn for " + turn;
      }
    }
  });
});


reset.addEventListener("click", () => {
  let boxtext = document.querySelectorAll(".boxtext");
  boxtext.forEach((e) => {
    e.innerText = "";
    e.classList.remove("x", "o");
  });

  turn = "x";
  gameOver = false;

  document.getElementById("info").innerText = "Turn for x";

  document.querySelector(".imgbox img").classList.remove("imgwidth");
  document.querySelector(".line").classList.remove("linewidth");
});
