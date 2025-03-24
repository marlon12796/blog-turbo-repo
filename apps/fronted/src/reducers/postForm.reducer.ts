import { type PostFormState } from '@/lib/types/formState';

export const initialFormPost: PostFormState = {
  data: {
    title: '',
    content: '',
    thumbnail: undefined,
    thumbnailUrl: '',
    tags: '',
    published: false
  },
  errors: {}
};
type Action =
  | { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'SET_VALIDATION_ERRORS'; errors: PostFormState['errors'] }
  | { type: 'CLEAR_FORM' }
  | { type: 'TOGGLE_PUBLISHED' }
  | { type: 'CHANGE_THUMBNAIL'; thumbnail: File; thumbnailUrl: string };
export const postFormReducer = (state: PostFormState, action: Action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value }
      };
    case 'CHANGE_THUMBNAIL':
      return {
        ...state,
        data: { ...state.data, thumbnail: action.thumbnail, thumbnailUrl: action.thumbnailUrl }
      };
    case 'SET_VALIDATION_ERRORS':
      return { ...state, errors: { ...state.errors, ...action.errors } };
    case 'CLEAR_FORM':
      return initialFormPost;
    case 'TOGGLE_PUBLISHED':
      return {
        ...state,
        data: { ...state.data, published: !state.data.published }
      };
    default:
      return state;
  }
};
