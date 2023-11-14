import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import User from 'src/app/models/User';
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
  userData: User | undefined
  posts: Post[] = []
  comments: Comment[] = []
  showAll: boolean = true
  showPosts: boolean = false
  showComments: boolean = false

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

  isLike(postLikes: string[]) {
    const userdata = localStorage.getItem('user')
    if (userdata) {
      const username = JSON.parse(userdata).username
      if (postLikes.includes(username)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  likePost(postId: string) {
    const userData = localStorage.getItem('user')
    if (userData) {
      const username = JSON.parse(userData).username
      this.postService.likePost(postId, username).subscribe({
        next: (updatedPost) => {
          const index = this.posts.findIndex(post => post._id === updatedPost._id)
          this.posts[index] = updatedPost
        },
        error: (error) => {
          console.error(error)
        }
      })
    } else {
      console.error("Ошибка! Войдите в аккаунт")
    }
  }

  deleteLike(postId: string) {
    const userData = localStorage.getItem('user')
    if (userData) {
      const username = JSON.parse(userData).username
      this.postService.deleteLike(postId, username).subscribe({
        next: (updatedPost) => {
          const index = this.posts.findIndex(post => post._id === updatedPost._id)
          this.posts[index] = updatedPost
        },
        error: (error) => {
          console.error(error);
        }
      });
    } else {
      console.error('Ошибка! Войдите в аккаунт')
    }
  }

  toggleLike(postId: string | undefined, postLikes: string[]) {
    const userdata = localStorage.getItem('user')
    if (postId && userdata) {
      const username = JSON.parse(userdata).username
      if (postLikes.includes(username)) {
        this.deleteLike(postId)
      } else {
        this.likePost(postId)
      }
    }
  }
}
