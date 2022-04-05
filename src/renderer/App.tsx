import { Box } from "@mantine/core";
import { Home, StatusBar, ToolBar } from "./ui";
import {
  createBrowserHistory,
  Router,
  ReactLocation,
  Route,
} from "@tanstack/react-location";

const history = createBrowserHistory();

const location = new ReactLocation({ history });

const routes: Route[] = [
  {
    path: "/",
    element: <Home />,
  },
];

function App() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ToolBar />
      <Box sx={{ flexGrow: 1 }}>
        <Router location={location} routes={routes}></Router>
      </Box>
      <StatusBar />
    </Box>
  );
}
export default App;
