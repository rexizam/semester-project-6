const getMaxItemsAmountPerRow = (rowWidth: number, itemWidth: number) => {
  return Math.max(Math.floor(rowWidth / itemWidth), 1);
}

export const generateIndexesForRow = (rowIndex: number, rowWidth: number, itemWidth: number, itemsAmount: number) => {
  const result = [];
  const maxItemsPerRow = getMaxItemsAmountPerRow(rowWidth, itemWidth);
  const startIndex = rowIndex * maxItemsPerRow;

  for (
    let i = startIndex;
    i < Math.min(startIndex + maxItemsPerRow, itemsAmount);
    i++
  ) {
    result.push(i);
  }

  return result;
}

export const getRowsAmount = (rowWidth: number, itemWidth: number, itemsAmount: number, hasMore: boolean) => {
  const maxItemsPerRow = getMaxItemsAmountPerRow(rowWidth, itemWidth);
  return Math.ceil(itemsAmount / maxItemsPerRow) + (hasMore ? 1 : 0);
}