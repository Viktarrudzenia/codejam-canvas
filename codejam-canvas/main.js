const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const linkJSONSmall =
  "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json";
const linkJSONMedium =
  "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json";

ctx.fillStyle = "gray";
ctx.fillRect(0, 0, 512, 512);

let small = document.querySelector(".small");
let medium = document.querySelector(".medium");
let big = document.querySelector(".big");

let сoefSmall = 512 / 4;
let сoefMedium = 512 / 32;
let сoefBig = 512 / 256;

async function drawSmall() {
  try {
    console.log('I"m in async small function');
    const smallJSON = await fetch(linkJSONSmall);
    if (smallJSON.ok) {
      const dataSmallJSON = await smallJSON.json();
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
    console.log('I"m in async drawMedium function');
    const mediumJSON = await fetch(linkJSONMedium);
    if (mediumJSON.ok) {
      const datamediumJSON = await mediumJSON.json();
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

small.addEventListener("click", drawSmall);
medium.addEventListener("click", drawMedium);
// big.addEventListener("click", drawBig);
