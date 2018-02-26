# Retirement Calculator
Takes a simple starting amount and an annual addition to calculate years to retirement.
Will compound the total by 7% a year assuming an investment in a low cost index fund.

## To Run
```
npm install
npm run build
node lib/main.js [--base <num> [ --initialInput <num> [ --inputOverTime <num>]]] [--target <num> | --yearlyGoal <num>]
```
#### Example
```
node lib/main.js --base 70 --initialInput 5.5 --inputOverTime 19.3 --yearlyGoal 40
```
