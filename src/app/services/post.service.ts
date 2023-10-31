import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  searchPosts(searchTerm: string, topic: string, sortBy: string): Observable<Post[]> {
    const params = { searchTerm, topic, sortBy }
    return this.http.get<Post[]>(`${this.apiUrl}/search`, { params }) 
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`)
  }
  
  getPostTitle(postId: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/title/${postId}`)
  }

  getPostImage(imagePath: string): string {
    return `${this.apiUrl}/images/${imagePath}`
  }

  createPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, postData)
  }

  updatePost(updatedPost: FormData): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${updatedPost.get('_id')}`, updatedPost);
  }

  likePost(postId: string, username: string): Observable<Post> {
    const likeUrl = `http://localhost:3000/like/${postId}`
    return this.http.post<Post>(likeUrl, {username})
  }

  deleteLike(postId: string, username: string): Observable<Post> {
    const likeUrl = `http://localhost:3000/like/delete/${postId}`
    return this.http.post<Post>(likeUrl, {username})
  }
}
