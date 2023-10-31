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
  errorAccount: boolean = false
  errorForm: boolean = false

  constructor(private postService: PostService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      console.log(this.selectedImage)
    }
  }

  onSubmit() {
    const userData = localStorage.getItem('user')
    if (userData) {
      const userName = JSON.parse(userData).username
      this.post.username = userName

      const formData = new FormData()
      if (this.post.title && this.post.content && this.post.topic && this.selectedImage) {
        formData.append('title', this.post.title);
        formData.append('content', this.post.content);
        formData.append('topic', this.post.topic);
        formData.append('username', this.post.username)
        formData.append('date', String(this.post.date))
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
        this.errorForm = true
      }
    } else {
      console.error("Войдите в аккаунт")
      this.errorAccount = true
    }
  }
}
