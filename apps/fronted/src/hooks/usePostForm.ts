import { PostFormSchema } from '@/lib/schemas/postForm.schema';
import { PostFormState } from '@/lib/types/formState';
import { initialFormPost, postFormReducer } from '@/reducers/postForm.reducer';
import { ChangeEvent, FormEvent, useReducer, useRef, useState } from 'react';
import { usePostMutation } from './useToggleMutation';

export const usePostForm = (initialPost?: PostFormState) => {
  const [formState, dispatch] = useReducer(postFormReducer, initialPost ?? initialFormPost);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { onToggleSubmit } = usePostMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (data: PostFormState['data']) => {
    const validationResult = PostFormSchema.partial().safeParse(data);
    if (!validationResult.success) {
      dispatch({
        type: 'SET_VALIDATION_ERRORS',
        errors: validationResult.error.flatten().fieldErrors
      });
    } else {
      dispatch({
        type: 'SET_VALIDATION_ERRORS',
        errors: { [Object.keys(data)[0]]: '' }
      });
    }
  };
  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updatedData = { [name]: value };
    validateForm(updatedData);
    dispatch({ type: 'UPDATE_FIELD', field: name, value });
  };
  const onCheckboxChange = () => {
    validateForm({ published: !formState.data.published });
    dispatch({ type: 'TOGGLE_PUBLISHED' });
  };
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);
    if (formState.data.thumbnailUrl) URL.revokeObjectURL(formState.data.thumbnailUrl);
    dispatch({ type: 'CHANGE_THUMBNAIL', thumbnail: file, thumbnailUrl: objectUrl });
    validateForm({ thumbnail: file, thumbnailUrl: objectUrl });
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const validation = PostFormSchema.safeParse(formState.data);
    if (!validation.success) {
      dispatch({
        type: 'SET_VALIDATION_ERRORS',
        errors: validation.error.flatten().fieldErrors
      });
      setIsSubmitting(false);
      return;
    }
    try {
      await onToggleSubmit(validation.data);
      if (fileInputRef.current) fileInputRef.current.value = '';
      dispatch({ type: 'CLEAR_FORM' });
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    formState,
    isSubmitting,
    onInputChange,
    onCheckboxChange,
    onImageChange,
    fileInputRef,
    onSubmit
  };
};
