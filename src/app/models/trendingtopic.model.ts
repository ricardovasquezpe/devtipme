export class TrendingTopic {
    public text?: string;
    public link?: string;
    //nuevos campos
    public createdAt?: string;
    public title?: string;
    public total?: number;
    public updatedAt?: string;
    public _id?: string;

    constructor(text: string, link: string){
        this.text = text
        this.link = link
    }
}