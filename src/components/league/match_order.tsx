import {League, LeagueParticipant} from "@/types/league";
import {Box, Button, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import {generateMatchesAvoidingConsecutiveParticipation} from "@/lib/generate_matches";
import CheckIcon from '@mui/icons-material/Check';

function extractFinishedMatchStrings(participants: LeagueParticipant[]): Set<string> {
  const matchSet = new Set<string>();
  participants.forEach(participant => {
    participant.games.forEach((game, i) => {
      if (game.status > 0) {
        matchSet.add(`${participant.participant_id}-${i + 1}`)
        matchSet.add(`${i + 1}-${participant.participant_id}`)
      }
    });
  });
  return matchSet;
}

export function MatchOrder({ league }: { league: League }) {
  if (!league.participants) {
    return <Typography variant="h4">Loading pending matches...</Typography>
  }

  const matches = generateMatchesAvoidingConsecutiveParticipation(league.participants.length)
  const played_matches = extractFinishedMatchStrings(league.participants)
  const playerNameMap: Map<Number, string> = new Map()
  league.participants.forEach(p => playerNameMap.set(p.participant_id, p.player.name))
  // console.log('played_matches', played_matches)
  const chip = function(match: string) {
    const [playerA, playerB] = match.split('-').map(Number)
    if (played_matches.has(match)) {
      // return <Button variant="outlined" color="success" startIcon={<CheckIcon />}>
      //   {`${playerNameMap.get(playerA)}`} vs {`${playerNameMap.get(playerB)}`}
      // </Button>
      return <></>
    } else {
      return <Box key={`chip-box-${match}`} p={1}>
        <Button variant="contained">
          {`${playerNameMap.get(playerA)}`} vs {`${playerNameMap.get(playerB)}`}
        </Button>
      </Box>
    }
  }

  return (
    <Grid container direction="column" pt={2}>
      <Grid item>
        <Typography variant="h4">Match Order</Typography>
      </Grid>
      <Grid item pt={2} direction="row">
        <Stack direction="row" flexWrap="wrap">
          { matches.map(match => chip(match)) }
        </Stack>
      </Grid>
    </Grid>
  )
}
