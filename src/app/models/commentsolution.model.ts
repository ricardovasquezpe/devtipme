export class CommentSolution {
    public username: string;
    public date: string;
    public comment: string;

    constructor(username: string, date: string, comment: string){
        this.username = username;
        this.date = date;
        this.comment = comment;
    }
}