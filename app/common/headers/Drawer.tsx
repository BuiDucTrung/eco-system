"use client";
import { Box, Button, SwipeableDrawer } from "@mui/material";
import { useState, ReactNode } from "react";
import ViewHeadlineRoundedIcon from "@mui/icons-material/ViewHeadlineRounded";

export interface DrawerProps {
  contentHeader: () => ReactNode;
}

type Anchor = "top" | "left" | "bottom" | "right";

export default function Drawer({ contentHeader }: DrawerProps) {
  const [isAnchorActive, setAnchorActive] = useState<boolean>(false);

  const toggleDrawer = () => {
    setAnchorActive((pre) => !pre);
  };

  return (
    <>
      <Button onClick={toggleDrawer}>
        <ViewHeadlineRoundedIcon sx={{ color: "black", fontSize: "large" }} />
      </Button>
      <SwipeableDrawer anchor={"right"} open={isAnchorActive} onClose={toggleDrawer} onOpen={toggleDrawer}>
        {contentHeader()}
      </SwipeableDrawer>
    </>
  );
}
