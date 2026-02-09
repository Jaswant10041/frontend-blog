// Initial 5 posts embedded in the code for instant display on first visit
// These will show immediately while the backend loads

export const INITIAL_POSTS = [
  {
    _id: "init_1",
    title: "Getting Started with Web Development",
    body: "Web development is an exciting field that combines creativity with technical skills. In this post, we'll explore the fundamentals of building modern web applications using the latest technologies and best practices.",
    slug: "getting-started-web-development",
    author: {
      _id: "author_1",
      name: "John Developer",
      email: "john@example.com"
    },
    likes: [],
    comments: [],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "init_2",
    title: "React Best Practices Guide",
    body: "React has become the go-to library for building interactive user interfaces. Learn about hooks, state management, performance optimization, and component design patterns that will make you a better React developer.",
    slug: "react-best-practices",
    author: {
      _id: "author_2",
      name: "Sarah React",
      email: "sarah@example.com"
    },
    likes: [],
    comments: [],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "init_3",
    title: "Backend Development with Node.js",
    body: "Node.js enables developers to use JavaScript on the server side. Discover how to build scalable APIs, handle databases, implement authentication, and deploy production-ready applications using Express and other frameworks.",
    slug: "nodejs-backend-guide",
    author: {
      _id: "author_3",
      name: "Mike Backend",
      email: "mike@example.com"
    },
    likes: [],
    comments: [],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "init_4",
    title: "Mastering CSS Grid and Flexbox",
    body: "Modern CSS layout techniques have revolutionized web design. Learn how to create responsive, flexible layouts using CSS Grid and Flexbox. Understand when to use each approach and create beautiful, adaptive designs.",
    slug: "css-grid-flexbox-mastery",
    author: {
      _id: "author_4",
      name: "Emily Designer",
      email: "emily@example.com"
    },
    likes: [],
    comments: [],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "init_5",
    title: "Database Design and Optimization",
    body: "A well-designed database is crucial for application performance. Explore database design principles, indexing strategies, query optimization, and how to choose between SQL and NoSQL databases based on your application needs.",
    slug: "database-design-optimization",
    author: {
      _id: "author_5",
      name: "Alex Database",
      email: "alex@example.com"
    },
    likes: [],
    comments: [],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  }
];
