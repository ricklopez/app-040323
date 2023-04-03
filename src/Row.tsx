import styled from "styled-components";

import Cell from "./Cell";
import { CELL_DIM_REM, RowProps } from "./globals";

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  max-height: ${CELL_DIM_REM}rem;
`;

const Row = (props: RowProps) => {
  return (
    <RowWrapper>
      {props.cells.map((cell, columnIndex) => {
        return (
          <Cell
            {...cell}
            key={`${props.rowIndex}-${columnIndex}`}
            onStateChange={(state) => {
              props.onCellStateChange(props.rowIndex, columnIndex, state);
            }}
          />
        );
      })}
    </RowWrapper>
  );
};

export default Row;
