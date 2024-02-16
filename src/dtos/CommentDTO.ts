import { UserDTO } from './UserDTO';

type UserForComments = Pick<UserDTO, 'name' | 'id' | 'avatar_url'>;

export type FetchCommentDTO = {
  id: number;
  content: string;
  complaint_id: string;
  created_at: string;
  user: UserForComments;
};

export type IComment = {
  id: number;
  content: string;
  user: UserForComments;
  created_at: Date;
};
