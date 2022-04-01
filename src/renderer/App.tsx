import { Box } from "@mantine/core";
import { Home, StatusBar, ToolBar } from "./ui";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ToolBar />
      <Box sx={{ flexGrow: 1 }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </Box>
      <StatusBar />
    </Box>
  );
}
export default App;
