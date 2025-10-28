import { Match } from "@/model/championship";
import { RoundType } from "@/model/enum/roundType";
import { TeamDocument } from "@/services/team/teamService";

const getInitialRound = (teamCount: number): RoundType => {
    if (teamCount > 8) return RoundType.R16;
    if (teamCount > 4) return RoundType.QF;
    if (teamCount > 2) return RoundType.SF;
    return RoundType.F;
};

export const generateBracket = (teams: TeamDocument[]): Match[] => {
    if (teams.length < 2) {
        return [];
    }

    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    const initialRound = getInitialRound(shuffledTeams.length);
    const matches: Match[] = [];
    let matchCounter = 1;

    for (let i = 0; i < shuffledTeams.length; i += 2) {
        const homeTeam = shuffledTeams[i];
        const awayTeam = shuffledTeams[i + 1];

        if (!awayTeam) {
            continue;
        }

        matches.push({
            id: `${initialRound}-${matchCounter}`,
            round: initialRound,
            label: `Confronto ${matchCounter}`,
            home: { ...homeTeam, score: 0 },
            away: { ...awayTeam, score: 0 },
        });
        matchCounter++;
    }

    return matches;
};