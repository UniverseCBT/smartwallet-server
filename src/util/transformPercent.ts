export function transformPercent(
  currentValue: number,
  totalPercent: number,
): number {
  const getExtendPercent = (currentValue * 100) / totalPercent;

  const [percent, decimal] = getExtendPercent.toString().split('.');
  const getStartTwoNumbers = decimal ? decimal.slice(0, 2) : '0';

  const concat = `${percent}.${getStartTwoNumbers}`;
  const percentResult = Number(concat);

  return percentResult;
}
