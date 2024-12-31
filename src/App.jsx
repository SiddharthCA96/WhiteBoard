import Board from "./components/Board";
import ToolBar from "./components/Toolbar";
import BoardProvider from "./store/boardProvider";

function App() {
  return (
    <BoardProvider>
      <>
        <ToolBar />
        <Board />
      </>
    </BoardProvider>
  );
}

export default App;
