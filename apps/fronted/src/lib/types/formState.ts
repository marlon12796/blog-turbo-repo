export type FormState = {
  data: {
    name?: string;
    email?: string;
    password?: string;
  };
  errors: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
};
export type PostFormState = {
  data: {
    postId?: number;
    title?: string;
    content?: string;
    thumbnail?: File | null;
    tags?: string;
    published?: boolean;
    thumbnailUrl?: string;
  };

  errors: {
    title?: string[];
    content?: string[];
    thumbnail?: string[];
    tags?: string[];
    isPublished?: string[];
    _form?: string[];
  };
};
