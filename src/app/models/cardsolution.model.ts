export class CardSolution {
    public id: string;
    public title: string;
    public description: string;
    public createdAt: Date;
    public shortDateName: string;
    public status?: number;

    constructor(id: string, title: string, description: string, createdAt: Date, status: number ){
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.status = status;
    }
}