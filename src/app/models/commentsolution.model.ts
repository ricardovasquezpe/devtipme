export class CommentSolution {
    public username: string;
    public comment: string;
    public createdAt: Date;
    public shortDateName: string;

    constructor(username: string, createdAt: Date, comment: string){
        this.username = username;
        this.createdAt = createdAt;
        this.comment = comment;
    }
}