import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: Post | undefined;
  comments: Comment[] = [];
  newComment: Comment = this.createEmptyComment();

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId: number = Number(params.get('id'));
      this.post = this.postService.getPostById(postId);
      this.loadComments(postId);
    });
  }

  addComment(): void {
    if (this.post && this.newComment.author && this.newComment.text) {
      this.newComment.postId = this.post.id;
      this.newComment.date = new Date();
      this.commentService.addComment(this.newComment);
      this.newComment = this.createEmptyComment();
      this.loadComments(this.post.id);
    }
  }

  private loadComments(postId: number): void {
    this.comments = this.commentService.getCommentsForPost(postId);
  }

  private createEmptyComment(): Comment {
    return { id: 0, postId: 0, author: '', text: '', date: new Date() };
  }
}
