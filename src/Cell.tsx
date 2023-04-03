import styled, { css } from "styled-components";
import { useMemo, MouseEvent as ReactMouseEvent } from "react";

import { CellProps, CELL_DIM_REM, MINE_CELL_VALUE } from "./globals";

const CellStyle = css`
  box-sizing: border-box;
  display: inline-block;
  font-size: 1rem;
  max-height: ${CELL_DIM_REM}rem;
  max-width: ${CELL_DIM_REM}rem;
  min-height: ${CELL_DIM_REM}rem;
  min-width: ${CELL_DIM_REM}rem;
`;

const HiddenCell = styled.div`
  background-color: #eeeeee;
  border-left: outset white 2px;
  border-top: outset white 2px;
  border-right: inset black 2px;
  border-bottom: inset black 2px;
  ${CellStyle}
`;

const RevealedCell = styled.div`
  border: solid 1px gray;
  ${CellStyle}
`;

const Cell = (props: CellProps) => {
  const revealed = props.state === "revealed";

  const handleReveal = () => {
    props.onStateChange("revealed");
  };

  /**
   * Cycle through states
   * undefined -> flagged -> maybe -> undefined
   */
  const handleFlagToggle = (e: ReactMouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    switch (props.state) {
      case "flagged":
        props.onStateChange("maybe");
        break;
      case "maybe":
        props.onStateChange(undefined);
        break;
      default:
        props.onStateChange("flagged");
    }
  };

  const glyph = useMemo(() => {
    if (props.state === "revealed") {
      if (props.value === MINE_CELL_VALUE) return "\u{1F4A3}";
      return props.value || "";
    }
    if (props.state === "flagged") return "\u2691";
    if (props.state === "maybe") return "?";
    return "";
  }, [props.state, props.value]);

  return revealed ? (
    <RevealedCell>{glyph}</RevealedCell>
  ) : (
    <HiddenCell onClick={handleReveal} onContextMenu={handleFlagToggle}>
      {glyph}
    </HiddenCell>
  );
};

export default Cell;
