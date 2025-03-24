'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import SubmitButton from '../auth/SubmitButton';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { PostFormState } from '@/lib/types/formState';
import { PostFormSchema } from '@/lib/schemas/postForm.schema';
import { createPostMutation } from '@/lib/helpers/gqlQueries';
import { useMutation } from '@urql/next';
import { uploadThumbnail } from '@/lib/helpers/upload';
import { Loader2 } from 'lucide-react';

const UpsertPostForm = () => {
  const initialForm: PostFormState['data'] = {
    title: '',
    content: '',
    thumbnail: undefined,
    thumbnailUrl: '',
    tags: '',
    published: false
  };
  const [formState, setFormState] = useState(initialForm);
  const [errors, setErrors] = useState<PostFormState['errors']>({});
  const [createPostResult, createPost] = useMutation(createPostMutation);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (data: PostFormState['data']) => {
    const validationResult = PostFormSchema.partial().safeParse(data);
    !validationResult.success
      ? setErrors((err) => ({ ...err, ...validationResult.error.flatten().fieldErrors }))
      : setErrors((err) => ({ ...err, [Object.keys(data)[0]]: '' }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updatedData = { ...formState, [name]: value };
    validateForm({ [name]: value });
    setFormState(updatedData);
  };

  const handleCheckboxChange = () => {
    validateForm({ published: !formState.published });
    setFormState({ ...formState, published: !formState.published });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const objectUrl = URL.createObjectURL(file);

    if (formState.thumbnailUrl) URL.revokeObjectURL(formState.thumbnailUrl);
    const updatedData = { ...formState, thumbnail: file, thumbnailUrl: objectUrl };
    validateForm({ thumbnail: file, thumbnailUrl: objectUrl });
    setFormState(updatedData);
  };
  const clearForm = () => {
    setFormState(initialForm);
    setErrors({});
    setIsSubmitting(false);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const validation = PostFormSchema.safeParse(formState);
    if (!validation.success) return setErrors(validation.error.flatten().fieldErrors);
    const url = await uploadThumbnail(validation.data.thumbnail);
    await createPost({ createPostInput: { ...validation.data, thumbnail: url } });
    clearForm();
  };
  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      {/* Título */}
      <div className='grid gap-2'>
        <Label htmlFor='title'>Title</Label>
        <Input name='title' placeholder='Enter The Title of Your Post' value={formState.title} onChange={handleChange} />
        {errors.title && <p className='text-red-500 text-sm'>{errors.title[0]}</p>}
      </div>

      {/* Contenido */}
      <div className='grid gap-2'>
        <Label htmlFor='content'>Content</Label>
        <Textarea name='content' placeholder='Write Your Post Content Here' rows={6} value={formState.content} onChange={handleChange} />
        {errors.content && <p className='text-red-500 text-sm'>{errors.content[0]}</p>}
      </div>

      {/* Imagen */}
      <div className='grid gap-2'>
        <Label htmlFor='thumbnail'>Thumbnail</Label>
        <Input type='file' name='thumbnail' accept='image/*' onChange={handleImageChange} />
        {formState.thumbnailUrl && (
          <img src={formState.thumbnailUrl} alt='Thumbnail Preview' className='w-32 h-32 object-cover rounded-md' />
        )}
        {errors.thumbnail && <p className='text-red-500 text-sm'>{errors.thumbnail[0]}</p>}
      </div>

      {/* Etiquetas */}
      <div className='grid gap-2'>
        <Label htmlFor='tags'>Tags (comma-separated)</Label>
        <Input name='tags' placeholder='Enter tags (comma-separated)' value={formState.tags} onChange={handleChange} />
        {errors.tags && <p className='text-red-500 text-sm'>{errors.tags[0]}</p>}
      </div>

      {/* Publicado */}
      <div className='flex items-center'>
        <input className='mx-2 w-4 h-4' type='checkbox' name='published' checked={formState.published} onChange={handleCheckboxChange} />
        <Label htmlFor='published'>Published Now</Label>
      </div>

      {/* Botón de envío */}
      <SubmitButton disabled={isSubmitting}>
        {isSubmitting ? (
          <div className='flex items-center'>
            <Loader2 className='w-5 h-5 animate-spin mr-2' />
            Processing...
          </div>
        ) : (
          <span>Save</span>
        )}
      </SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
