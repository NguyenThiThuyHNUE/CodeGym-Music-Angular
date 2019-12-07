export interface IUserResponse {
  data: {
    id: bigint;
    name: string;
    email: string
  };
  message: string;
}
