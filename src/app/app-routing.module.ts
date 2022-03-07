import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { PostsComponent } from './posts/posts.component';
import { UpdatePostComponent } from './update-post/update-post.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: 'update-post/:id', component: UpdatePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
