import { GameResultStatus, BaseGameStatus } from "@/enums/game_status";
import { Score } from "@/types/score";

export class GameResult {
  status: GameResultStatus;
  score: Score;

  constructor(a: number, b: number) {
    this.status = this.determineResult(a, b);
    this.score = {a: a, b: b};
  }

  private determineResult(a: number, b: number): GameResultStatus {
    if (a > b) {
      return GameResultStatus.WON;
    } else if (a < b) {
      return GameResultStatus.LOSE;
    } else {
      return GameResultStatus.DRAW;
    }
  }

  public displayScore(): string {
    return `${this.score.a} - ${this.score.b}`
  }
}
