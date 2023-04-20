import { Document } from 'mongoose';

export interface IComment extends Document {
  readonly content: string;
  readonly owner: string;
  readonly post: string;
}
