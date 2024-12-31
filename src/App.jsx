import Board from "./components/Board";
import ToolBar from "./components/Toolbar";

function App() {
  return (
    <boardProvider>
      <>
        <ToolBar />
        <Board />
      </>
    </boardProvider>
  );
}

export default App;
