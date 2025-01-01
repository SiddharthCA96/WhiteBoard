import Board from "./components/Board";
import ToolBar from "./components/Toolbar";
import ToolBox from "./components/Toolbox";
import BoardProvider from "./store/boardProvider";
import ToolBoxProvider from "./store/ToolBoxProvider";

function App() {
  return (
    <>
      <BoardProvider>
        <ToolBoxProvider>
          <>
            <ToolBar />
            <Board />
            <ToolBox />
          </>
        </ToolBoxProvider>
      </BoardProvider>
    </>
  );
}

export default App;
