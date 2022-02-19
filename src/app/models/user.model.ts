export class User {
  id: number;
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
  constructor(id,firstname, lastname,username, email, password, verifyPassword, bio, userMeetingStatus,followers,following) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.verifyPassword = verifyPassword;
    this.bio = bio;
    this.userMeetingStatus = userMeetingStatus;
    this.followers=followers;
    this.following=following;
  }
}
