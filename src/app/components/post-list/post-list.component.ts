import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  searchForm: FormGroup

  constructor(private postService: PostService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      searchTerm: '',
      topic: ''
    })
  }

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe({
      next: () => {
        this.searchPosts()
      },
      error: (error) => {
        console.error(error)
      }
    })
    this.searchPosts()
   }

   onSearchInput(): void {
    this.searchPosts()
   }

   private searchPosts(): void {
    this.postService.searchPosts(this.searchForm.value.searchTerm, this.searchForm.value.topic).subscribe({
      next: (data) => {
        this.posts = data
      },
      error: (error) => {
        console.error(error)
      }
    })
   }
}
