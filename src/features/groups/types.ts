import { PublicUserDTO } from '@/features/users/types';
import { IImageUpload } from '@/features/shared/images/types';

export type IGroupDTO = {
  id: GroupId;
  name: string;
  image_url: string;
  is_admin: boolean;
  participants_count: number;
};

export type GroupId = string;

export type IGroupWithParticipants = IGroupDTO & {
  participants: PublicUserDTO[];
};

export type FetchGroupById = IGroupWithParticipants;

export type FetchMyGroups = IGroupDTO[];

export type UpdateGroupProps = {
  name?: string;
  image?: IImageUpload;
};

export type CreateGroupProps = {
  name: string;
  image: IImageUpload;
};

export type IUpdateGroup = {
  groupId: GroupId;
  name?: string;
  image?: IImageUpload;
};

export type IDeleteFromGroup = {
  groupId: GroupId;
  userId: string;
};
