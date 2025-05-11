## GraphQL API Documentation

### Endpoint

* **URL**: `/graphql`
* **Method**: `POST`

### Schema Generation

The GraphQL schema is auto-generated, you can check it [here](../libs/core/src/lib/graphql-schema/schema.gql).

### Queries

| Query          | Description                     |
| -------------- | ------------------------------- |
| `blogPosts`    | Returns paginated list of posts |
| `blogPost(id)` | Returns a single post by ID     |

#### `blogPosts(paginationQuery)`

* **Arguments**:

  * `paginationQuery` (optional): `{ limit: Int, offset: Int }`
* **Returns**: `[BlogPost]`

#### `blogPost(id)`

* **Arguments**:

  * `id` (ID!): Blog post identifier
* **Returns**: `BlogPost`

### Mutations

| Mutation         | Description             |
| ---------------- | ----------------------- |
| `createBlogPost` | Create a new blog post  |
| `updateBlogPost` | Update an existing post |
| `removeBlogPost` | Soft delete a post      |

#### `createBlogPost(input)`

* **Arguments**:

  * `createBlogPostInput` (CreateBlogPostInput!): `{ title: String!, content: String!, categories?: [String] }`
* **Returns**: `BlogPost`

#### `updateBlogPost(id, input)`

* **Arguments**:

  * `id` (ID!): Blog post ID
  * `updateBlogPostInput` (UpdateBlogPostInput!): `{ title?: String, content?: String, categories?: [String] }`
* **Returns**: `BlogPost`

#### `removeBlogPost(id)`

* **Arguments**:

  * `id` (ID!): Post ID
* **Returns**: `Boolean`

### Subscriptions

| Subscription    | Description                         |
| --------------- |-------------------------------------|
| `blogPostAdded` | Real-time updates of new blog posts |

#### `blogPostAdded`

* **Returns**: `BlogPost`
* **Notes**: Uses PubSub under the hood; supports both `subscriptions-transport-ws` and `graphql-ws` protocols.
