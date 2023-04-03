import produce from "immer";
import styled from "styled-components";
import { useEffect, useState } from "react";

import {
  CELL_DIM_REM,
  EMPTY_CELL_VALUE,
  MINE_CELL_VALUE,
  applyToCellFn,
  BoardState,
  BoardProps,
  CellProps,
  CellState,
  cellStateChangeFn,
  shuffleArray,
} from "./globals";
import Row from "./Row";

const BoardWrapper = styled.div<{ numColumns: number }>`
  background-color: #cccccc;
  border: ridge lightgray 3px;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: ${(props) => props.numColumns * CELL_DIM_REM}rem;
`;

/**
 * Apply the function fn to cells adjacent to the one at the specified row+col
 */
function applyToAdjacentCells(
  board: BoardState,
  row: number,
  col: number,
  fn: applyToCellFn
) {
  /* TODO
    Given the row index and col index of a cell, call fn(rowIndex, columnIndex) for each cell adjacent to it
  */
}

/**
 * Creates a flattened (1-dimensional) representation of mine locations on the board
 * @returns Array containing a flat representation of mine locations
 */
function getMineLocations({
  numColumns,
  numMines,
  numRows,
}: {
  numColumns: number;
  numMines: number;
  numRows: number;
}): number[] {
  return shuffleArray(Array.from(Array(numColumns * numRows).keys())).slice(
    0,
    numMines
  );
}

/**
 * Given a flat (1-dimensional) array of mine locations, place the mines on the board
 * Increase the mine count in adjacent cells for each mine placed
 */
function placeMines(
  board: BoardState,
  mineLocations: number[],
  numColumns: number
) {
  /**
   * TODO: Given the flat array of mine locations, place the mines on `board`
   * The array is laid out in row-major order (all of first row, followed by second, etc.)
   * A mine can be denoted by setting the value of a cell to MINE_CELL_VALUE
   * The applyToAdjacentCells function should be used to increase the count of each cell adjacent to a mine (unless the adjacent cell is a mine)
   */
}

function createEmptyBoard(numRows: number, numColumns: number): BoardState {
  function createEmptyCell(): CellProps {
    return { value: EMPTY_CELL_VALUE } as any as CellProps;
  }

  const board: BoardState = [];
  for (let i = 0; i < numRows; i++) {
    board.push(Array.from({ length: numColumns }, createEmptyCell));
  }
  return board;
}

const Board = ({ numColumns, numMines, numRows }: BoardProps) => {
  const [board, setBoard] = useState<BoardState>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (board) return;
    if (
      typeof numColumns !== "number" ||
      typeof numRows !== "number" ||
      numColumns < 0 ||
      numRows < 0
    ) {
      setError(`Invalid dimensions ${numRows}x${numColumns}`);
      return;
    }

    const mineLocations = getMineLocations({ numColumns, numMines, numRows });
    const initialBoard: BoardState = createEmptyBoard(numRows, numColumns);
    placeMines(initialBoard, mineLocations, numColumns);
    setBoard(initialBoard);
  }, [board]);

  /**
   * If a cell's state is "revealed", it means that the user has clicked and revealed its value.
   * If a cell's value is MINE_CELL_VALUE, it contains a mine.
   * A user has lost if any cell containing a mine has been revealed.
   * A user has won if all cells are either mines or have been revealed.
   */

  const won = false; // TODO: Assign to true if player has won, false otherwise

  const lost = false; // TODO: Assign to false if player has lost, false otherwise

  useEffect(() => {
    const winLoseStatus = lost ? "lose" : won ? "win" : undefined;
    if (winLoseStatus) {
      setTimeout(() => alert(`You ${winLoseStatus}!`));
    }
  }, [won, lost]);

  const handleCellStateChange: cellStateChangeFn = (
    row,
    col,
    newState: CellState
  ) => {
    const innerHandleCellStateChange = (draftBoard: BoardState) => {
      const revealCell = (row: number, col: number) => {
        if (col < 0 || row < 0 || col >= numColumns || row >= numRows) return;
        if (draftBoard[row][col].state === newState) return;
        draftBoard[row][col].state = newState;
        if (
          draftBoard[row][col].value === EMPTY_CELL_VALUE &&
          newState === "revealed"
        ) {
          applyToAdjacentCells(draftBoard, row, col, revealCell);
        }
      };
      revealCell(row, col);
    };

    if (won || lost) return;
    setBoard((currentBoard) =>
      produce(currentBoard, (draftBoard: BoardState) => {
        innerHandleCellStateChange(draftBoard);
      })
    );
  };

  const reset = () => setBoard(undefined);

  return board ? (
    <div>
      <BoardWrapper numColumns={numColumns}>
        {board.map((row, index) => (
          <Row
            cells={row}
            key={`${index}`}
            onCellStateChange={handleCellStateChange}
            rowIndex={index}
          />
        ))}
      </BoardWrapper>
      <button onClick={reset} style={{ marginTop: "0.5rem" }}>
        Reset
      </button>
    </div>
  ) : (
    <div>{error}</div>
  );
};

export default Board;
