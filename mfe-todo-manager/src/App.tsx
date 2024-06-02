import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import CreateTaskPage from "./pages/CreateTaskPage.tsx";
import EditTaskPage from "./pages/EditTaskPage.tsx";

function App() {
  return (
    <MemoryRouter basename="/">
      <Routes>
        <Route path="/" element={<CreateTaskPage/>} />
        <Route path="/edit/:id" element={<EditTaskPage/>} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;