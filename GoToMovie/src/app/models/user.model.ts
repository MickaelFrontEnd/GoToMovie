export default class UserModel {
  constructor(
    public _id: string,
    public userName: string,
    public userFirstName: string,
    public userDob: string,
    public userEmail: string,
    public userPassword: string,
    public userProfilePic: string,
    public userType: number
  ) {}
}
