'use client'
import React, {CSSProperties, Fragment, ReactElement, ReactNode, useState} from "react";
import {
  Button,
  Dialog,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput, Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import {BaseGameStatus} from "@/enums/game_status";
import {Game} from "@/types/game";
import {League, LeagueParticipant} from "@/types/league";
import {useLeagueContext} from "@/contexts/league";
import {GameStatusIconItem} from "@/components/league/game_status_icon";
import {GameScore} from "@/components/league/game_score";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

interface LeagueGridProps {
  children: ReactNode
  onClick?: () => void
  sx?: {}
}
export function LeagueGrid(props: LeagueGridProps): ReactElement {
  return <Grid container
               minHeight={64}
               direction="column"
               justifyContent="center"
               alignItems="center"
               onClick={() => props.onClick && props.onClick()}
               sx={props.sx}
  >
    {props.children}
  </Grid>
}

export function FullBorderedGrid({ league }: { league: League }) {
  const cellStyle: CSSProperties = { border: '1px solid #aaa', textAlign: 'center', alignItems: 'center' }
  if (!league.participants) {
    return <Typography variant="h4">Loading boards...</Typography>
  }

  const not_applicable_style = {
    position: 'relative',
    width: '100%',
    height: '100px',
    "&::before": {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `linear-gradient(to bottom left, transparent 49.5%, #aaa 49.5%, #aaa 50.5%, transparent 50.5%)`,
    }
  }

  return (
    <Paper elevation={3}>
    <Grid container border="1px solid #aaa" mt={2}>
      <Grid item xs={12} container>
        <Grid item xs style={cellStyle} sx={not_applicable_style} />
        {
          league.participants.flatMap((participant, i) => {
            return <Grid item xs zeroMinWidth style={cellStyle} key={`c-row1-${i}`}>
              <LeagueGrid key={`row1-${i}`}>
                {participant.player.name}
              </LeagueGrid>
            </Grid>
          })
        }
      </Grid>
      {
        league.participants.flatMap((participant, j) => {
          return (
            <Grid item xs={12} container key={`participant-${j}`}>
              <Grid item xs style={cellStyle} key={`c-row${j}`}>
                <LeagueGrid key={`row${j}`}>
                  {participant.player.name}
                </LeagueGrid>
              </Grid>
              {
                participant.games.map((game, k) => {
                  if (game.status == BaseGameStatus.NOT_APPLICABLE) {
                    return <Grid item xs style={cellStyle}
                                 key={`c-row${j}-${participant.participant_id}-${k}`} sx={not_applicable_style}>
                    </Grid>
                  }
                  return (
                    <Grid item xs style={cellStyle} key={`c-row${j}-${participant.participant_id}-${k}`}>
                      <GameCell key={`row${j}-${participant.participant_id}-${k}`}
                                game={game}
                                participantA={participant}
                                participantB={league.participants[k]}
                      />
                    </Grid>
                  )
                })
              }
            </Grid>
          )
        })
      }
    </Grid>
    </Paper>
  );
}

interface GameCellProps {
  game: Game
  participantA: LeagueParticipant
  participantB: LeagueParticipant
}
export function GameCell(props: GameCellProps) {
  const [open, setOpen] = useState(false)
  const [scoreA, setScoreA] = useState<number | string>('score' in props.game ? props.game.score.a : '')
  const [scoreB, setScoreB] = useState<number | string>('score' in props.game ? props.game.score.b : '')
  const { setScore, setPending } = useLeagueContext()
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleDelete = () => {
    setPending(props.participantA.participant_id, props.participantB.participant_id)
    handleClose()
  }
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const handleSetScoreA = (value: any) => setScoreA(value as number)
  const handleSetScoreB = (value: any) => setScoreB(value as number)
  const handleSubmit = () => {
    console.log('Submitting score: ', props.participantA.participant_id, props.participantB.participant_id, scoreA, scoreB)
    if (scoreA && scoreB) {
      setScore(props.participantA.participant_id, props.participantB.participant_id, scoreA as number, scoreB as number)
    } else {
      setPending(props.participantA.participant_id, props.participantB.participant_id)
    }
    handleClose()
  }

  return (
    <Grid container justifyContent="center" alignItems="center">
      <LeagueGrid onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <GameStatusIconItem status={props.game.status} />
        <Grid item><GameScore game={props.game} /></Grid>
      </LeagueGrid>
      <Dialog onClose={handleClose} open={open}>
        <Grid container p={2} direction={matches ? 'column' : 'row'}>
          <Grid item xs={5}>
            <Typography variant="h4" align="center">{props.participantA.player.name}</Typography>
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
            <CloseIcon />
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h4" align="center">{props.participantB.player.name}</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="center" px={1}>
          <Grid item py={1} sx={{ width: "128px"}}>
            <FormControl>
              <InputLabel htmlFor="component-outlined1">{props.participantA.player.name}</InputLabel>
              <OutlinedInput
                id="component-outlined1"
                label={props.participantA.player.name}
                type="number"
                value={scoreA}
                onChange={e => handleSetScoreA(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item py={1}>
            <CloseIcon />
          </Grid>
          <Grid item py={1} sx={{ width: "128px"}}>
            <FormControl>
              <InputLabel htmlFor="component-outlined2">{props.participantB.player.name}</InputLabel>
              <OutlinedInput
                id="component-outlined2"
                label={props.participantB.player.name}
                type="number"
                value={scoreB}
                onChange={e => handleSetScoreB(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" p={2}>
          <Grid item>
            <Stack direction="row" spacing={4}>
              <Button variant="contained" endIcon={<SendIcon />} onClick={handleSubmit}>Send</Button>
              <Button variant="outlined" onClick={handleClose}>Close</Button>
              <Button variant="outlined" color="error" size="small" onClick={handleDelete}><DeleteIcon fontSize="small" /> Delete</Button>
            </Stack>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  )
}
