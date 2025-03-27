import { gql } from '@urql/next';

export const getPostsQuery = gql`
  query GetAllPosts($offset: Int, $limit: Int) {
    getAllPosts(offset: $offset, limit: $limit) {
      slug
      id
      thumbnail
      title
      updatedAt
      published
      createdAt
      content
    }
    countAllPosts
  }
`;

export const getPostByIdQuery = gql`
  query GetPostById($postId: Int!) {
    getPostById(postId: $postId) {
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

export const signInMutation = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      name
      id
      email
      avatar
      accessToken
    }
  }
`;

export const getCommentsByPostId = gql`
  query Comments($postId: Int!, $offset: Int, $limit: Int, $commentCountPostId: Int!) {
    comments(postId: $postId, offset: $offset, limit: $limit) {
      content
      createdAt
      author {
        bio
        avatar
        createdAt
      }
      id
      updatedAt
    }
    commentCount(postId: $commentCountPostId)
  }
`;
export const createCommentPost = gql`
  mutation CreateComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      content
      createdAt
      id
      updatedAt
    }
  }
`;
export const getPostLikes = gql`
  query Query($postId: Int!, $userLikedPost: Int!) {
    postLikesCount(postId: $postId)
    userLikedPost(postId: $userLikedPost)
  }
`;
export const likePostMutation = gql`
  mutation LikePost($postId: Int!) {
    likePost(postId: $postId)
  }
`;

export const unlikePostMutation = gql`
  mutation UnlikePost($postId: Int!) {
    unlikePost(postId: $postId)
  }
`;
export const getUserPosts = gql`
  query GetUserPosts($offset: Int, $limit: Int) {
    getUserPosts(offset: $offset, limit: $limit) {
      content
      createdAt
      id
      published
      slug
      thumbnail
      title
      _count {
        totalComments
        totalLikes
      }
    }
    countUserPosts
  }
`;
export const createPostMutation = gql`
  mutation CreateNewPost($createPostInput: CreatePostInput!) {
    createNewPost(createPostInput: $createPostInput) {
      authorId
      content
      createdAt
      published
      id
    }
  }
`;
export const updatePostMutation = gql`
  mutation Mutation($updatePostInput: UpdatePostInput!) {
    updatePost(updatePostInput: $updatePostInput)
  }
`;
export const deletePostMutation = gql`
  mutation DeletePost($postId: Int!) {
    deletePost(postId: $postId)
  }
`;
