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
  custom_size: CUSTOM 
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
