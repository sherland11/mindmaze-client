import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Comment } from 'src/app/models/comment.model';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any
  posts: Post[] = []
  comments: Comment[] = []
  showAll: boolean = true
  showPosts: boolean = false
  showComments: boolean = false

  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user')
    if (userData) {
      this.user = JSON.parse(userData)
    }
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts.filter((post) => post.username === this.user.username)
        console.log(this.posts)
      },
      error: (error) => {
        console.error(error)
      }
    })
    this.commentService.getCommentsByUsername(this.user.username).subscribe({
      next: (comments) => {
        this.comments = comments
        console.log(comments)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  setShowAll() {
    this.showAll = true
    this.showPosts = false
    this.showComments = false
  }

  setShowPosts() {
    this.showAll = false
    this.showPosts = true
    this.showComments = false
  }

  setShowComments() {
    this.showAll = false
    this.showPosts = false
    this.showComments = true
  }
}
