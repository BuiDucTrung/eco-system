import { Box } from "@mui/material";
import HeroSection from "./common/home/Hero";
import RecentPosts from "./common/home/RecentPost";
import FeatureWorks from "./common/home/FeatureWorks";

export default function Home() {
  return (
    <Box>
      <HeroSection />
      <RecentPosts />
      <FeatureWorks />
    </Box>
  );
}
