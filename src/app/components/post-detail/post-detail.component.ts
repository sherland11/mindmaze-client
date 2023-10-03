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
  newComment: Comment = { postId: '', author: '', text: '', date: new Date() }

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private postService: PostService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (params) => {
        const postId: string = String(params.get('id'))
        console.log(postId)
        if (postId) {
          this.postService.getPostById(postId).subscribe({
            next: (post) => {
              this.post = post
              console.log(this.post)
              console.log(post)
              if (this.post) {
                this.commentService.getCommentsForPost(postId).subscribe((comments) => {
                  this.comments = comments
                })
              }
            }
          })
        } else {
          console.error('Id не получен')
        }
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  addComment(): void {
    if (this.post &&  this.newComment.text) {
      const userData = localStorage.getItem('user')
      if (userData) {
        this.newComment.author = JSON.parse(userData).username
        this.newComment.postId = this.post._id;
        this.newComment.date = new Date();
        this.commentService.addComment(this.newComment).subscribe({
          next: (comment) => {
            this.comments.push(comment)
            this.newComment = { postId: '', author: '', text: '', date: new Date() }
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
