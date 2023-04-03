export const CELL_DIM_REM = 1.5;
export const EMPTY_CELL_VALUE = 0;
export const MINE_CELL_VALUE = -1;

export type applyToCellFn = (row: number, col: number) => void;
export type cellStateChangeFn = (
  row: number,
  col: number,
  newState: CellState
) => void;

// A 2-dimensional array representing the current state of the minesweeper board
// The first dimension indexes by row, the second by column
export type BoardState = CellProps[][];

export type BoardProps = {
  numColumns: number;
  numMines: number;
  numRows: number;
};

export type CellState = "flagged" | "maybe" | "revealed" | undefined;

export type CellProps = {
  onStateChange: (newState: CellState) => void;
  state: CellState;
  value: number;
};

export type RowProps = {
  cells: CellProps[];
  onCellStateChange: cellStateChangeFn;
  rowIndex: number;
};

export function shuffleArray(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
