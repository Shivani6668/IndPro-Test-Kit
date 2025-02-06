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
          {/* Route for the Main page (root /) */}
          <Route path="/" element={<Main />} />
          
          {/* Route for the Dashboard page (Welcome message with sidebar and navbar) */}
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Default content when /dashboard is accessed */}
            <Route index element={<Home />} />
          </Route>

          {/* Route for the TaskList page (sidebar and navbar with task list) */}
          <Route path="/list" element={<Dashboard />}>
            {/* Content rendered for the /list route */}
            <Route index element={<TaskList />} />
          </Route>
          
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
