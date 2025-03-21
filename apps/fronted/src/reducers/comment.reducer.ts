export type CommentFormState = {
  comment: string;
  open: boolean;
  errors: {
    content?: string[];
    _form?: string[];
  };
};
export const initialState: CommentFormState = {
  open: false,
  errors: {
    content: [],
    _form: []
  },
  comment: ''
};
type CommentFormAction =
  | { type: 'OPEN_DIALOG' }
  | { type: 'CLOSE_DIALOG' }
  | { type: 'SET_COMMENT'; payload: string }
  | { type: 'SET_ERRORS'; payload: Partial<CommentFormState['errors']> }
  | { type: 'RESET_FORM' };
export const commentFormReducer = (state: CommentFormState, action: CommentFormAction) => {
  switch (action.type) {
    case 'OPEN_DIALOG':
      return { ...state, open: true };
    case 'CLOSE_DIALOG':
      return { ...state, open: false };
    case 'SET_COMMENT':
      return { ...state, comment: action.payload };
    case 'SET_ERRORS':
      if (Object.keys(action.payload).length === 0) return { ...state, errors: { content: [], _form: [] } };
      return { ...state, errors: { ...state.errors, ...action.payload } };
    case 'RESET_FORM':
      return { comment: '', open: false, errors: { content: [], _form: [] }, isLoading: false };
    default:
      return state;
  }
};
