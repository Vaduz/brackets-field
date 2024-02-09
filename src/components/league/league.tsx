'use client'
import React, {useEffect} from "react";
import {Container, Typography} from "@mui/material";
import {useLeagueContext} from "@/contexts/league";
import {GameResult} from "@/models/game_result";
import {League} from "@/types/league";
import {FullBorderedGrid} from "@/components/league/full_bordered_grid";
import {MatchOrder} from "@/components/league/match_order";
import {Standings} from "@/components/league/standings";

export const testLeague: League = {
  name: "Myosyo Crab League",
  participants: [
    {
      participant_id: 1,
      player: {
        // id: 1,
        name: "Player 1",
      },
      games: [
        { status: -1 },
        { status: 0 },
        new GameResult(3, 2),
        { status: 0 },
        { status: 0 },
      ],
      points: 3,
    },
    {
      participant_id: 2,
      player: {
        // id: 2,
        name: "Player 2",
      },
      games: [
        { status: 0 },
        { status: -1 },
        new GameResult(3, 1),
        { status: 0 },
        { status: 0 },
      ],
      points: 3,
    },
    {
      participant_id: 3,
      player: {
        // id: 3,
        name: "Player 3",
      },
      games: [
        new GameResult(2, 3),
        new GameResult(1, 3),
        { status: -1 },
        { status: 0 },
        { status: 0 },
      ],
      points: 0,
    },
    {
      participant_id: 4,
      player: {
        // id: 4,
        name: "Player 4",
      },
      games: [
        { status: 0 },
        { status: 0 },
        { status: 0 },
        { status: -1 },
        new GameResult(2, 2),
      ],
      points: 1,
    },
    {
      participant_id: 5,
      player: {
        // id: 5,
        name: "Player 5",
      },
      games: [
        { status: 0 },
        { status: 0 },
        { status: 0 },
        new GameResult(2, 2),
        { status: -1 },
      ],
      points: 1,
    },
  ]
}

export function League() {
  const { league, setLeague } = useLeagueContext()
  useEffect(() => {
    setLeague(testLeague)
  }, [league, setLeague])
  return (
    <Container maxWidth="xl">
      <Typography variant="h1" align="center">{league.name}</Typography>
      <FullBorderedGrid league={league} />
      <MatchOrder league={league} />
      <Standings league={league} />
    </Container>
  )
}

