export default class RoomModel {
  constructor(
    public _id: string,
    public roomName: string,
    public roomLocation: string,
    public roomSeats: string[]
  ) {}
}
