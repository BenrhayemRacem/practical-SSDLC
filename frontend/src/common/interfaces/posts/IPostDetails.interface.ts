export interface IPostDetails {
  _id: string;
  title: string;
  content: string;
  images: [string];
  owner: {
    _id: string;
    username: string;
  };
  comments: [
    {
      _id: string;
      content: string;
      owner: {
        _id: string;
        username: string;
      };
    }
  ];
}
