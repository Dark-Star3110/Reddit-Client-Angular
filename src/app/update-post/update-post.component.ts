import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../model/Post';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
})
export class UpdatePostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  update(title: string, body: string): void {
    let id = this.route.snapshot.paramMap.get('id');
    title = title.trim();
    body = body.trim();
    if (!title || !body || !id) {
      return;
    }
    this.postService
      .updatePost(id, { title, body } as Post)
      .subscribe((response) => {
        if (response.success) {
          this.toastr.success('Update post successfully !', 'Success', {
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
