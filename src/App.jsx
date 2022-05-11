import { Box, ChakraProvider, CSSReset } from "@chakra-ui/react";
import Map from "./Map";

export default function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box h="100vh">
        <Map />
      </Box>
    </ChakraProvider>
  );
}
