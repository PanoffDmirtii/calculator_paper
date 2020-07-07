let activeDpi;
let activePaper;
let activeSize;
let activeCount;

const blockCustomCount = document.getElementById("block-custom-count");
const blockCustomSize = document.getElementById("block-custom-size");
const customSizeL = document.getElementById("custom-size-l-input");
const customSizeW = document.getElementById("custom-size-w-input");
const price = document.getElementById("price");
const button = document.getElementById("btn-order");

button.onclick = () =>
  alert(`${activeDpi}, ${activePaper}, ${activeSize}, ${activeCount}`);

customSizeW.oninput = () => {
  if (+customSizeW.value > 1000) {
    customSizeW.value = 1000
  }
}

customSizeL.oninput = () => {
  if (+customSizeW.value > 5000) {
    customSizeW.value = 5000
  }
}

const customCountInput = document.getElementById("custom-count-input");
customCountInput.oninput = () => {
  activeCount = customCountInput.value;
  caclulatePrice();
};

document.getElementById("block_dpi").addEventListener("click", (event) => {
  const id = event.target.id;
  if (id === "dpi-720") {
    activeDpi = DPI_720;
  } else if (id === "dpi-1440") {
    activeDpi = DPI_1440;
  }
  caclulatePrice();
});

document.getElementById("block_paper").addEventListener("click", (event) => {
  const id = event.target.id;
  if (id === "matte") {
    activePaper = "matte";
  } else if (id === "glossy") {
    activePaper = "glossy";
  }
  caclulatePrice();
});

document.getElementById("block-size").addEventListener("click", (event) => {
  const { id, tagName } = event.target;
  if (id === "custom-size-l-input" || id === "custom-size-w-input")
    return false;

  if (tagName === "INPUT" || tagName === "LABEL") {

    if (id === "custom_size") {
      blockCustomSize.style.display = "block";
    } else {
      activeSize = posterSize[id];
      console.log(activeSize);
      
      blockCustomSize.style.display = "none";
    }
    caclulatePrice();
  }
});

document.getElementById("block-count").addEventListener("click", (event) => {
  const { id, tagName } = event.target;
  if (id === "custom-count-input") return false;
  if (tagName === "INPUT" || tagName === "LABEL") {
    if (id === "custom-count") {
      blockCustomCount.style.display = "block";
    } else {
      activeCount = posterCount[id];
      console.log(activeCount, 3333);
      
      blockCustomCount.style.display = "none";
    }
    caclulatePrice();
  }
});

function getFactorCount() {
  const obj = poster[activeSize][activeDpi].countFactor;
  console.log(obj);
  console.log(activeCount);
  
  
  if (obj[activeCount]) {
    return obj[activeCount];
  }
  let factor;
  Object.entries(obj).find((el, index, arr) => {
    if (+el[0] > +activeCount) {
      factor = arr[index - 1][1];
      return true;
    }
  });
  return factor;
}

function posterLayout() {
}

function caclulatePrice() {
  if (activeDpi && activePaper && activeSize && activeCount) {
    const coast = poster[activeSize][activeDpi].coast;
    const countFactor = getFactorCount();
    console.log(countFactor);
    
    price.innerText =
      Math.ceil(coast * countFactor * activeCount) +
      ` + тубус ${poster.tube * activeCount}`;
  }
}
