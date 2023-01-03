import React from "react";
import { Box, Stack, Chip, Typography } from "@mui/material";
import { dateFormat } from "../lib/dateFormat";
import { AccessTime } from "@mui/icons-material";

interface CardProps {
  date: string;
  name: string;
  family: string;
}

const Card: React.FC<CardProps> = ({ date, name, family }) => {
  return (
    <Stack direction='column' gap={2} alignItems='start'>
      <Chip label={family} />
      <Stack direction='row' gap={1}>
        <AccessTime />
        {dateFormat(date)}
      </Stack>
      <Typography>{name}</Typography>
    </Stack>
  );
};

export default Card;
