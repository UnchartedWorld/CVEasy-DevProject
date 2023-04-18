import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Hero from "components/Hero";
import Features from "components/Features";
import { brandPrimary } from "CustomColors";
import InterestedComponent from "components/InterestedComponent";

export default function Landing() {
  return (
    <Box component={"main"}>
      <Hero />
      <Features />
      <InterestedComponent />
    </Box>
  );
}
