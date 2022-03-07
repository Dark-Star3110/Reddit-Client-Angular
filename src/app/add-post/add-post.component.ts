import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../model/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  constructor(private postService: PostService, private router: Router) {}

  ngOnInit() {}

  add(title: string, body: string): void {
    title = title.trim();
    body = body.trim();
    if (!title || !body) {
      return;
    }
    this.postService.addPost({ title, body } as Post).subscribe((response) => {
      if (response.success) {
        this.router.navigate(['/']);
      } else {
        console.log('server error', response);
      }
    });
  }
}
