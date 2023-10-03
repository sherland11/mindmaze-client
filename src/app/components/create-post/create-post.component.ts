import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  post: Post = {
    title: '',
    content: '',
    date: new Date()
    
  }

  constructor(private postService: PostService) {}

  onSubmit() {
    this.postService.createPost(this.post).subscribe({
      next: (response) => {
        console.log('Пост успешно создан:', response)
      },
      error: (error) => {
        console.error(error)
      }
  })
  }
}
