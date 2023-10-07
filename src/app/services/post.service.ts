import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl)
  }

  searchPosts(searchTerm: string, topic: string): Observable<Post[]> {
    const params = { searchTerm, topic }
    return this.http.get<Post[]>(`${this.apiUrl}/search`, { params }) 
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`)
  }

  createPost(postData: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, postData)
  }

  updatePost(updatedPost: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${updatedPost._id}`, updatedPost);
  }
}
