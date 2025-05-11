## Examples of operations

### Create a Blog Post

```graphql
mutation CreatePost {
  createBlogPost(
    createBlogPostInput: {
      title: "Graphql in NestJS"
      content: "Hello world!"
      categories: ["NestJS", "GraphQL"]
    }
  ) {
    id
    title
    content
    createdAt
    categories {
      id
      name
    }
  }
}
```

### List Blog Posts
##### Without pagination:
```graphql
query ListPosts {
  blogPosts {
    id
    title
    content
    createdAt
    categories {
      name
    }
  }
}
```
##### With pagination:
```graphql
query ListPostsPaginated {
  blogPosts(paginationQuery: { limit: 5, offset: 5 }) {
    id
    title
    content
    createdAt
    categories {
      name
    }
  }
}
```

### Get Blog Post by ID
```graphql
query GetPost {
  blogPost(id: 1) {
    id
    title
    content
    createdAt
    categories {
      name
    }
  }
}
```


### Update a Blog Post

```graphql
mutation UpdatePost {
  updateBlogPost(
    id: 1,
    updateBlogPostInput: {
      title: "Graphql in NestJS using NX"
      categories: ["NestJS", "GraphQL", "NX"]
    }
  ) {
    id
    title
    content
    createdAt
    categories {
      id
      name
    }
  }
}
```

### Remove a Blog Post

```graphql
mutation RemovePost {
  removeBlogPost(id: 1)
}
```

### Subscribe to New Posts

```graphql
subscription OnNewPost {
  blogPostAdded {
    id
    title
    createdAt
  }
}
```
