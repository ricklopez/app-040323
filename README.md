# Minesweeper Coding Challenge

This project represents a clone of the popular game Minesweeper. If you are unfamiliar with the game, it consists of a board of cells. Each cell contains either a mine, the number of cells adjacent to it that contain mines, or is empty. The goal of the game is to reveal all of the cells that do not contain mines. A player loses immediately upon revealing a cell that contains a mine.

In this implementation, each cell can have one of four states -

1. empty (no action taken on the cell yet)
2. "revealed" the user has clicked on the cell and revealed its contents
3. "flagged" the user has flagged the cell as a mine
4. "maybe" the user has marked it as possibly being a mine, but isn't sure

Only the "revealed" state has an impact on whether the user has won or lost the game.

Each cell also has a value, which is either MINE_CELL_VALUE if it is a mine, EMPTY_CELL_VALUE if it is empty, or the number of mines immediately adjacent to the cell.

The game implementation is mostly complete, but a few items need to be implemented, all can be found in `Board.tsx` and are marked with TODO comments:

- The function that places mines on the board
- A function that applies an action to cells adjacent to a provided one, where "adjacent" includes the immediate neighbors up, down, left, right, and diagonally
- Updating of win/loss status after each action

## Running the game

The game can be run by opening a terminal in the directory containing this README and using the command `yarn install` to install dependencies, then `yarn start` to start the game. Your browser should automatically launch, pointed at `http://localhost:8080` to access the game.
