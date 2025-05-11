# Blog Platform

## Description

This is a simple backend for a blog platform built with **Nx**, **NestJS**, **TypeORM**, **PostgreSQL**, and **GraphQL**. It supports full **CRUD** operations on blog posts, with **real-time updates** via GraphQL subscriptions for newly created blog posts. The project follows a modular architecture and includes proper error handling, logging, and efficient data fetching.

## Key Dependencies
* `@apollo/server` & `@nestjs/apollo`: Apollo Server integration with NestJS for GraphQL.
* `@nestjs/graphql`: GraphQL support in NestJS, including schema generation and decorators.
* `@nestjs/typeorm` & `typeorm`: ORM integration for PostgreSQL.
* `pg`: PostgreSQL driver.
* `graphql` & `graphql-subscriptions` & `subscriptions-transport-ws`: Core GraphQL and real-time subscription support.
* `dataloader`: Batch and cache GraphQL resolver queries to avoid N+1 problems.
* `class-validator` & `class-transformer`: Input validation and transformation for DTOs.
* `joi`: Schema-based environment variable validation.
* `@nx/*` — Nx workspace libraries for tooling and development experience.

## How to Run the Project
For complete setup and running instructions (with and without Docker), see [this document](docs/RUNNING.md).

## Technical Details

### Entities Diagram

<img src="docs/entities-diagram.png" height="300px">


The core entity is `BlogPost`, which has a many-to-many relationship with `Category`.

### API Reference

GraphQL Playground provides an **interactive, auto‑generated API reference and schema documentation** that’s always kept in sync with the code. You can explore and try out queries, mutations, and subscriptions in the Playground UI:
> http://localhost:3000/graphql
> 
(Make sure the `GRAPHQL_PLAYGROUND` env variable is set to true)

For a **static overview**, see [API Reference](docs/API_REFERENCE.md).

### GraphQL Operations Examples

You can test out GraphQL queries, mutations, and subscriptions using the sample operations in [GraphQL Examples](docs/GRAPHQL_EXAMPLES.md).


### Project Structure

```
apps/
  blog-api/         # Main NestJS application
libs/
  blog-posts/
  common/
  core/
```
#### Library Breakdown:
##### 1. Core Library
* **Purpose**: Bootstraps global configuration, database connection, and GraphQL setup.

  Loads and validates environment variables via Joi, exposing them app‑wide.

##### 2. Blog Posts Library
* **Purpose**: Implements the complete domain functionality for blog posts.
* **Providers**:

  1. [**BlogPostsService**](libs/blog-posts/src/lib/services/blog-posts.service.ts)

    * Handles database operations (`findAll`, `findOne`, `create`, `update`, `softDelete`) for blog posts.
    * Preloads categories or creates them if missing.
    * Publishes `BLOG_POST_ADDED_EVENT` after blog post creation (subscription).
  
  2. [**BlogPostsResolver**](libs/blog-posts/src/lib/resolvers/blog-posts.resolver.ts)

    * Exposes GraphQL `@Query`, `@Mutation`, and `@Subscription` endpoints for blog posts.
    * Applies `GraphqlExceptionsFilter`.
  
  3. [**BlogPostsRelationsResolver**](libs/blog-posts/src/lib/resolvers/blog-posts-relations.resolver.ts)

    * Defines a method to fetch associated categories per blog post.
    * Delegates to a DataLoader to batch and cache relational loads.
  
  4. [**CategoriesByBlogPostLoader**](libs/blog-posts/src/lib/data-loader/categories-by-blog-post.loader.ts)

    * A request‑scoped DataLoader that batches `Category[]` loads for multiple blog post IDs.
    * Avoids the $N+1$ problem by issuing a single DB query per batch.

##### 3. Common Library
* **Purpose**: Shared utilities and providers used across feature modules.
* **Sub‑modules**:

  * [**PubSubModule**](libs/common/src/lib/pub-sub/pub-sub.module.ts): Exports a `PubSub` instance (scoped application‑wide) for event publishing/subscribing.
  * [**LoggerModule**](libs/common/src/lib/logger/logger.module.ts): Exports `CustomLogger` (transient scoped console logger)

#### NX Dependencies Graph:

<img src="docs/dependencies-graph.png" height="300px">
