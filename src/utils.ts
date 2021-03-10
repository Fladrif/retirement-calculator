const TAX_BRACKET = [
  [9_875, 0.1, 0],
  [40_125, 0.12, 9_876],
  [85_525, 0.22, 40_126],
  [163_300, 0.24, 85_526],
  [207_350, 0.32, 163_301],
  [518_400, 0.35, 207_351],
  [Infinity, 0.37, 518_401],
];

export function getPostTaxAnnual(annualTarget: number): number {
  const taxAmount = TAX_BRACKET.reduce((acc, taxB) => {
    if (annualTarget > taxB[0]) return acc + taxB[0] * taxB[1];
    if (annualTarget > taxB[2]) return acc + (annualTarget - taxB[2]) * taxB[1];
    return acc;
  }, 0);

  return annualTarget + taxAmount;
}

export function getAmount(
  base: number,
  initialInput: number,
  inputOverTime: number,
  years: number
): number {
  let total = base;

  for (let i = 0; i < years; i++) {
    total += initialInput;
    total = totalOverTime(total, inputOverTime);
  }

  return total;
}

export function getYears(
  base: number,
  initialInput: number,
  inputOverTime: number,
  target: number
): number {
  let total = base;
  let counter = 0;

  while (total < target) {
    total += initialInput;
    total = totalOverTime(total, inputOverTime);

    counter++;
  }

  return counter;
}

export function getTarget(goal: number): number {
  return goal / 0.04;
}

function totalOverTime(base: number, input: number): number {
  const amortisedInput = input / 12;
  let total = base;

  for (let i = 0; i < 12; i++) {
    total = (total + amortisedInput) * 1.0058;
  }

  return total;
}
