import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../post.service';

interface DialogData {
  id: number;
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit {
  id?: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }

  delete() {
    // console.log(this.id);
    if (this.id) {
      this.postService.deletePost(this.id).subscribe((response) => {
        if (response.success) {
          console.log(response);
          window.location.reload();
        } else {
          console.log('server error', response);
        }
      });
    }
  }
}
