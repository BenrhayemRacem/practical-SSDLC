import { Document } from 'mongoose';

export interface IPost extends Document {
  readonly title: string;
  readonly content: string;
  readonly images: [string];
  readonly owner: string;
  readonly comments : [string];
}
