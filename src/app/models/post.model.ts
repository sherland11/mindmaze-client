export interface Post {
    id: number;
    title: string;
    content: string;
    date: Date;
    comments?: Comment[]
}