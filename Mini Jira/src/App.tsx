import { useEffect } from "react";
import { Board } from "./features/board";
import { storageStatus } from "./storage/taskStorage";
import { useToast } from "./components/ui/Toast/ToastProvider";
import "./App.css";

const App = () => {
  const { addToast } = useToast();

  useEffect(() => {
    if (storageStatus.hasError) {
      addToast(
        "error",
        "Unable to access local storage or data corrupted. Tasks may not persist.",
      );
    }
    
    if (storageStatus.migrated) {
      addToast(
        "info",
        "Stored data was upgraded to the latest version.",
      );
    }
  }, []);

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
