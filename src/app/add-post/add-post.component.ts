import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../model/Post';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  add(title: string, body: string): void {
    title = title.trim();
    body = body.trim();
    if (!title || !body) {
      return;
    }
    this.postService.addPost({ title, body } as Post).subscribe((response) => {
      if (response.success) {
        this.toastr.success('Add post successfully !', 'Success', {
          closeButton: true,
          timeOut: 5000,
        });
        this.router.navigate(['/']);
      } else {
        this.toastr.error('Add post failed !', 'Error!', {
          closeButton: true,
          timeOut: 5000,
        });
        console.log('server error', response);
      }
    });
  }
}
