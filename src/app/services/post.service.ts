import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'Заголовок поста 1',
      content: 'Содержание поста 1...',
      date: new Date()
    },
    {
      id: 2,
      title: 'Заголовок поста 2',
      content: 'Содержание поста 2...',
      date: new Date()
    }
  ]

  constructor() { }

  getPosts(): Post[] {
    return this.posts
  }

  getPostById(id: number): Post | undefined {
    return this.posts.find(post => post.id === id)
  }
}
