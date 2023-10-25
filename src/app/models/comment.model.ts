export interface Comment {
    postTitle: string
    postId: string | undefined;
    text: string;
    author: string;
    date: Date;
}