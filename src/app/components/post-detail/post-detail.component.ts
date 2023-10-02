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
  newComment: Comment = { postId: 0, author: '', text: '', date: new Date() }

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId: number = Number(params.get('id'));
      if (postId) {
        this.postService.getPostById(postId).subscribe({
          next: (post) => {
            this.post = post
            if (this.post) {
              this.commentService.getCommentsForPost(postId).subscribe((comments) => {
                this.comments = comments
              })
            }
          }
        })
      }
    });
  }

  addComment(): void {
    if (this.post &&  this.newComment.text) {
      const userData = localStorage.getItem('user')
      if (userData) {
        this.newComment.author = JSON.parse(userData).username
        this.newComment.postId = this.post.id;
        this.newComment.date = new Date();
        this.commentService.addComment(this.newComment).subscribe({
          next: (comment) => {
            this.comments.push(comment)
            this.newComment = { postId: 0, author: '', text: '', date: new Date() }
          },
          error: (error) => {
            console.error('Ошибка при добавлении комментария: ', error)
          }
        })
      } else {
        console.error("Войдите в аккаунт")
      }
      
    }
  }
}
