import Board from "./Board";

function App() {
  return (
    <div style={{ paddingTop: "1rem", textAlign: "center" }}>
      <Board numColumns={20} numRows={20} numMines={50} />
    </div>
  );
}

export default App;
