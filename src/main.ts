export {};

type PermissionItem = false | "read" | "read-write";

type Permissions = {
  comments: PermissionItem;
  articles: PermissionItem;
  users: PermissionItem;
};

type Comment = {
  userId: string;
  content: string;
};

type Article = {
  id: string;
  title: string;
  content: string;
  comments: Array<Comment>;
};

type Reader = {
  role: "Reader";
  id: string;
  name: string;
  age: number;
  permissions: Permissions;
  favArtciles: Array<string>;
};

type Author = {
  role: "Author";
  id: string;
  name: string;
  age: number;
  permissions: Permissions;
  articles: Array<Article>;
};

type User = Author | Reader;

const data: Array<User> = [];
