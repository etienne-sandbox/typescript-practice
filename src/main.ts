import { nanoid } from "nanoid";

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

const defaultPermissions: Permissions = {
  articles: "read-write",
  comments: "read",
  users: "read-write",
};

const art1 = createArticle("Article 1", "Hello");
const art2 = createArticle("Article 2", "Salut");
const art3 = createArticle("Article 3", "Yolo");

const data: Array<User> = [
  createAuthor({
    name: "Paul",
    age: 42,
    articles: [art1, art2, art3],
    permissions: defaultPermissions,
  }),
  createReader({
    name: "",
    age: 4,
    favArtciles: articlesId([art1, art3]),
    permissions: defaultPermissions,
  }),
];

function articlesId(articles: Array<Article>): Array<string> {
  return articles.map((article) => article.id);
}

function createArticle(
  title: string,
  content: string,
  comments: Array<Comment> = []
): Article {
  return { id: nanoid(10), title, comments, content };
}

function createAuthor(data: Omit<Author, "id" | "role">): Author {
  return { role: "Author", id: nanoid(16), ...data };
}

function createReader(data: Omit<Reader, "id" | "role">): Reader {
  return { role: "Reader", id: nanoid(16), ...data };
}
