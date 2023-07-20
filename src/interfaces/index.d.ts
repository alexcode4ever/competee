import { BaseKey } from "@refinedev/core";

export interface IUser {
  id: BaseKey;
  email: string;
  username: string;
  full_name: string | null;
  avatar_url: string;
  token: string;
}

export interface ICompetition {
  id: number;
  user_id: string;
  name: string;
  slug: string;
  body: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  start_date: string;
  end_date: string;
  banner_url: string;
}

export interface IChallenge {
  id: number;
  competition_id: number;
  user: IUser;
  body: string;
}

export interface IWatching {
  id: number;
  competition_id: number;
  user: IUser;
  created_at: string;
}
