

// ------- next-previus-------------

var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");

var next = document.getElementById("next");
var back = document.getElementById("back");

next.onclick = function () {
  form1.style.display = "none";
  form2.style.display = "block"

  var show = document.getElementById("back");
  show.style.display = "block";
  var show = document.getElementById("next");
  show.style.display = "none";
  var show = document.getElementById("download");
  show.style.display = "block";
  var show = document.getElementById("myGroup");
  show.style.display = "none";


}

back.onclick = function () {
  form1.style.marginLeft = "5px";
  form1.style.display = "block";
  form2.style.display = "none"
  var show = document.getElementById("back");
  show.style.display = "none";
  var show = document.getElementById("next");
  show.style.display = "block";
  var show = document.getElementById("download");
  show.style.display = "none";
  var show = document.getElementById("myGroup");
  show.style.display = "block";

}


// --------------Gradient------------


const selectMenu = document.querySelector(".select-box select");
const colorInputs = document.querySelectorAll(".colors input");

const generateGradient = (isRandom) => {
  if (isRandom) {
    // If isRandom is true, update the colors inputs value with random color
    colorInputs[0].value = getRandomColor();
    colorInputs[1].value = getRandomColor();
  }
  const gradient = `linear-gradient(${selectMenu.value}, ${colorInputs[0].value}, ${colorInputs[1].value})`;
  document.querySelector("#box").style.background = gradient;
};
selectMenu.addEventListener("input", function () {
  return generateGradient(false);
});

colorInputs.forEach((input) => {
  input.addEventListener("input", () => generateGradient(false));
});




// //remove background

let imageURL;

function submitHandler() {
  // console.log("click");
  const fileInput = document.getElementById("fileInput");
  // console.log(fileInput.files);
  const image = fileInput.files[0];

  // Multipart file

  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");
  const apiKey = "1MwvniQYx8HrCC4AJ8Dv8Rro";
  
  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  })
    .then(function (reponse) {
      return reponse.blob();
    })
    .then(function (blob) {
      // console.log(blob);
      const url = URL.createObjectURL(blob);
      imageURL = url;
      const img = document.querySelector("#box");
      img.src = url;
      // document.body.appendChild(img);
    })

    .catch();
}


// -------------office part-----------

function gray() {
  var image = document.querySelector("#box");
  image.style.background = " radial-gradient(50% 50% at 50% 50%, #EDEDED 0%, #BBBBBB 100%)";

}

function blue() {
  var image = document.querySelector("#box");
  image.style.background = " radial-gradient(50% 50% at 50% 50%, #5670E7 0%, #2E4084 100%)";

}

function darkgray() {
  var image = document.querySelector("#box");
  image.style.background = " radial-gradient(50% 50% at 50% 50%, #565656 0%, #292929 100%)";

}

function orange() {
  var image = document.querySelector("#box");
  image.style.background = " radial-gradient(50% 50% at 50% 50%, #BB7F2D 0%, #603C14 100%)";

}
function aliceblue() {
  var image = document.querySelector("#box");
  image.style.background = "aliceblue";

}
function powderblue() {
  var image = document.querySelector("#box");
  image.style.background = " powderblue";

}
function lightgray() {
  var image = document.querySelector("#box");
  image.style.background = " lightgray";

}function steelblue() {
  var image = document.querySelector("#box");
  image.style.background = "steelblue";

}


//shap change

function square() {
  var image = document.querySelector("#box");
  image.style.borderRadius = "0%";

}



function leaf() {
  var image = document.querySelector("#box");
  image.style.borderRadius = "0 68%";
}


function circle() {
  var image = document.querySelector("#box");
  image.style.borderRadius = "50%";
}


function egg() {
  var image = document.querySelector("#box");
  image.style.borderRadius = " 61% / 84% 84% 38% 38%";
}


//color treatment
function light() {
  var image = document.querySelector("#box");
  image.style.filter = "grayscale(0%)";


}

function blackwhite() {
  var image = document.querySelector("#box");
  image.style.filter = "grayscale(100%)";
}


// outline
function showOutline() {
  var image = document.querySelector("#box");
  image.style.border = "10px solid white";

}

function notshowOutline() {
  var image = document.querySelector("#box");

  image.style.border = "none";
}


// Downlode 
  //  show massage
function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
 
//  download image
$(document).ready(function () {
  $('.is-hidden').click(function () {
      domtoimage.toBlob(document.getElementById('content'))
          .then(function (blob) {
              window.saveAs(blob, 'output.png');
          });

  })
})





// // upload image
let box = document.getElementById("box");
let fileInput = document.getElementById("fileInput");


fileInput.onchange = function () {
    box.src = URL.createObjectURL(fileInput.files[0]);
}

//--------- undo & redo-------



let colorHistory = [];
let shapeHistory = [];
let filterHistory = [];
let outlineHistory = [];
// let currentIndex = -1;

const imageContainer = document.getElementById("box");
//color
const changeColorButton = document.getElementById("form1");
//shape
const changeShapeButton = document.getElementById("shape");
//b&w
const changebwimgButton = document.getElementById("bwimg");
//outline
const changeoutlineimgButton = document.getElementById("outlineimg");
//undo ande redo
const undoButton = document.getElementById("undo_btn");
const redoButton = document.getElementById("redo_btn");

// changeColorButton.addEventListener("click", () => {
  function handleClick() {
    const randomColor = imageContainer.style.background;
    colorHistory.push(randomColor);
    shapeHistory.push(imageContainer.style.borderRadius);
    filterHistory.push(imageContainer.style.filter);
    outlineHistory.push(imageContainer.style.outline);
    currentIndex = colorHistory.length - 0;
    updateUndoRedoButtons();
  }
  changeColorButton.addEventListener("click", handleClick);
  
  // changeShapeButton.addEventListener("click", () => {
  function handleShapeChange() {
    const randomShape = imageContainer.style.borderRadius;
    shapeHistory.push(randomShape);
    colorHistory.push(imageContainer.style.background);
    filterHistory.push(imageContainer.style.filter);
    outlineHistory.push(imageContainer.style.outline);
    currentIndex = shapeHistory.length - 0;
    updateUndoRedoButtons();
  }
  changeShapeButton.addEventListener("click", handleShapeChange);
  
  // changebwimgButton.addEventListener("click", () => {
  function handleBWImg() {
    const randomFilter = imageContainer.style.filter;
    filterHistory.push(randomFilter);
    colorHistory.push(imageContainer.style.background);
    shapeHistory.push(imageContainer.style.borderRadius);
    outlineHistory.push(imageContainer.style.outline);
    currentIndex = filterHistory.length - 0;
    updateUndoRedoButtons();
  }
  changebwimgButton.addEventListener("click", handleBWImg);
  
  // changeoutlineimgButton.addEventListener("click", () => {
  function handleOutlineImg() {
    const randomOutline = imageContainer.style.outline;
    outlineHistory.push(randomOutline);
    colorHistory.push(imageContainer.style.background);
    shapeHistory.push(imageContainer.style.borderRadius);
    filterHistory.push(imageContainer.style.filter);
    currentIndex = outlineHistory.length - 0;
    updateUndoRedoButtons();
  }
  changeoutlineimgButton.addEventListener("click", handleOutlineImg);
  
  // Similar event listeners for other style changes...
  
  undoButton.addEventListener("click", () => {
    if (currentIndex >= 0) {
      imageContainer.style.background = colorHistory[currentIndex];
      imageContainer.style.borderRadius = shapeHistory[currentIndex];
      imageContainer.style.filter = filterHistory[currentIndex];
      imageContainer.style.outline = outlineHistory[currentIndex];
      currentIndex--;
      updateUndoRedoButtons();
    }
  });
  
  redoButton.addEventListener("click", () => {
    if (currentIndex < colorHistory.length - 0) {
      imageContainer.style.background = colorHistory[currentIndex];
      imageContainer.style.borderRadius = shapeHistory[currentIndex];
      imageContainer.style.filter = filterHistory[currentIndex];
      imageContainer.style.outline = outlineHistory[currentIndex];
      currentIndex++;
      updateUndoRedoButtons();
    }
  });
  
  function updateUndoRedoButtons() {
    undoButton.disabled = currentIndex <= 0;
    redoButton.disabled = currentIndex >= colorHistory.length - 0;
  }






