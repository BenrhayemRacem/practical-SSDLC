import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    images: {
      type: [String],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    //comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
