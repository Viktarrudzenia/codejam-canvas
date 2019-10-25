const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const linkJSONSmall =
  "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json";
const linkJSONMedium =
  "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json";
const linkImageBig =
  "https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png";

ctx.fillStyle = "gray";
ctx.fillRect(0, 0, 512, 512);

let small = document.querySelector(".small");
let medium = document.querySelector(".medium");
let big = document.querySelector(".big");

let сoefSmall = 512 / 4;
let сoefMedium = 512 / 32;

// insert image before canvas
canvas.insertAdjacentHTML(
  "beforebegin",
  '<img id="rss" src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png" alt="rolling scopes logo"></img>'
);

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

// function createImagePromiser() {
//   return new Promise(() => {
//     console.log('I"m inside setTimeout');
//     canvas.insertAdjacentHTML(
//       "beforebegin",
//       '<img id="rss" src="https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png" alt="rolling scopes logo"></img>'
//     );
//   });
// }

async function drawBig() {
  // ************************************ DRAW CANVAS BIG *******************************************
  await ctx.scale(2, 2);
  await ctx.drawImage(document.getElementById("rss"), 0, 0);
  await ctx.scale(0.5, 0.5);
}

small.addEventListener("click", drawSmall);
medium.addEventListener("click", drawMedium);
big.addEventListener("click", drawBig);
