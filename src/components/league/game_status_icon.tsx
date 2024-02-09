import {BaseGameStatus, GameResultStatus} from "@/enums/game_status";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CloseIcon from "@mui/icons-material/Close";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import { Grid } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';

export function GameStatusIconItem({status}: {status: GameResultStatus | BaseGameStatus}) {
  return <Grid item><GameStatusIcon status={status} /></Grid>
}
export function GameStatusIcon({status}: {status: GameResultStatus | BaseGameStatus}) {
  let icon = <></>
  switch (status) {
    // case GameResultStatus.WON:
    //   icon = <PanoramaFishEyeIcon />
    //   break
    // case GameResultStatus.LOSE:
    //   icon = <CloseIcon />
    //   break
    // case GameResultStatus.DRAW:
    //   icon = <ChangeHistoryIcon />
    //   break
    case BaseGameStatus.PENDING:
      icon = <MoreHorizIcon />
      // icon = <CreateIcon />
      break
  }
  return icon
}
