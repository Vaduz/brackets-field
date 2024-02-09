import { GameResultStatus, BaseGameStatus } from "@/enums/GameStatuses";
import { Score } from "./score";

export interface BaseGame {
  status: BaseGameStatus;
}

export interface GameResult {
  status: GameResultStatus;
  score: Score;
}

export type Game = BaseGame | GameResult;
