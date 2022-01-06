export class User {
  
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
  bio: string;
  userMeetingStatus: any;

  constructor(firstname, lastname, email, password, verifyPassword, bio, userMeetingStatus) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.verifyPassword = verifyPassword;
    this.bio = bio;
    this.userMeetingStatus = userMeetingStatus;
  }
}