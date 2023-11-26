import { Box, Stack } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./common/footer/Footer";
import Header from "./common/headers/Header";
import "./layout.css";
import { SWRProvider } from "./swr/SwrProvide";
import ThemeRegistry from "./theme/ThemeRegistry";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <SWRProvider>
            <Stack minHeight={"100vh"}>
              {/* <Header /> */}
              <Box component={"main"} flexGrow={1}>
                {props.children}
              </Box>
              {/* <Footer /> */}
            </Stack>
            <ToastContainer />
          </SWRProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
