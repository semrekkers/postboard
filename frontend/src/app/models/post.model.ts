import { User } from "./user.model";

export class Comment {
    _id: string;
    author: User;
    date: Date;
    text: string;

    constructor(text: string) {
        // INFO: other fields are populated server-side
        this.text = text;
    }
}

export class Post {
    _id: string;
    author: User;
    title: string;
    date: Date;
    content: string;
    edited: Date;

    comments: Comment[];

    constructor() {
        this.author = new User();
    }
}
