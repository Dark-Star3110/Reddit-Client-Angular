import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../model/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
})
export class UpdatePostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
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
          this.router.navigate(['/']);
        } else {
          console.log('server error', response);
        }
      });
  }
}
