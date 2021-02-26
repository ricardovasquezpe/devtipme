import { Multimedia } from "./multimedia.model";

export class Solution {
    public title: string;
    public content: Multimedia[];
    public topics: string[];

    constructor(title: string, content: Multimedia[], topics: string[]){
        this.title = title;
        this.content = content;
        this.topics = topics;
    }
}