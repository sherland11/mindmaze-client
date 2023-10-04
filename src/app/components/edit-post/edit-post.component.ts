import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editedPost: Post = { title: '', content: '', date: new Date() };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
  ) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe({
        next: (params) => {
          const postId = params.get('id')
          if (postId) {
            this.postService.getPostById(postId).subscribe({
              next: (post) => {
                this.editedPost = post
              },
              error: (error) => {
                console.error(error)
              }
            })
          }
        },
        error: (error) => {
          console.error(error)
        }
      })
    }

    onSubmit(): void {
      this.postService.updatePost(this.editedPost).subscribe({
        next: () => {
          this.router.navigate(['/posts', this.editedPost._id])
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
}

