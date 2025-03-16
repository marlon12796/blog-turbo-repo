import { gql } from '@urql/next';

export const getPostsQuery = gql`
  query {
    posts {
      id
      title
      thumbnail
      content
      createdAt
    }
  }
`;
