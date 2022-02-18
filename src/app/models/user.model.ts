export class User {

  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
  bio: string;
  userMeetingStatus: any;
  followers:[];
  following:[{id:any,from:any,to:any}];
  avatar:string;
  constructor(firstname, lastname,username, email, password, verifyPassword, bio,avatar, userMeetingStatus,followers,following) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.verifyPassword = verifyPassword;
    this.bio = bio;
    this.avatar=avatar;
    this.userMeetingStatus = userMeetingStatus;
    this.followers=followers;
    this.following=following;
  }
}
