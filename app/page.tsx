import { Box } from "@mui/material";
import HeroSection from "./common/home/Hero";
import RecentPosts from "./common/home/RecentPost";
import FeatureWorks from "./common/home/FeatureWorks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Nothing but ramble",
  creator: "Troy",
  publisher: "Troy",
  authors: [{ name: "Troy" }],
  keywords: ["blog", "daily"],
  referrer: "origin-when-cross-origin",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Rambly blogs",
    description: "Nothing but ramble",
    url: "https://eco-system-sigma.vercel.app/",
  },
};

export default function Home() {
  return (
    <Box>
      <HeroSection />
      <RecentPosts />
      <FeatureWorks />
    </Box>
  );
}
