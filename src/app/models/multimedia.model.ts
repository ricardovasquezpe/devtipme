export class Multimedia {
    public internalId: string;
    public content: string;
    public type: number;
    public order: number;

    constructor(internalId: string, content: string, type: number, order:number){
        this.internalId = internalId;
        this.content = content;
        this.type = type;
        this.order = order;
    }
}