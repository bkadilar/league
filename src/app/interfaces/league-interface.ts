export interface ITeam {
    name: string;
    logo: string;
    point: number;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    av: number;
}
export interface ISettings {
    week : number,
    isFinished : boolean,
    champion : ITeam
}
export interface IScoreResult {
    team1: number;
    team1Goals: number;
    team2Goals: number;
    team2: number;
}
export interface IChampionGuess {
    team: ITeam;
    percentage: number;
}
export interface IFixture {
    week: number;
    home: ITeam;
    away: ITeam;
}
