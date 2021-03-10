import { argv } from "yargs";
import { getPostTaxAnnual, getAmount, getYears, getTarget } from "./utils";

function main() {
  const base = argv.base || 0;
  const initialInput = argv.initialInput || 0;
  const inputOverTime = argv.inputOverTime || 0;
  const yearlyGoal = argv.yearlyGoal;
  const monthlyGoal = argv.monthlyGoal;

  let target;
  let years;

  if (yearlyGoal) {
    const preTaxAnnual = getPostTaxAnnual(yearlyGoal);
    target = getTarget(preTaxAnnual);
  } else if (monthlyGoal) {
    const annual = monthlyGoal * 12;
    const preTaxAnnual = getPostTaxAnnual(annual);
    target = getTarget(preTaxAnnual);
  } else if (argv.target) {
    target = argv.target;
  } else if (argv.years) {
    years = argv.years;
  } else {
    console.log(
      "Include either --target, --yearlyGoal, --monthlyGoal, or --years"
    );
    return;
  }

  if (target) {
    console.log(
      "Years to goal:",
      getYears(base, initialInput, inputOverTime, target)
    );
  } else if (years) {
    console.log(
      `Total after ${years} years: `,
      getAmount(base, initialInput, inputOverTime, years)
    );
  }
}

main();
