import IHole = Services.Models.IHole;
import ICard = Services.Models.ICard;
import IPlayer = Services.Models.IPayer;
import IPoints = Services.Models.IPoints;
import IPointConfiguration = Services.Models.IPointConfiguration;
import ICourse = Services.Models.ICourse;


declare module Services {
    export interface ICardService {
        getCard(cardId: number | string): Promise<ICard>;

        saveCard(card: ICard): Promise<ICard>;

        deleteCard(cardId: number | string): Promise<ICard>;

        isCardLeader(card: ICard, playerId: string | number): boolean;
    }

    export interface IHoleService {
        getCardHoles(cardId: number | string): Promise<IHole[]>;

        saveHole(cardId: number | string, hole: IHole): Promise<IHole>;
        updateHole(hole: IHole): Promise<IHole>;

        deleteHole(holeId: number | string): Promise<IHole>;
    }

    export interface IPlayerService {
        getPlayer(playerId: number | string): Promise<IPlayer>;
        getCardPlayers(cardId: number | string): Promise<IPlayer[]>;

        savePlayer(player: IPlayer): Promise<IPlayer>;
        updatePlayer(player: IPlayer): Promise<IPlayer>;

        deletePlayer(playerId: number | string): Promise<IPlayer>;
    }

    export interface IPointService {
        getCardPlayerPoints(cardId: string | number, playerId: string | number): Promise<IPoints>;
    }

    export interface IConfiguratonService {
        getPointConfiguration(): Promise<IPointConfiguration>;
    }

    export interface ICourseService {
        getCourse(courseId: string | number): Promise<ICourse>;
    }
}