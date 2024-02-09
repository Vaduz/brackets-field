'use client'
import {League} from "@/types/league";
import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {GameResult} from "@/models/game_result";
import {BaseGameStatus} from "@/enums/game_status";

interface LeagueValue {
  league: League
  setLeague: Dispatch<SetStateAction<League>>
  setScore: (playerA: number, playerB: number, scoreA: number, scoreB: number) => void
  setPending: (playerA: number, playerB: number) => void
}

const LeagueContext = createContext<LeagueValue>({ league: {} as League, setLeague: () => {}, setScore: () => {}, setPending: () => {} } as LeagueValue)

interface LeagueContextProviderProps {
  children: ReactNode
}
const LeagueContextProvider = ({ children }: LeagueContextProviderProps) => {
  const [ league, setLeague ] = useState<League>({} as League)
  const setScore = function(playerA: number, playerB: number, scoreA: number, scoreB: number) {
    if (league.participants.length == 0) {
      console.warn('No participants')
      return
    }
    const participantCount = league.participants.length
    if (participantCount < playerA || participantCount < playerA) {
      console.warn(`Invalid player index. count: ${participantCount} playerA: ${playerA}, playerB: ${playerB}`)
      return
    }
    setLeague(prev => {
      const newLeague = {...prev}
      newLeague.participants[playerA - 1].games[playerB - 1] = new GameResult(scoreA, scoreB)
      newLeague.participants[playerB - 1].games[playerA - 1] = new GameResult(scoreB, scoreA)
      return newLeague
    })
  }
  const setPending = function(playerA: number, playerB: number) {
    setLeague(prev => {
      const newLeague = {...prev}
      newLeague.participants[playerA - 1].games[playerB - 1] = { status: BaseGameStatus.PENDING }
      newLeague.participants[playerB - 1].games[playerA - 1] = { status: BaseGameStatus.PENDING }
      return newLeague
    })
  }
  return (
    <LeagueContext.Provider value={{ league, setLeague, setScore, setPending }}>
      {children}
    </LeagueContext.Provider>
  )
}

const useLeagueContext = () => useContext(LeagueContext)

export { useLeagueContext, LeagueContextProvider }
