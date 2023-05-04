// show rules
const gameContiner = document.querySelector(".game");
const rulesBtn = document.querySelector(".game__rules--button-btn");
const popupRules = document.querySelector(".popup__rules");
const rulesCloseBtn = document.querySelector(".popup__rules-closebtn");
const overlay = document.querySelector(".overlay");
const resultCount = document.querySelector(".number");
const finish = document.querySelector(".finish");
rulesBtn.addEventListener("click", () => {
  overlay.style.zIndex = "1";
  popupRules.style.zIndex = "2";
});

rulesCloseBtn.addEventListener("click", () => {
  overlay.style.zIndex = "-3";
  popupRules.style.zIndex = "-1";
});

//
// - Scissors beats Paper (paper,lizard)
// - Paper beats Rock  (rock ,spock)
// - Rock beats Lizard (Lizard , Scissors)
// - Lizard beats Spock (Spock , paper)
// - Spock beats Scissors ( scissors, rock)
// - Scissors beats Lizard
// - Paper beats Spock
// - Rock beats Scissors
// - Lizard beats Paper
// - Spock beats Rock

const playgroundContainer = document.querySelector(".game__playground");
let items = Array.from(document.querySelectorAll(".game__playground-item"));
let gameItems = [];
for (let i = 0; i < items.length; i++) {
  let div = document.createElement("div");
  let id = items[i].getAttribute("id");
  div.innerHTML = `
    <div class="game__playground-item--inner-circle">
    <img src="images/icon-${id}.svg" alt="" />
    </div>
    `;
  div.classList.add("game__playground-item");

  div.setAttribute("id", id);
  gameItems.push(div);
}
items.forEach((item) =>
  item.addEventListener("click", (e) => {
    let userChoosenItem = e.currentTarget;
    let userChoosenItemId = e.currentTarget.getAttribute("id");
    playgroundContainer.innerHTML = "";
    let userChoosen;
    if (window.innerWidth > 768) {
      playgroundContainer.style.cssText =
        "padding-top:2rem;min-height:55vh;background:none;flex-direction:row;justify-content:center;align-items:flex-start;gap:1rem;flex-wrap:no-wrap";
    } else {
      playgroundContainer.style.cssText =
        "padding-top:2rem;min-height:55vh;background:none;flex-direction:row;justify-content:space-around;align-items:flex-start;gap:1rem;flex-wrap:wrap";
    }
    for (let i = 0; i < gameItems.length; i++) {
      if (gameItems[i].getAttribute("id") == userChoosenItemId) {
        userChoosen = gameItems[i];
      }
    }
    defineItemWidth(userChoosen);
    // userChoosen.style.width = "scale(1.5)";
    let firstCol = document.createElement("div");
    firstCol.style.cssText =
      "display:flex;flex-direction:column; align-items:center;justify-content:center ;gap:1.2rem";
    let secondCol = document.createElement("div");
    if (window.innerWidth > 768) {
      secondCol.style.cssText =
        "display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.2rem;order:3";
    } else {
      secondCol.style.cssText =
        "display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.2rem";
    }
    let firstHeading = document.createElement("h2");
    let secondHeading = document.createElement("h2");
    firstHeading.innerText = "you picked";
    if (window.innerWidth < 768) {
      firstHeading.style.cssText =
        "font-size:0.9rem;text-transform:uppercase;color:white;";
    } else {
      firstHeading.style.cssText =
        "font-size:1.5rem;text-transform:uppercase;color:white;";
    }

    secondHeading.innerText = "the house picked";
    if (window.innerWidth < 768) {
      secondHeading.style.cssText =
        "font-size:0.9rem;text-transform:uppercase;color:white;";
    } else {
      secondHeading.style.cssText =
        "font-size:1.5rem;text-transform:uppercase;color:white;";
    }
    firstCol.appendChild(userChoosen);
    firstCol.appendChild(firstHeading);
    //
    let compAreaContainer = document.createElement("div");
    compAreaContainer.style.cssText =
      "display:flex;justify-content:center;align-items:center";

    let compArea = document.createElement("div");
    if (window.innerWidth < 532) {
      compArea.style.cssText =
        "width:100px;height:100px;background-color:black;border-radius:50%;margin-top:1.6rem";
    } else {
      compArea.style.cssText =
        "width:150px;height:150px;background-color:black;border-radius:50%;margin-top:3.6rem";
    }
    // compArea.style.cssText =
    //   "width:100px;height:100px;background-color:black;border-radius:50%;margin-top:1.6rem";
    compAreaContainer.appendChild(compArea);
    secondCol.appendChild(compAreaContainer);
    secondCol.appendChild(secondHeading);

    playgroundContainer.appendChild(firstCol);
    playgroundContainer.appendChild(secondCol);
    let compchoosen = getRandomElement();
    let img = document.querySelector(".game__playground-item img");
    if (window.innerWidth > 768) {
      img.style.width = "80px";
    } else if (window.innerWidth > 532) {
      img.style.width = "40px";
    } else {
      img.style.width = "30px";
    }

    setTimeout(() => {
      compAreaContainer.outerHTML = compchoosen.outerHTML;
      let imgs = document.querySelectorAll(".game__playground-item img");
      imgs.forEach((img) => {
        if (window.innerWidth > 768) {
          img.style.width = "80px";
        } else if (window.innerWidth > 532) {
          img.style.width = "40px";
        } else {
          img.style.width = "30px";
        }
      });
    }, 700);

    window.addEventListener("resize", () => {
      const currentObjs = document.querySelectorAll(".game__playground-item");

      currentObjs.forEach((obj) => {
        if (currentObjs.length == 2) {
          if (window.innerWidth > 768) {
            obj.style.minWidth = "250px";
            obj.style.minHeight = "250px";
            obj.querySelector("img").style.width = "80px";
          } else if (window.innerWidth > 532) {
            obj.style.minWidth = "125px";
            obj.style.minHeight = "125px";
            obj.querySelector("img").style.width = "50px";
          } else {
            obj.style.minWidth = "90px";
            obj.style.minHeight = "90px";
            obj.querySelector("img").style.width = "30px";
          }
        }
      });
    });

    if (userChoosen.id == compchoosen.id) {
      setTimeout(() => {
        let div = document.createElement("div");
        let resultHeading = document.createElement("h1");
        resultHeading.style.cssText =
          "font-size:2rem;color:white;font-weight:700;text-align:center";
        resultHeading.innerText = "NO WINNER";
        div.appendChild(resultHeading);
        let newBtn = document.createElement("button");
        newBtn.style.cssText =
          "display:block;outline:none;background-color:white; width:175px;cursor:pointer;margin:auto;padding:1rem 1.5rem;border-radius:0.4rem;border:none;color:hsl(229, 25%, 31%);font-size:1.2rem;font-weight:500";
        newBtn.innerText = "Continue";

        if (window.innerWidth > 768) {
          div.style.cssText = "text-align:center;order:2";
        } else {
          div.style.cssText = "min-width:100%;text-align:center";
        }
        div.appendChild(newBtn);
        playgroundContainer.appendChild(div);
        newBtn.addEventListener("click", resetPlayground);
      }, 1000);
    } else {
      let win = play(userChoosen.id, compchoosen.id);
      setTimeout(() => {
        if (win == true) {
          firstCol.style.boxShadow =
            "box-shadow: 12px 8px 40px rgba(255, 255, 255, 0.5);";
          let div = document.createElement("div");
          let resultHeading = document.createElement("h1");
          resultHeading.style.cssText =
            "font-size:2rem;color:white;font-weight:700;text-align:center";
          resultHeading.innerText = "Great +1 ";
          div.appendChild(resultHeading);
          let newBtn = document.createElement("button");
          newBtn.style.cssText =
            "display:block;outline:none;background-color:white; width:175px;cursor:pointer;margin:auto;padding:1rem 1.5rem;border-radius:0.4rem;border:none;color:hsl(229, 25%, 31%);font-size:1.2rem;font-weight:500";
          newBtn.innerText = "Continue";
          if (window.innerWidth > 768) {
            div.style.cssText = "text-align:center;order:2";
          } else {
            div.style.cssText = "min-width:100%;text-align:center";
          }
          div.appendChild(newBtn);
          playgroundContainer.appendChild(div);
          let res = Number(resultCount.innerText);
          ++res;
          resultCount.innerText = res;
          newBtn.addEventListener("click", resetPlayground);
        } else if (win == false) {
          let div = document.createElement("div");
          let resultHeading = document.createElement("h1");
          resultHeading.style.cssText =
            "font-size:2rem;color:white;font-weight:700;text-align:center";
          resultHeading.innerText = "Oops -1";
          div.appendChild(resultHeading);
          let newBtn = document.createElement("button");
          newBtn.style.cssText =
            "display:block;outline:none;background-color:white; width:175px;cursor:pointer;margin:auto;padding:1rem 1.5rem;border-radius:0.4rem;border:none;color:hsl(229, 25%, 31%);font-size:1.2rem;font-weight:500";
          newBtn.innerText = "Continue";
          if (window.innerWidth > 768) {
            div.style.cssText = "text-align:center;order:2";
          } else {
            div.style.cssText = "min-width:100%;text-align:center";
          }
          div.appendChild(newBtn);
          playgroundContainer.appendChild(div);
          let res = Number(resultCount.innerText);
          --res;
          resultCount.innerText = res;
          newBtn.addEventListener("click", resetPlayground);
        }
      }, 1000);
    }
  })
);

//functins

//define choosen item width

function defineItemWidth(item) {
  if (window.innerWidth < 532) {
    item.style.minWidth = "125px";
    item.style.minHeight = "125px";
  } else {
    item.style.minWidth = "250px";
    item.style.minHeight = "250px";
  }
}

//get random element
function getRandomElement() {
  let random = Math.floor(Math.random() * gameItems.length);
  let randomElement = gameItems[random];
  defineItemWidth(randomElement);
  return randomElement;
}

// game function
function play(user, computer) {
  // - Scissors beats (paper,lizard) lose against {}
  // - Paper beats Rock  (rock ,spock)
  // - Rock beats Lizard (Lizard , Scissors)
  // - Lizard beats Spock (Spock , paper)
  // - Spock beats Scissors ( scissors, rock)
  let userWin = false;
  switch (user) {
    case "scissors":
      if (computer == "paper" || computer == "lizard") {
        userWin = true;
      }
      break;
    case "paper":
      if (computer == "rock" || computer == "spock") {
        userWin = true;
      }
      break;
    case "rock":
      if (computer == "lizard" || computer == "scissors") {
        userWin = true;
      }
      break;
    case "lizard":
      if (computer == "spock" || computer == "paper") {
        userWin = true;
      }
      break;
    case "spock":
      if (computer == "scissors" || computer == "rock") {
        userWin = true;
      }
      break;
  }

  return userWin;
}

// reset game playground
function resetPlayground() {
  playgroundContainer.innerHTML = `
  <div class="game__playground-item" id="scissors">
          <div class="game__playground-item--inner-circle">
            <img src="images/icon-scissors.svg" alt="" />
          </div>
        </div>

        <div class="double first-double">
          <div class="game__playground-item" id="spock">
            <div class="game__playground-item--inner-circle">
              <img src="images/icon-spock.svg" alt="" />
            </div>
          </div>
          <div class="game__playground-item" id="paper">
            <div class="game__playground-item--inner-circle">
              <img src="images/icon-paper.svg" alt="" />
            </div>
          </div>
        </div>
        <div class="double second-double">
          <div class="game__playground-item" id="lizard">
            <div class="game__playground-item--inner-circle">
              <img src="images/icon-lizard.svg" alt="" />
            </div>
          </div>
          <div class="game__playground-item" id="rock">
            <div class="game__playground-item--inner-circle">
              <img src="images/icon-rock.svg" alt="" />
            </div>
          </div>
        </div>
  `;
  if (window.innerWidth > 768) {
    playgroundContainer.style.cssText =
      "height: 65vh;display: flex;flex-direction: column;justify-content: center;background: url('images/bg-pentagon.svg') no-repeat center center;background-size:329px 319px";
  } else {
    playgroundContainer.style.cssText =
      "height: 65vh;display: flex;flex-direction: column;justify-content: center;background: url('images/bg-pentagon.svg') no-repeat center center;background-size:200px 200px";
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      playgroundContainer.style.backgroundSize = "329px 319px";
    } else {
      playgroundContainer.style.backgroundSize = "200px 200px";
    }
  });
  // playgroundContainer.style.cssText =
  //   "height: 65vh;display: flex;flex-direction: column;justify-content: center;background: url('/images/bg-pentagon.svg') no-repeat center center;background-size:200px 200px";
  let items = Array.from(document.querySelectorAll(".game__playground-item"));
  let gameItems = [];
  for (let i = 0; i < items.length; i++) {
    let div = document.createElement("div");
    let id = items[i].getAttribute("id");
    div.innerHTML = `
        <div class="game__playground-item--inner-circle">
        <img src="images/icon-${id}.svg" alt="" />
        </div>
        `;
    div.classList.add("game__playground-item");

    div.setAttribute("id", id);
    gameItems.push(div);
  }
  items.forEach((item) =>
    item.addEventListener("click", (e) => {
      let userChoosenItemId = e.currentTarget.getAttribute("id");
      playgroundContainer.innerHTML = "";
      let userChoosen;
      if (window.innerWidth > 768) {
        playgroundContainer.style.cssText =
          "padding-top:2rem;min-height:55vh;background:none;flex-direction:row;justify-content:center;align-items:flex-start;gap:1rem;flex-wrap:no-wrap";
      } else {
        playgroundContainer.style.cssText =
          "padding-top:2rem;min-height:55vh;background:none;flex-direction:row;justify-content:space-around;align-items:flex-start;gap:1rem;flex-wrap:wrap";
      }

      for (let i = 0; i < gameItems.length; i++) {
        if (gameItems[i].getAttribute("id") == userChoosenItemId) {
          userChoosen = gameItems[i];
        }
      }
      defineItemWidth(userChoosen);

      let firstCol = document.createElement("div");
      firstCol.style.cssText =
        "display:flex;flex-direction:column; align-items:center;justify-content:center ;gap:1.2rem";
      let secondCol = document.createElement("div");
      if (window.innerWidth > 768) {
        secondCol.style.cssText =
          "display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.2rem;order:3";
      } else {
        secondCol.style.cssText =
          "display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1.2rem";
      }

      let firstHeading = document.createElement("h2");
      let secondHeading = document.createElement("h2");
      firstHeading.innerText = "you picked";
      // firstHeading.style.cssText =
      //   "font-size:0.9rem;text-transform:uppercase;color:white;";
      if (window.innerWidth < 768) {
        firstHeading.style.cssText =
          "font-size:0.9rem;text-transform:uppercase;color:white;";
      } else {
        firstHeading.style.cssText =
          "font-size:1.5rem;text-transform:uppercase;color:white;";
      }

      secondHeading.innerText = "the house picked";
      if (window.innerWidth < 532) {
        secondHeading.style.cssText =
          "font-size:0.9rem;text-transform:uppercase;color:white;";
      } else {
        secondHeading.style.cssText =
          "font-size:1.5rem;text-transform:uppercase;color:white;";
      }
      // secondHeading.innerText = "the house picked";
      if (window.innerWidth < 768) {
        secondHeading.style.cssText =
          "font-size:0.9rem;text-transform:uppercase;color:white;";
      } else {
        secondHeading.style.cssText =
          "font-size:1.5rem;text-transform:uppercase;color:white;";
      }
      // secondHeading.style.cssText =
      //   "font-size:0.9rem;text-transform:uppercase;color:white;";
      firstCol.appendChild(userChoosen);
      firstCol.appendChild(firstHeading);
      //
      let compAreaContainer = document.createElement("div");
      compAreaContainer.style.cssText =
        "display:flex;justify-content:center;align-items:center";

      let compArea = document.createElement("div");
      if (window.innerWidth < 532) {
        compArea.style.cssText =
          "width:100px;height:100px;background-color:black;border-radius:50%;margin-top:1.6rem";
      } else {
        compArea.style.cssText =
          "width:150px;height:150px;background-color:black;border-radius:50%;margin-top:3.6rem";
      }
      // compArea.style.cssText =
      //   "width:100px;height:100px;background-color:black;border-radius:50%;margin-top:1.6rem";
      compAreaContainer.appendChild(compArea);
      secondCol.appendChild(compAreaContainer);
      secondCol.appendChild(secondHeading);

      playgroundContainer.appendChild(firstCol);
      playgroundContainer.appendChild(secondCol);

      let compchoosen = getRandomElement();
      let img = document.querySelector(".game__playground-item img");
      if (window.innerWidth > 768) {
        img.style.width = "80px";
      } else if (window.innerWidth > 532) {
        img.style.width = "40px";
      } else {
        img.style.width = "30px";
      }

      setTimeout(() => {
        compAreaContainer.outerHTML = compchoosen.outerHTML;
        let imgs = document.querySelectorAll(".game__playground-item img");
        imgs.forEach((img) => {
          if (window.innerWidth > 768) {
            img.style.width = "80px";
          } else if (window.innerWidth > 532) {
            img.style.width = "40px";
          } else {
            img.style.width = "30px";
          }
        });
      }, 700);

      console.log(compchoosen);
      console.log(userChoosen);
      window.addEventListener("resize", () => {
        const currentObjs = document.querySelectorAll(".game__playground-item");

        currentObjs.forEach((obj) => {
          if (currentObjs.length == 2) {
            if (window.innerWidth > 768) {
              obj.style.minWidth = "250px";
              obj.style.minHeight = "250px";
              obj.querySelector("img").style.width = "80px";
            } else if (window.innerWidth > 532) {
              obj.style.minWidth = "125px";
              obj.style.minHeight = "125px";
              obj.querySelector("img").style.width = "50px";
            } else {
              obj.style.minWidth = "90px";
              obj.style.minHeight = "90px";
              obj.querySelector("img").style.width = "30px";
            }
          }
        });
      });

      // console.log(compchoosen.id);
      // console.log(userChoosen.id);
      if (userChoosen.id == compchoosen.id) {
        setTimeout(() => {
          let div = document.createElement("div");
          let resultHeading = document.createElement("h1");
          resultHeading.style.cssText =
            "font-size:2rem;color:white;font-weight:700;text-align:center";
          resultHeading.innerText = "NO WINNER";
          div.appendChild(resultHeading);
          let newBtn = document.createElement("button");
          newBtn.style.cssText =
            "display:block;outline:none;background-color:white; width:175px;cursor:pointer;margin:auto;padding:1rem 1.5rem;border-radius:0.4rem;border:none;color:hsl(229, 25%, 31%);font-size:1.2rem;font-weight:500";
          newBtn.innerText = "Continue";

          if (window.innerWidth > 768) {
            div.style.cssText = "text-align:center;order:2";
          } else {
            div.style.cssText = "min-width:100%;text-align:center";
          }
          div.appendChild(newBtn);
          playgroundContainer.appendChild(div);
          newBtn.addEventListener("click", resetPlayground);
        }, 1000);
      } else {
        let win = play(userChoosen.id, compchoosen.id);
        setTimeout(() => {
          if (win == true) {
            let div = document.createElement("div");
            let resultHeading = document.createElement("h1");
            resultHeading.style.cssText =
              "font-size:2rem;color:white;font-weight:700;text-align:center";
            resultHeading.innerText = "Great +1 ";
            div.appendChild(resultHeading);
            let newBtn = document.createElement("button");
            newBtn.style.cssText =
              "display:block;outline:none;background-color:white; width:175px;cursor:pointer;margin:auto;padding:1rem 1.5rem;border-radius:0.4rem;border:none;color:hsl(229, 25%, 31%);font-size:1.2rem;font-weight:500";
            newBtn.innerText = "Continue";
            if (window.innerWidth > 768) {
              div.style.cssText = "text-align:center;order:2";
            } else {
              div.style.cssText = "min-width:100%;text-align:center";
            }
            div.appendChild(newBtn);
            playgroundContainer.appendChild(div);
            let res = Number(resultCount.innerText);
            ++res;
            resultCount.innerText = res;
            if (res == "7") {
              finish.firstElementChild.innerText = "Congratulations ...";
              finish.firstElementChild.nextElementSibling.innerText = "YOU WON";
              finish.style.display = "block";
              const againBtn = document.querySelector(".play-again");
              againBtn.addEventListener("click", () => {
                location.reload();
              });
            }

            newBtn.addEventListener("click", resetPlayground);
          } else if (win == false) {
            let div = document.createElement("div");
            let resultHeading = document.createElement("h1");
            resultHeading.style.cssText =
              "font-size:2rem;color:white;font-weight:700;text-align:center";
            resultHeading.innerText = "Oops -1";
            div.appendChild(resultHeading);
            let newBtn = document.createElement("button");
            newBtn.style.cssText =
              "display:block;outline:none;background-color:white; width:175px;cursor:pointer;margin:auto;padding:1rem 1.5rem;border-radius:0.4rem;border:none;color:hsl(229, 25%, 31%);font-size:1.2rem;font-weight:500";
            newBtn.innerText = "Continue";
            if (window.innerWidth > 768) {
              div.style.cssText = "text-align:center;order:2";
            } else {
              div.style.cssText = "min-width:100%;text-align:center";
            }
            div.appendChild(newBtn);
            playgroundContainer.appendChild(div);
            let res = Number(resultCount.innerText);
            --res;
            resultCount.innerText = res;
            if (res == "3") {
              finish.firstElementChild.innerText = " YOU LOSE";
              finish.firstElementChild.nextElementSibling.innerText =
                "TRY AGAIN ...";
              finish.style.display = "block";
              const againBtn = document.querySelector(".play-again");
              againBtn.addEventListener("click", () => {
                location.reload();
              });
            }
            newBtn.addEventListener("click", resetPlayground);
          }
        }, 1000);
      }
    })
  );
}

// make the  whole flow responsive

window.addEventListener("resize", () => {
  let container = document.querySelector(".game__playground");
  let btn = container.lastElementChild;
  let firstItem = container.firstElementChild;
  let firstItemHeading = firstItem.lastChild;
  let lastItem = container.firstElementChild.nextElementSibling;
  let lastItemHeading = lastItem.lastChild;
  let playItems = document.querySelectorAll(".game__playground-item");
  if (playItems.length <= 2) {
    if (window.innerWidth > 768) {
      container.style.cssText =
        "padding-top:2rem;min-height:55vh;background:none;flex-direction:row;justify-content:center;align-items:flex-start;gap:2rem;flex-wrap:no-wrap";
      lastItem.style.order = "3";
      firstItemHeading.style.fontSize = "1.5rem";
      lastItemHeading.style.fontSize = "1.5rem";
      btn.style.order = "2";
      btn.style.minWidth = "auto";
    } else {
      container.style.cssText =
        "padding-top:2rem;min-height:55vh;background:none;flex-direction:row;justify-content:center;align-items:flex-start;gap:2rem;flex-wrap:wrap";
      lastItem.style.order = "2";

      btn.style.order = "3";
      btn.style.minWidth = "100%";
      firstItemHeading.style.fontSize = "0.9rem";
      lastItemHeading.style.fontSize = "0.9rem";
    }
  }
});
