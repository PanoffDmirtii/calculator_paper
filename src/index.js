const _500x700 = "500x700";
const _700x1000 = "700x1000";
const _420x594 = "420x594";

const DPI_720 = "720";
const DPI_1440 = "1440";
const CUSTOM = "CUSTOM";

const VALUE_720 = "Печать 720 dpi";
const VALUE_1440 = "Печать 1440 dpi";

const VALUE_MATTE = "Матовая";
const VALUE_GLOSSY = "Глянцевая";

const VALUE_420_594 = "420мм х 594мм";
const VALUE_500_700 = "500мм х 700мм";
const VALUE_700_1000 = "700мм х 1000мм";
const VALUE_CUSTOM_SIZE = "custom";

const VALUE_1 = "1";
const VALUE_2 = "2";
const VALUE_10 = "10";
const VALUE_20 = "20";
const VALUE_CUSTOM_COUNT = "custom";

const inputValues = {};

const posterCount = {
  [VALUE_1]: 1,
  [VALUE_2]: 2,
  [VALUE_10]: 10,
  [VALUE_20]: 20,
  [VALUE_CUSTOM_COUNT]: null,
};

const posterSize = {
  [VALUE_420_594]: _420x594,
  [VALUE_500_700]: _500x700,
  [VALUE_700_1000]: _700x1000,
  custom_size: CUSTOM,
};

const poster = {
  tube: 150,
  paperCoast: 127.3,
  USD: 75,
  factorDpi: {
    [DPI_720]: 1,
    [DPI_1440]: 1.2,
  },
  [_420x594]: {
    width: 420,
    length: 594,
    [DPI_720]: {
      countFactor: {
        1: 6.8,
        2: 5.5,
        10: 5.3,
        20: 5,
        50: 4.8,
        100: 4.8,
      },
      coast: 50.47,
    },
    [DPI_1440]: {
      countFactor: {
        1: 6.8,
        2: 5.5,
        10: 5.3,
        20: 5,
        50: 4.8,
        100: 4.8,
      },
      coast: 108.65,
    },
  },
  [_500x700]: {
    width: 500,
    length: 700,
    [DPI_720]: {
      countFactor: {
        1: 6.8,
        2: 5.5,
        10: 5.3,
        20: 5,
        50: 4.8,
        100: 4.8,
      },
      coast: 70.8,
    },
    [DPI_1440]: {
      countFactor: {
        1: 6.8,
        2: 5.5,
        10: 5.3,
        20: 5,
        50: 4.8,
        100: 4.8,
      },
      coast: 76.06,
    },
  },
  [_700x1000]: {
    width: 700,
    length: 1000,
    [DPI_720]: {
      countFactor: {
        1: 6.8,
        2: 5.5,
        10: 5.3,
        20: 5,
        50: 4.8,
        100: 4.8,
      },
      coast: 141.61,
    },
    [DPI_1440]: {
      countFactor: {
        1: 6.8,
        2: 5.5,
        10: 5.3,
        20: 5,
        50: 4.8,
        100: 4.8,
      },
      coast: 152.11,
    },
  },
  [CUSTOM]: {
    width: null,
    length: null,
    [DPI_720]: {
      countFactor: {
        1: 6.8,
        2: 5.5,
        10: 5.3,
        20: 5,
        50: 4.8,
        100: 4.8,
      },
    },
    [DPI_1440]: {
      countFactor: {
        1: 6.8,
        2: 5.5,
        10: 5.3,
        20: 5,
        50: 4.8,
        100: 4.8,
      },
    },
  },
};

let customSizeL = document.getElementsByName("customSizeL")[0];
let customSizeW = document.getElementsByName("customSizeW")[0];
customSizeL.min = 150;
customSizeL.value = 150;
customSizeL.max = 5000;
customSizeW.min = 150;
customSizeW.value = 150;
customSizeW.max = 1000;

let customCountInput = document.getElementsByName("customCountInput")[0];
customCountInput.min = 1;
customCountInput.max = 500;
customCountInput.value = 1;

let price = document.getElementsByClassName("t-calc")[0];
let button = document.getElementsByClassName('t-submit')[0];

let blockDpi;
let blockPaper;
let blockSize;
let blockCount;

const block = document.querySelector(
  "form#form209674673 div.t-form__inputsbox"
);

[...block.children].forEach((el) => {
  const dataSet = el.dataset.inputLid;
  if (dataSet === "1531306243545") {
    blockDpi = el;
  } else if (dataSet === "1594222211293") {
    blockPaper = el;
  } else if (dataSet === "1594222266123") {
    blockSize = el;
  } else if (dataSet === "1594222523773") {
    blockCount = el;
  } else if (dataSet === "1594222970629") {
    price = el;
  }
});

let activeSizeL = 150;
let activeSizeW = 150;
let activeDpi;
let activePaper;
let activeSize;
let activeCount = 1;

button.onclick = () =>
  alert(
    `${activeDpi}, ${activePaper}, ${
      activeSize !== CUSTOM
        ? activeSize
        : activeSizeW + "*" + activeSizeLL.value
    }, ${activeCount}`
  );

customSizeW.oninput = () => {
  if (+customSizeW.value > 1000) {
    customSizeW.value = 1000;
  }
  activeSizeW = 1000;
  caclulatePrice();
};

customSizeL.oninput = () => {
  if (+customSizeL.value > 5000) {
    customSizeL.value = 5000;
  }
  activeSizeL = 5000;
  caclulatePrice();
};

customCountInput.oninput = () => {
  if (+customCountInput.value > 10000) {
    customCountInput.value = 10000
  }
  activeCount = customCountInput.value;
  caclulatePrice();
};

blockDpi.addEventListener("click", (event) => {
  const value = event.target.value;
  if (value === VALUE_720) {
    activeDpi = DPI_720;
  } else if (value === VALUE_1440) {
    activeDpi = DPI_1440;
  }
  caclulatePrice();
});

blockPaper.addEventListener("click", (event) => {
  const value = event.target.value;
  if (value === VALUE_MATTE) {
    activePaper = VALUE_MATTE;
  } else if (value === VALUE_GLOSSY) {
    activePaper = VALUE_GLOSSY;
  }
  caclulatePrice();
});

blockSize.addEventListener("click", (event) => {
  const value = event.target.value;
  if (value === VALUE_CUSTOM_SIZE) {
    customSizeL.type = "number";
    customSizeW.type = "number";
    activeSize = CUSTOM;
  } else {
    customSizeL.type = "hidden";
    customSizeW.type = "hidden";
    activeSize = posterSize[value];
    caclulatePrice();
  }
});

blockCount.addEventListener("click", (event) => {
  const value = event.target.value;
  if (value === VALUE_CUSTOM_COUNT) {
    customCountInput.type = "number";
    activeCount = customCountInput.value
  } else {
    customCountInput.type = "hidden";
    activeCount = posterCount[value];
  }
  caclulatePrice();
});

function getFactorCount() {
  const obj = poster[activeSize][activeDpi].countFactor;

  if (obj[activeCount]) return obj[activeCount];

  let factor;
  Object.entries(obj).find((el, index, arr) => {
    if (+el[0] > +activeCount) {
      factor = arr[index - 1][1];
      return true;
    }
  });
  return factor ? factor : obj["100"];
}

function getArea() {
  if (activeSize === CUSTOM) {
    return (activeSizeL * activeSizeW) / (1000 * 1000);
  } else {
    return (
      (poster[activeSize].width * poster[activeSize].length) / (1000 * 1000)
    );
  }
}

function renderDiscount(factor) {
  let cf = Object.entries(poster[activeSize][activeDpi].countFactor);
  const discount0 = cf[0][1];
  cf.forEach((item) => {
    const id = item[0];
    document.getElementById(`discount-${item[0]}`).innerText =
      100 - Math.round((item[1] * 100) / discount0) + "%";
  });
  document.getElementById(`discount-custom-count`).innerText =
    100 - Math.round((factor * 100) / discount0) + "%";
}

function getOneSquareMeter() {
  const { USD, paperCoast, factorDpi } = poster;
  return activeDpi === DPI_720
    ? (USD + paperCoast) * factorDpi[DPI_720]
    : (USD + paperCoast) * factorDpi[DPI_1440];
}

function caclulatePrice() {
  if (activeDpi && activePaper && activeSize && activeCount) {
    let sum;
    const countFactor = getFactorCount();
    const coast1m2 = getOneSquareMeter();
    const area = getArea();
    // renderDiscount(countFactor);
    sum =
      area * activeCount < 0.25
        ? 344
        : Math.ceil(countFactor * activeCount * area * coast1m2);
    price.innerText = `${sum} ₽`;
  }
}
