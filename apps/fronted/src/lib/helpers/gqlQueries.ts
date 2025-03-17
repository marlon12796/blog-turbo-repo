import { gql } from '@urql/next';

export const getPostsQuery = gql`
  query Posts($offset: Int, $limit: Int) {
    posts(offset: $offset, limit: $limit) {
      slug
      id
      thumbnail
      title
      updatedAt
      published
      createdAt
      content
    }
    postCount
  }
`;

export const getPostByIdQuery = gql`
  query Post($postId: Int!) {
    post(id: $postId) {
      author {
        email
        name
      }
      content
      createdAt
      id
      title
      thumbnail
      published
      slug
      tags {
        name
        id
      }
    }
  }
`;
export const createUserMutation = gql`
  mutation Mutation($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      avatar
      bio
      createdAt
      email
    }
  }
`;
