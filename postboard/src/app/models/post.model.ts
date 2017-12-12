import { User } from "./user.model";

export class Comment {
    _id: string;
    user: User;
    date: Date;
    text: string;
}

export class Post {
    _id: string;
    user: User;
    title: string;
    date: Date;
    content: string;
    edited: Date;

    comments: [Comment];
}