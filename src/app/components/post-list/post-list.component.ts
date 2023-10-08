import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private postService: PostService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.searchForm = this.formBuilder.group({
      searchTerm: '',
      topic: ''
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const topic = params.get('topic')
        console.log(topic)
        if (topic) this.searchForm.patchValue({topic: topic})
        this.searchPosts()
      },
      error: (error) => {
        console.error(error)
      }
    })

    this.searchForm.valueChanges.subscribe({
      next: () => {
        this.searchPosts()
      },
      error: (error) => {
        console.error(error)
      }
    })
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
