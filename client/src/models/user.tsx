export interface IUserLabel {
  name: string;
  color: string;
}

export interface IUserProject extends IUserLabel {}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  avatar: string;
  labels: IUserLabel[];
  projects: IUserProject[];
  preferences: {
    themeColor?: string;
    defaultView?: string;
    dailyGoal?: number;
    weeklyGoal?: number;
  };
}
