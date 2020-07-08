const _500x700 = "500x700";
const _700x1000 = "700x1000";
const _420x594 = "420x594";

const DPI_720 = "720";
const DPI_1440 = "1440";
const CUSTOM = "CUSTOM";

const posterCount = {
  "count-1": 1,
  "count-2": 2,
  "count-10": 10,
  "count-20": 20,
  "count-50": 50,
  "count-100": 100,
  "custom-count": null,
};

const posterSize = {
  size_420_594: _420x594,
  size_500_700: _500x700,
  size_700_1000: _700x1000,
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

let activeDpi;
let activePaper;
let activeSize;
let activeCount;

const blockCustomCount = document.getElementById("block-custom-count");
const blockCustomSize = document.getElementById("block-custom-size");
const customSizeL = document.getElementById("custom-size-l-input");
const customSizeW = document.getElementById("custom-size-w-input");
const customCountInput = document.getElementById("custom-count-input");
const price = document.getElementById("price");
const button = document.getElementById("btn-order");

button.onclick = () =>
  alert(
    `${activeDpi}, ${activePaper}, ${
      activeSize !== CUSTOM
        ? activeSize
        : customSizeW.value + "*" + customSizeL.value
    }, ${activeCount}`
  );

customSizeW.oninput = () => {
  if (+customSizeW.value > 1000) {
    customSizeW.value = 1000;
  }
  caclulatePrice();
};

customSizeL.oninput = () => {
  if (+customSizeL.value > 5000) {
    customSizeL.value = 5000;
  }
  caclulatePrice();
};

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
      blockCustomSize.style.display = "none";
    }
    activeSize = posterSize[id];
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
      blockCustomCount.style.display = "none";
    }
    caclulatePrice();
  }
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
  // mm to m
  if (activeSize === CUSTOM) {
    return (+customSizeW.value * +customSizeL.value) / (1000 * 1000);
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
      100 - Math.round((item[1] * 100) / discount0) + '%';
  });
  document.getElementById(`discount-custom-count`).innerText =
    100 - Math.round((factor * 100) / discount0) + '%';
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
    renderDiscount(countFactor);
    sum =
      area * activeCount < 0.25
        ? 344
        : Math.ceil(countFactor * activeCount * area * coast1m2);
    price.innerText = `${sum} ₽`;
  }
}
