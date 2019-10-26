const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const layoutContainer = document.querySelector("layout--container");
const checkbox = document.querySelector("layout--checkbox");

const linkJSONSmall =
  "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json";
const linkJSONMedium =
  "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json";
const linkImageBig =
  "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png";

let layout = document.querySelector(".layout");
let small = document.querySelector(".small");
let medium = document.querySelector(".medium");
let big = document.querySelector(".big");
let clear = document.querySelector(".clear");
let mediumFun = document.querySelector(".mediumFun");

let isDrawMediumFun = true;

let сoefSmall = 512 / 4;
let сoefMedium = 512 / 32;

// vars for add/remove checkbox or layout class for layout
let currentActiveCheckbox;
let currentActiveLayout;

clearCanvas();

// insert image before canvas
canvas.insertAdjacentHTML(
  "beforebegin",
  '<img id="rss" src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png" alt="rolling scopes logo"></img>'
);

async function drawSmall() {
  try {
    const smallJSON = await fetch(linkJSONSmall);
    if (smallJSON.ok) {
      const dataSmallJSON = await smallJSON.json();
      isDrawMediumFun = false;

      // ************************************ DRAW CANVAS SMALL *******************************************
      for (let i = 0, b = 0; b < dataSmallJSON.length; i += сoefSmall, b++) {
        for (let j = 0, a = 0; a < dataSmallJSON[b].length; j += сoefSmall, a++) {
          ctx.fillStyle = `#${dataSmallJSON[b][a]}`;
          ctx.fillRect(j, i, сoefSmall, сoefSmall);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function drawMedium() {
  try {
    const mediumJSON = await fetch(linkJSONMedium);
    if (mediumJSON.ok) {
      const datamediumJSON = await mediumJSON.json();
      if (ctx.fillStyle === "#c8311e") {
        clearCanvas();
      }
      // ************************************ DRAW CANVAS MEDIUM *******************************************
      for (let i = 0, b = 0; b < datamediumJSON.length; i += сoefMedium, b++) {
        for (let j = 0, a = 0; a < datamediumJSON[b].length; j += сoefMedium, a++) {
          ctx.fillStyle = `rgb(${datamediumJSON[b][a][0]}, ${datamediumJSON[b][a][1]}, ${
            datamediumJSON[b][a][2]
          })`;
          ctx.fillRect(j, i, сoefMedium, сoefMedium);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function drawMediumFun() {
  try {
    const mediumJSON = await fetch(linkJSONMedium);
    if (mediumJSON.ok) {
      const datamediumJSON = await mediumJSON.json();
      if (ctx.fillStyle === "#c8311e") {
        clearCanvas();
      }
      isDrawMediumFun = true;

      // ************************************ DRAW CANVAS MEDIUM *******************************************
      for (let i = 0, b = 0, s = 100; b < datamediumJSON.length; i += сoefMedium, b++) {
        for (let j = 0, a = 0; a < datamediumJSON[b].length; j += сoefMedium, a++) {
          s += 3;
          setTimeout(s => {
            if (isDrawMediumFun === false) {
              return;
            }
            ctx.fillStyle = `rgb(${datamediumJSON[b][a][0]}, ${datamediumJSON[b][a][1]}, ${
              datamediumJSON[b][a][2]
            })`;
            ctx.fillRect(j, i, сoefMedium, сoefMedium);
          }, s);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function drawBig() {
  isDrawMediumFun = false;
  ctx.scale(2, 2);
  ctx.drawImage(document.getElementById("rss"), 0, 0);
  ctx.scale(0.5, 0.5);
  ctx.fillStyle = "gray";
}

function clearCanvas() {
  isDrawMediumFun = false;
  ctx.fillStyle = "gray";
  ctx.fillRect(0, 0, 512, 512);
}

function makeActive() {
  let target = event.target;
  console.dir(target);
  if (target.childElementCount < 3) {
    console.log(currentActiveLayout);
    if (currentActiveLayout !== undefined) {
      currentActiveLayout.classList.remove("active");
      currentActiveCheckbox.classList.remove("active");
    }
    if (target.className.includes("layout--container")) {
      target.classList.add("active");
      target.firstElementChild.classList.add("active");
      currentActiveLayout = target;
      currentActiveCheckbox = target.firstElementChild;
    } else if (target.className.includes("layout--text")) {
      target.previousElementSibling.classList.add("active");
      target.parentElement.classList.add("active");
      currentActiveLayout = target.parentElement;
      currentActiveCheckbox = target.previousElementSibling;
    } else {
      target.classList.add("active");
      target.parentElement.classList.add("active");
      currentActiveLayout = target.parentElement;
      currentActiveCheckbox = target;
    }
  }
}

// small.classList.add("active");
// small.firstElementChild.classList.add("active");

layout.addEventListener("click", makeActive);
small.addEventListener("click", drawSmall);
medium.addEventListener("click", drawMedium);
big.addEventListener("click", drawBig);
clear.addEventListener("click", clearCanvas);
mediumFun.addEventListener("click", drawMediumFun);
