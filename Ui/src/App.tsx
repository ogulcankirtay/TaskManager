import { LoadingProvider } from "./providers/LoadingProvider";
import { ToastProvider } from "./providers/ToastProvider";
import { Loading } from "./components/Loading";
import { TaskPage } from "./pages/TaskPage";

function App() {
  return (
    <LoadingProvider>
      <ToastProvider>
        <Loading />
        <TaskPage />
      </ToastProvider>
    </LoadingProvider>
  );
}

export default App;
