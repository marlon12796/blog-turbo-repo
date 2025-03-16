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
