import React from "react";
import { motion } from "framer-motion";
import { MusicHeader } from "./MusicHeader";
import { Lyrics } from "./Lyrics";

function LyricsSection() {
  return (
    <>
      <MusicHeader />
      <Lyrics />
    </>
  );
}

export default LyricsSection;
