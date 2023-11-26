"use client";
import { Box, Button, CircularProgress, Container, LinearProgress, Modal, Stack, Typography } from "@mui/material";
import Image from "next/legacy/image";
import { useEffect, useRef, useState } from "react";
import miku from "@/public/images/miku.webp";
import asa from "@/public/images/asa.gif";

export interface IMoonProps {}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Moon(props: IMoonProps) {
  const [positionDontChoose, setPositionDontChoose] = useState({
    x: -1000,
    y: -1000,
  });
  const [times, setTimes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoveMe, setIsLoveMe] = useState(false);
  const refDontChoose = useRef<any>();

  useEffect(() => {
    setPositionDontChoose(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 + 40 }));
    setIsLoading(() => false);
  }, []);

  const handleMouseEnter = (isMouseEnter?: boolean) => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    const left = x > window.innerWidth / 2 ? x - refDontChoose.current.getBoundingClientRect().width : x + refDontChoose.current.getBoundingClientRect().width;
    const top = y > window.innerHeight / 2 ? y - refDontChoose.current.getBoundingClientRect().height : y;
    isMouseEnter && setTimes((pre) => pre + 1);
    setPositionDontChoose(() => ({ x: left, y: top }));
  };

  const handletoLoveMe = () => {
    localStorage.setItem("times", times.toString());
    setIsLoveMe(true);
    setPositionDontChoose(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 + 40 }));
  };
  return (
    <>
      {isLoading ? (
        <Stack
          sx={{ position: "fixed", color: "red" }}
          width={"100%"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          direction={"column"}
          spacing={2}
        >
          <CircularProgress color="primary" />
          <CircularProgress color="secondary" />
          <CircularProgress color="inherit" />
        </Stack>
      ) : (
        <Box sx={{ position: "fixed", zIndex: 10, top: 0, left: 0, right: 0, bottom: 0 }}>
          <Box display={"flex"} justifyContent={"center"}>
            <Image src={miku} layout="fixed" alt="miku" priority />
          </Box>
          <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} mt={"70px"}>
            <Button variant="contained" onClick={handletoLoveMe}>
              Moon love me
            </Button>
          </Stack>

          <Button
            variant="contained"
            ref={refDontChoose}
            onMouseEnter={() => handleMouseEnter(true)}
            onMouseMove={() => handleMouseEnter(false)}
            sx={{ left: positionDontChoose.x, top: positionDontChoose.y, position: "absolute", transform: `translate(-50%, 0)` }}
          >{`Moon doesn't love me`}</Button>

          <Stack textAlign={"center"}>
            <Typography mt={"20px"}>{`Remind u: Don't choose option "don't love me" ${times} times`}</Typography>
          </Stack>
        </Box>
      )}

      <Modal
        open={isLoveMe}
        onClose={() => {
          setIsLoveMe(false);
          setTimes(0);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={{ ...style }} direction={"column"} justifyContent={"center"} alignItems={"center"} borderRadius={"10px"}>
          <Image src={asa} layout="fixed" alt="miku" priority />
          <Typography variant="h6" component="h5" textAlign={"center"} fontWeight={"normal"}>
            {`Thank you because of u love me, when u are reading these words, i'm so glad. Hope u have a nice day and have 10 out of 10 mark, that is fantasic like the face of my lover.`}
          </Typography>
        </Stack>
      </Modal>
    </>
  );
}
