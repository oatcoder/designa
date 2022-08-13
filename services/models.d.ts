declare module Services.Models {
    export interface IBase {
        date?: Date;
        modified?: Date;
    }

    export interface IHole extends IBase {
        id?: string;

        par?: number;
        score?: number;

        isGir?: boolean;
        isBirdie?: boolean;
        isEagle?: boolean;
        isDoubleEagle?: boolean;
    }

    export interface IPayer extends IBase {
        id?: string;
        firstName?: string;
        lastName?: string;
        nickname?: string;

        holesPlayed?: number;
    }

    export interface IPlayerScore extends IPayer {
        holes?: IHole[];

        score?: number;
    }

    export interface ICard {
        id?: string;

        players?: string[];

        course?: ICourse;

        holesPlayed?: number;

        playersScores?: IPlayerScore[];

        par?: number;
    }

    export interface ICourse extends IBase {
        id?: string;
        name?: string;

        street?: string;
        apt?: string;
        city?: string;
        state?: string;
        zip?: string;
    }

    export interface IPoints extends IPointBase {
        total?: number;
    }

    export interface IPointConfiguration extends IPointBase { }

    export interface IPointBase extends IBase {
        birdie?: number;
        gir?: number;
        win?: number;
        eagle?: number;
        doubleEagle?: number;
    }
}