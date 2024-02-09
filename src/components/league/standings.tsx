import {League, LeagueParticipant} from "@/types/league";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {GameResultStatus} from "@/enums/game_status";
import {analyzeGames} from "@/lib/generate_matches";

interface RankedParticipantsMap {
  [rank: number]: LeagueParticipant[];
}

function createRankedParticipantsMap(participants: LeagueParticipant[]): RankedParticipantsMap {
  const sortedParticipants = [...participants].sort((a, b) => b.points - a.points);
  const rankedParticipantsMap: RankedParticipantsMap = {};

  sortedParticipants.forEach((participant, index, array) => {
    const rank = index === 0 || participant.points < array[index - 1].points ? index + 1 : array[index - 1].rank || 1;
    participant.rank = rank;

    if (!rankedParticipantsMap[rank]) {
      rankedParticipantsMap[rank] = [participant];
    } else {
      rankedParticipantsMap[rank].push(participant);
    }
  });

  return rankedParticipantsMap;
}

export function Standings({ league }: { league: League }) {
  const [standings, setStandings] = useState<RankedParticipantsMap | undefined>()
  useEffect(() => {
    console.log('useEffect', league)
    if (!league.participants) {
      return
    }
    league.participants.forEach(participant => {
      participant.points = 0
      participant.games.forEach(game => {
        switch (game.status) {
          case GameResultStatus.WON:
            participant.points += 2
            break
          case GameResultStatus.DRAW:
            participant.points += 1
            break
        }
      })
    })
    setStandings(prev => { return createRankedParticipantsMap(league.participants) })
  }, [league])

  if (!league.participants) {
    return <Typography variant="h4">Loading league...</Typography>
  }

  if (!standings) {
    return <Typography variant="h4">Calculating standings...</Typography>
  }

  // const standings = createRankedParticipantsMap(league.participants)
  console.log('standings', standings)
  return (
    <Grid container direction="column" pt={2}>
      <Grid item>
        <Typography variant="h4">Standings</Typography>
      </Grid>
      <Grid item pt={2}>
        <TableContainer sx={{ maxWidth: "640px" }} component={Paper} elevation={3}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Won</TableCell>
                <TableCell align="right">Lose</TableCell>
                <TableCell align="right">Draw</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              Object.entries(standings).map(([rank, participants]) => {
                return participants.map((participant: LeagueParticipant) => {
                  const [won, lose, draw, winScore, loseScore] = analyzeGames(participant.games)
                  console.log('winScore', winScore, 'loseScore', loseScore)
                  return <TableRow key={participant.participant_id}>
                    <TableCell align="right"><Typography variant="h6">{rank}</Typography></TableCell>
                    <TableCell component="th" scope="row"><Typography variant="h6">{participant.player.name}</Typography></TableCell>
                    <TableCell align="right">{participant.points}</TableCell>
                    <TableCell align="right">{won}</TableCell>
                    <TableCell align="right">{lose}</TableCell>
                    <TableCell align="right">{draw}</TableCell>
                    <TableCell align="right">{`${winScore} - ${loseScore}`}</TableCell>
                  </TableRow>
                })
              })
            }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

