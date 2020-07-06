let activeDpi;
let activePaper;
let activeSize;
let activeCount;

const blockCustomCount = document.getElementById("block-custom-count");
const blockCustomSize = document.getElementById("block-custom-size");

const price = document.getElementById("price");
const customCount = document.getElementById('custom-count').value
const customSizeL = document.getElementById("custom-size-l-input");
const customSizeW = document.getElementById("custom-size-w-input");

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
  const id = event.target.id;
  if (
    id === "custom_size" ||
    id === "custom-size-l-input" ||
    id === "custom-size-w-input"
  ) {
    activeSize = "custom";
    blockCustomSize.style.display = "block";
  } else {
    activeSize = posterSize[id];
    blockCustomSize.style.display = "none";
  }
  caclulatePrice();
});

document.getElementById("block-count").addEventListener("click", (event) => {
  const id = event.target.id;
  if (id === "custom-count" || id === "custom-count-input") {
    blockCustomCount.style.display = "block";
    console.log(customCount)
  } else {
    activeCount = posterCount[id];
    blockCustomCount.style.display = "none";
  }
  caclulatePrice();
});

function caclulatePrice() {
  console.log(activeDpi, activePaper, activeCount, activeSize);
  if (activeDpi && activePaper && activeSize && activeCount) {
    const coast = poster[activeSize][activeDpi].coast;
    const factors = poster[activeSize][activeDpi].countFactor;
    const countFactor = factors[activeCount];
    price.innerText = Math.ceil(coast * countFactor * activeCount) + ` + тубус ${poster.tube}`;
  }
}
