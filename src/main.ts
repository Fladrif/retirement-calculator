import { argv } from 'yargs';

function main() {
  const base = argv.base;
  const initialInput = argv.initialInput;
  const inputOverTime = argv.inputOverTime;
  const yearlyGoal = argv.yearlyGoal;
  const target = getTarget(yearlyGoal);

  let total = base;
  let counter = 0;

  while(total < target) {
    total += initialInput;
    total = totalOverTime(total, inputOverTime);

    counter++;
  }
  console.log('Years to goal:', counter);
  console.log(`Total after ${counter} years`, total, '/', target);
}

function totalOverTime(base: number, input: number): number {
  const amortisedInput = input / 12;
  let total = base;

  for (let i = 0; i < 12; i++) {
    total = (total + amortisedInput) * 1.0058;
  }

  return total;
}

function getTarget(goal: number): number {
  return goal / 0.04;
}

main();
