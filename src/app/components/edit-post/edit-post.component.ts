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
  editedPost: Post = { 
    title: '', 
    content: '', 
    topic: '', 
    username: '',
    likes: [], 
    date: new Date() 
  };

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

    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.editedPost.image = file;
      }
    }

    onSubmit(): void {
      const formData = new FormData()
      formData.append('_id', this.editedPost._id as string)
      formData.append('title', this.editedPost.title);
      formData.append('content', this.editedPost.content);
      formData.append('topic', this.editedPost.topic);
      formData.append('username', this.editedPost.username)
      formData.append('date', String(this.editedPost.date))
      formData.append('image', this.editedPost.image as any);
      this.postService.updatePost(formData).subscribe({
        next: () => {
          this.router.navigate(['/post', this.editedPost._id])
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
}

