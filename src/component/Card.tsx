import React from "react";
import { Box, Stack, Chip, Typography, Paper } from "@mui/material";
import { dateFormat } from "../lib/dateFormat";
import { AccessTime } from "@mui/icons-material";
import { motion } from "framer-motion";
import { styled, type StackProps } from "@mui/system";

interface CardProps {
  name: string;
}

const MotionPaper = motion(Paper);

const Card: React.FC<CardProps & React.ComponentProps<typeof MotionPaper>> = ({
  name,
  ...props
}) => {
  return (
    <MotionPaper elevation={2} sx={{ p: 4, cursor: "pointer" }} {...props}>
      <Typography mt={1} variant='h6' fontWeight={700} component='h2'>
        {name}
      </Typography>
    </MotionPaper>
  );
};

export default Card;
