import Typography from "@mui/material/Typography";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Typography variant="h3"><Link href="/league/new">Create a new league</Link></Typography>
    </>
  )
}
