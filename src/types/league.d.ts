import { Game } from "./game";
import { Player } from "./player";

export interface LeagueParticipant {
  participant_id: number;
  player: Player;
  games: Game[];
  points: number;
  rank?: number;
}

export interface League {
  name: string;
  participants: LeagueParticipant[];
}
