import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileByUsernameService } from 'src/app/services/profile-by-username.service';

@Component({
  selector: 'app-profile-by-username',
  templateUrl: './profile-by-username.component.html',
  styleUrls: ['./profile-by-username.component.scss']
})
export class ProfileByUsernameComponent implements OnInit {
  username: string = ''
  userData: any
  posts: Post[] = []
  comments: Comment[] = []

  constructor(
    private route: ActivatedRoute, 
    private profileByUsernameSerivce: ProfileByUsernameService,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.username = params['username']
        this.loadUserData()
      },
      error: (error) => {
        console.error(error)
      }
    })
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts.filter((post) => post.username === this.username)
        console.log(this.posts)
      },
      error: (error) => {
        console.error(error)
      }
    })
    this.commentService.getCommentsByUsername(this.username).subscribe({
      next: (comments) => {
        this.comments = comments
        console.log(comments)
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  private loadUserData(): void {
    this.profileByUsernameSerivce.getUserByUsername(this.username).subscribe({
      next: (data) => {
        this.userData = data
      }
    })
  }
}
