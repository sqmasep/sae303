import { CircularProgress, Typography } from "@mui/material";
import { Stack, type StackProps } from "@mui/system";
import React from "react";

const Loading: React.FC<StackProps> = ({ ...props }) => {
  return (
    <Stack {...props} direction='column' gap={2} alignItems='center'>
      <CircularProgress />
      <Typography>Chargement...</Typography>
    </Stack>
  );
};

export default Loading;
