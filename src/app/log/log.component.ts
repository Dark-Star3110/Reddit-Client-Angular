import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';

interface DialogData {
  id: number;
  success: () => void;
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
    private postService: PostService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
  }

  delete() {
    // console.log(this.id);
    if (this.id) {
      this.postService.deletePost(this.id).subscribe((response) => {
        if (response.success) {
          this.toastr.success('Update post successfully !', 'Success', {
            closeButton: true,
            timeOut: 5000,
          });
          console.log(response);
          this.data.success();
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
}
