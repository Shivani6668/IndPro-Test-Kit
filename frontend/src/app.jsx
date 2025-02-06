import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";
import Main from "./pages/Main"; // Root component (Main page)
import Dashboard from "./pages/Dashboard"; // Dashboard (Welcome page)
import TaskList from "./components/TaskList"; // TaskList component
import Home from "./pages/Home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
           <Route path="/" element={<Main />} />
          
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/list" element={<Dashboard />}>
            <Route index element={<TaskList />} />
          </Route>
          
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
