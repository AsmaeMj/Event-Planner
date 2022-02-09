import { UserMeetingKey } from './userMeetingKey.model';
import { User } from './user.model';

export class UserMeeting{

    constructor(
      public id: UserMeetingKey,
      public user: User,
      public statut: number
    ){

    }
  };
