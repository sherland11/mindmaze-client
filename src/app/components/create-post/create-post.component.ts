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
    date: new Date()
    
  }

  constructor(private postService: PostService) {}

  onSubmit() {
    const userData = localStorage.getItem('user')
    if (userData) {
      const userName = JSON.parse(userData).username
      this.post.username = userName
      this.postService.createPost(this.post).subscribe({
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
