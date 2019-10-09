const operators = ['+', '-', '*', '/'] as const;
type Operators = (typeof operators)[number];
const operatorPriorityMap = new Map<string, number>([
  ['+', 1],
  ['-', 1],
  ['*', 2],
  ['/', 2],
]);
const operatorFuncMap = new Map<string, (a: number, b: number) => number>([
  ['+', (a, b) => a + b],
  ['-', (a, b) => a - b],
  ['*', (a, b) => a * b],
  ['/', (a, b) => a / b],
]);

/**
 *
 * @param str 中缀表达式
 * 转换为后缀表达式
 * 5 + ((1 + 2) * 4) - 3
 * 5 1 2 + 4 * + 3 -
 */
function convert(str: string): string[] {
  if (!str) {
    return [];
  }
  const operatorList: string[] = [];
  const outputList: string[] = [];
  for (const char of str) {
    if (char !== ' ' && !Number.isNaN(Number(char))) {
      // 数字
      outputList.push(char);
    } else if (char === '(') {
      operatorList.push(char);
    } else if (char === ')') {
      //
      while (operatorList.length > 0) {
        const operator = operatorList.pop();
        if (operator === '(') {
          break;
        }
        outputList.push(operator!);
      }
    } else if (operators.includes(char as Operators)) {
      // } else {
      while (operatorList.length >= 0) {
        const topOperator = operatorList[operatorList.length - 1];
        if (
          operatorList.length === 0 ||
          topOperator === '(' ||
          operatorPriorityMap.get(char)! > operatorPriorityMap.get(topOperator)!
        ) {
          operatorList.push(char);
          break;
        } else {
          outputList.push(operatorList.pop()!);
        }
      }
    }
  }
  while (operatorList.length > 0) {
    outputList.push(operatorList.pop()!);
  }
  return outputList;
}
/**
 *
 * @param rpnList 后缀表达式
 * 后缀表达式求值
 */
function compute(rpnList: string[]): number {
  if (rpnList.length === 0) {
    return 0;
  }
  const tempArr: number[] = [];
  for (const char of rpnList) {
    if (!Number.isNaN(Number(char))) {
      tempArr.push(Number(char));
    } else {
      // 运算符
      const right = tempArr.pop();
      const left = tempArr.pop();

      tempArr.push(operatorFuncMap.get(char)!(left!, right!));
    }
  }

  return Number(tempArr[0].toFixed(3));
}
// test
const rpnList = convert('5 + ((1 + 2) * 4) - 3');
console.log('🤓🤔😓: rpnList', rpnList);
const res = compute(rpnList);
console.log('🤓🤔😓: res', res);
