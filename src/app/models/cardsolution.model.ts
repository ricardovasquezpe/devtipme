export class CardSolution {
    public id: string;
    public title: string;
    public description: string;
    public createdAt: Date;
    public shortDateName: string;

    constructor(id: string, title: string, description: string, createdAt: Date){
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
    }
}