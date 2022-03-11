import { Post } from '../model/Post';

export interface IPostResponse {
  totalCount: number;
  posts: Post[];
}
