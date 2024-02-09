import {Game} from "@/types/game";
import {GameResultStatus} from "@/enums/game_status";
import {Chip} from "@mui/material";
import React from "react";

export function GameScore({game}: {game: Game}) {
  if (!('score' in game)) {
    return <></>
  }

  const gameScore = `${game.score.a} - ${game.score.b}`

  switch (game.status) {
    case GameResultStatus.WON:
      return <ScoreChipWin gameScore={gameScore} />
    case GameResultStatus.LOSE:
      return <ScoreChipLose gameScore={gameScore} />
    case GameResultStatus.DRAW:
      return <ScoreChipDraw gameScore={gameScore} />
    default:
      return <></>
  }
}

export function ScoreChipWin({gameScore}: {gameScore: string}) {
  return <Chip label={gameScore} color="success" />
}

export function ScoreChipLose({gameScore}: {gameScore: string}) {
  return <Chip label={gameScore} color="error" />
}

export function ScoreChipDraw({gameScore}: {gameScore: string}) {
  return <Chip label={gameScore} color="warning" />
}
