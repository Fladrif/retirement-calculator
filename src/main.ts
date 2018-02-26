import { argv } from 'yargs';

function main() {
  const base = argv.base || 0;
  const initialInput = argv.initialInput || 0;
  const inputOverTime = argv.inputOverTime || 0;
  const yearlyGoal = argv.yearlyGoal;

  let target;
  let years;

  if (yearlyGoal) {
    target = getTarget(yearlyGoal);
  } else if (argv.target) {
    target = argv.target;
  } else if (argv.years) {
    years = argv.years
  } else {
    console.log('Include either --target, --yearlyGoal, or --years');
    return;
  }


  if (target) {
    console.log('Years to goal:', getYears(base, initialInput, inputOverTime, target));
  } else if (years) {
    console.log(`Total after ${years} years: `, getAmount(base, initialInput, inputOverTime, years));
  }
}

function totalOverTime(base: number, input: number): number {
  const amortisedInput = input / 12;
  let total = base;

  for (let i = 0; i < 12; i++) {
    total = (total + amortisedInput) * 1.0058;
  }

  return total;
}

function getAmount(base: number, initialInput: number, inputOverTime: number, years: number): number {
  let total = base;

  for (let i = 0; i < years; i++) {
    total += initialInput;
    total = totalOverTime(total, inputOverTime);
  }

  return total;
}

function getYears(base: number, initialInput: number, inputOverTime: number, target: number): number {
  let total = base;
  let counter = 0;

  while(total < target) {
    total += initialInput;
    total = totalOverTime(total, inputOverTime);

    counter++;
  }

  return counter;
}

function getTarget(goal: number): number {
  return goal / 0.04;
}

main();
