import { AppShell, Box } from "@mantine/core";
import { ToolBar } from "./ui";

function App() {
  return (
    <Box>
      <AppShell header={<ToolBar />}>Hello</AppShell>
    </Box>
  );
}
export default App;
