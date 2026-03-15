import { Board } from "./features/board";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Mini Jira Board</h1>
      </header>

      <main
        className="app__main"
        style={{
          height: "calc(100vh - 80px)",
          maxWidth: "100vw",
          margin: "0 auto",
          padding: "0 var(--space-4)",
        }}
      >
        <Board />
      </main>
    </div>
  );
};

export default App;
