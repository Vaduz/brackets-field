import React from "react";
import {LeagueContextProvider} from "@/contexts/league";
import {League} from "@/components/league/league";

export default function Home() {
  return (
    <LeagueContextProvider>
      <League/>
    </LeagueContextProvider>
  )
}
