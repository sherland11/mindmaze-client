export interface Post {
    _id?: string;
    title: string;
    content: string;
    date: Date;
    topic: string;
    username: string;
    likes: string[]
    comments?: Comment[];
    image?: string;
}