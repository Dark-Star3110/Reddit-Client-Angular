import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogComponent } from '../log/log.component';
import { Post } from '../model/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(public dialog: MatDialog, private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  openDialog() {
    this.dialog.open(LogComponent);
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
