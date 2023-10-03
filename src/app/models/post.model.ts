export interface Post {
    _id?: string;
    title: string;
    content: string;
    date: Date;
    comments?: Comment[]
}