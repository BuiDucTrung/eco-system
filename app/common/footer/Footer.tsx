import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import { Box, Icon, Stack, Typography } from "@mui/material";
import * as React from "react";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  const socialLinks = [
    {
      icon: Facebook,
      url: "https://google.com.vn",
    },
    {
      icon: Instagram,
      url: "https://google.com.vn",
    },
    {
      icon: Twitter,
      url: "https://google.com.vn",
    },
    {
      icon: LinkedIn,
      url: "https://google.com.vn",
    },
  ];
  return (
    <Box component={"footer"} py={2} textAlign={"center"}>
      <Stack direction={"row"} justifyContent={"center"}>
        {socialLinks.map((social, id) => (
          <Box key={`${id} social`} component={"a"} target="_blank" href={social.url} p={1} rel="nooppener noreferrer" color={"black"}>
            <Icon component={social.icon} fontSize="large" sx={{ fontSize: 48 }} />
          </Box>
        ))}
      </Stack>
      <Typography>Copyright ©{new Date().getFullYear()} All rights reserved</Typography>
    </Box>
  );
}
