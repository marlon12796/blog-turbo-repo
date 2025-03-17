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
