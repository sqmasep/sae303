import React from "react";
import { Box, Stack, Chip, Typography, Paper } from "@mui/material";
import { dateFormat } from "../lib/dateFormat";
import { AccessTime } from "@mui/icons-material";
import { motion } from "framer-motion";

interface CardProps {
  date: string;
  name: string;
  family: string;
}

const MotionPaper = motion(Paper);

const Card: React.FC<
  CardProps &
    Omit<React.ComponentProps<typeof Stack>, "alignItems" | "gap" | "direction">
> = ({ date, name, family, ...props }) => {
  return (
    <MotionPaper
      elevation={4}
      whileHover={{ scale: 1.1 }}
      whileTap={{ y: 5 }}
      sx={{ p: 4 }}
    >
      <Stack direction='column' gap={1} alignItems='start' {...props}>
        <Chip label={family} size='small' />
        <Stack direction='row' gap={0.33}>
          <AccessTime fontSize='small' />
          <Typography variant='subtitle2'>{dateFormat(date)}</Typography>
        </Stack>
        <Typography mt={1} variant='h6' fontWeight={700} component='h2'>
          {name}
        </Typography>
      </Stack>
    </MotionPaper>
  );
};

export default Card;
