import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = []
  searchTerm: string = ''
  private searchTerms = new Subject<string>()

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.postService.getPosts().subscribe({
    //   next: (data) => {
    //     this.posts = data
    //   },
    //   error: (error) => {
    //     console.error(error)
    //   }
    // })
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe({
        next: (term) => {
          this.searchPosts(term)
        },
        error: (error) => {
          console.error(error)
        }
      })

      this.searchPosts(this.searchTerm)
   }

   onSearchInput(): void {
    this.searchTerms.next(this.searchTerm)
   }

   private searchPosts(term: string): void {
    this.postService.searchPosts(term).subscribe({
      next: (data) => {
        this.posts = data
      },
      error: (error) => {
        console.error(error)
      }
    })
   }
}
