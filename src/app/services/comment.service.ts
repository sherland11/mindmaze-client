import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [];
  
  constructor() { }

  addComment(comment: Comment): void {
    this.comments.push(comment)
  }

  getCommentsForPost(postId: number): Comment[] {
    return this.comments.filter(comment => comment.postId === postId)
  }
}
