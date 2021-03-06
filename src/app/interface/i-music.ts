export interface IMusic {
  id?: number;
  name?: string;
  description?: string;
  singer?: string;
  avatar?: string;
  musicUrl?: string;
  file?: string;
  category?: string;
  singers?: [{ name: string, user_id: number }];
}
