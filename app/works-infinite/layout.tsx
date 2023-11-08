import { Box } from "@mui/material";

export const metadata = {
  title: "Works",
  openGraph: {
    title: "Works",
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box component={"main"} flexGrow={1}>
      {children}
    </Box>
  );
}
