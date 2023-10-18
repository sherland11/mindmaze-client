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
    topic: '',
    username: '',
    likes: [],
    date: new Date()
  }
  selectedImage: any

  constructor(private postService: PostService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit() {
    const userData = localStorage.getItem('user')
    if (userData) {
      const userName = JSON.parse(userData).username
      this.post.username = userName

      const formData = new FormData()
      formData.append('title', this.post.title);
      formData.append('content', this.post.content);
      formData.append('topic', this.post.topic);
      formData.append('image', this.selectedImage);

      this.postService.createPost(formData).subscribe({
        next: (response) => {
          console.log('Пост успешно создан:', response)
        },
        error: (error) => {
          console.error(error)
        }
      })
    } else {
      console.error("Войдите в аккаунт")
    }
  }
}
