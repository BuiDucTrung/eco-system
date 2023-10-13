import { Box } from "@mui/material";
import HeroSection from "./common/home/Hero";
import RecentPosts from "./common/home/RecentPost";
import FeatureWorks from "./common/home/FeatureWorks";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soulmate",
  description: "Nothing but Moon",
  creator: "Troy",
  publisher: "Troy",
  authors: [{ name: "Troy" }, { name: "Moon" }],
  keywords: ["soulmate", "Moon", "spirit", "smile"],
  referrer: "origin-when-cross-origin",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  openGraph: {
    title: "Soulmate",
    description: "Nothing but Moon",
    url: "https://eco-system-sigma.vercel.app/",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
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
