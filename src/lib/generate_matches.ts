import {GameResultStatus} from "@/enums/game_status";
import {Game} from "@/types/game";

export function generateMatchesAvoidingConsecutiveParticipation(N: number): string[] {
  let matches: string[] = []
  let lastMatchParticipants: Set<number> = new Set()
  let matchQueue: string[] = []

  for (let i = 1; i <= N; i++) {
    for (let j = i + 1; j <= N; j++) {
      matchQueue.push(`${i}-${j}`)
    }
  }

  while (matchQueue.length > 0) {
    let matchFound = false

    for (let i = 0; i < matchQueue.length; i++) {
      const [player1, player2] = matchQueue[i].split('-').map(Number)

      if (!lastMatchParticipants.has(player1) && !lastMatchParticipants.has(player2)) {
        matches.push(matchQueue[i])
        lastMatchParticipants.clear()
        lastMatchParticipants.add(player1)
        lastMatchParticipants.add(player2)
        matchQueue.splice(i, 1)
        matchFound = true
        break
      }
    }

    if (!matchFound && matchQueue.length > 0) {
      const [player1, player2] = matchQueue[0].split('-').map(Number)
      matches.push(matchQueue[0])
      lastMatchParticipants.clear()
      lastMatchParticipants.add(player1)
      lastMatchParticipants.add(player2)
      matchQueue.splice(0, 1)
    }
  }

  return matches
}

export function analyzeGames(games: Game[]): number[] {
  let won = 0
  let lose = 0
  let draw = 0
  let winScore: number = 0
  let loseScore: number = 0
  games.forEach(game => {
    if ('score' in game) {
      winScore += Number(game.score.a)
      loseScore += Number(game.score.b)
      switch (game.status) {
        case GameResultStatus.WON:
          won++
          break
        case GameResultStatus.LOSE:
          lose++
          break
        case GameResultStatus.DRAW:
          draw++
          break
      }
    }
  })
  return [won, lose, draw, winScore, loseScore]
}
