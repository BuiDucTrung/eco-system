import { Box, Button, Container, Stack, Typography } from "@mui/material";
import * as React from "react";
import avatar from "@/public/images/avatar.png";
import Image from "next/image";
export interface IHeroSectionProps {}

export default function HeroSection(props: IHeroSectionProps) {
  return (
    <Box component={"section"} pt={{ xs: 4, md: 18 }} pb={{ xs: 7, md: 9 }}>
      <Container>
        <Stack
          direction={{ md: "row", xs: "column" }}
          alignItems={{ xs: "center", md: "flex-start" }}
          flexDirection={{ xs: "column-reverse", md: "row" }}
          spacing={8}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Box>
            <Typography component={"h1"} variant="h3" fontWeight={"bold"} mb={{ xs: 2.5, md: 5 }}>
              Hi im John, <br /> Creative Technologist
            </Typography>
            <Typography variant="body1" mb={{ xs: 2.5, md: 5 }}>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it
              over 2000 years old. Richard McClintock
            </Typography>
            <Button variant="contained" size="large">
              Download Resume
            </Button>
          </Box>
          <Box sx={{ minWidth: "240px", boxShadow: "-5px 13px 10px", color: "secondary.light", borderRadius: "50%" }}>
            <Image src={avatar} layout="responsive" alt="avatar" />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}