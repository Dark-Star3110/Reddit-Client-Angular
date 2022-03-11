import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogComponent } from '../log/log.component';
import { Post } from '../model/Post';
import { PostService } from '../post.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  postSelectedId: number = 0;

  limit: number = 2;
  length = 0;
  pageSize = 0;
  pageSizeOptions: number[] = [2, 3, 4, 5];
  key: string = '';
  currentPage: number = 0;
  constructor(public dialog: MatDialog, private postService: PostService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  openDialog(id: number) {
    // console.log(id);
    this.postSelectedId = id;
    const data = {
      id,
      success: this.success.bind(this),
    };
    this.dialog.open(LogComponent, {
      data,
    });
  }

  getPosts(): void {
    this.postService
      .getPosts({ limit: this.limit, currentPage: this.currentPage })
      .subscribe((response) => {
        // console.log(response);
        this.length = response.totalCount;
        this.pageSize = this.limit;
        this.posts = response.posts;
      });
  }

  search(): void {
    this.postService
      .getPosts({
        limit: this.limit,
        currentPage: this.currentPage,
        title: `%${this.key}%`,
      })
      .subscribe((response) => {
        this.length = response.totalCount;
        this.pageSize = this.limit;
        this.posts = response.posts;
      });
  }

  petzing(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.limit = e.pageSize;
    if (this.key !== '') {
      this.search();
      return;
    }
    this.getPosts();
  }

  success(): void {
    this.posts = this.posts.filter((post) => post.id !== this.postSelectedId);
  }
}
