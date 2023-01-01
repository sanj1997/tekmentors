import { Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import AllRoutes from "./Routes/AllRoutes";
function App() {
  return (
    <Box bg="#011627" h={"100vh"}>
      <Navbar/>
      <AllRoutes/>
    </Box>
  );
}

export default App;
