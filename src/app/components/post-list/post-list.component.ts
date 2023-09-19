import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [
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

  constructor() {}

  ngOnInit(): void { }
}
