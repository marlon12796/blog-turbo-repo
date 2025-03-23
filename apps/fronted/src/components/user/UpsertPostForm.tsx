'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import SubmitButton from '../auth/SubmitButton';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { PostFormState } from '@/lib/types/formState';
import { PostFormSchema } from '@/lib/schemas/postForm.schema';

const UpsertPostForm = () => {
  const [formState, setFormState] = useState<PostFormState['data']>({
    title: '',
    content: '',
    thumbnail: null,
    thumbnailUrl: '',
    tags: '',
    published: false
  });

  const [errors, setErrors] = useState<PostFormState['errors']>({});
  const validateForm = (data: PostFormState['data']) => {
    const validationResult = PostFormSchema.partial().safeParse(data);
    if (!validationResult.success) {
      setErrors((err) => ({ ...err, ...validationResult.error.flatten().fieldErrors }));
    } else {
      const name = Object.keys(data).at(0);
      if (name === undefined) {
        setErrors({});
        return;
      }
      setErrors((err) => ({ ...err, [name]: '' }));
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const updatedData = { ...formState, [name]: value };
    validateForm({ [name]: value });
    setFormState(updatedData);
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedData = { ...formState, content: event.target.value };
    validateForm({ content: event.target.value });
    setFormState(updatedData);
  };

  const handleCheckboxChange = () => {
    const updatedData = { ...formState, published: !formState.published };
    validateForm({ published: !formState.published });
    setFormState(updatedData);
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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationResult = PostFormSchema.safeParse(formState);

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    console.log(formState);
  };
  return (
    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
      {/* Título */}
      <div className='grid gap-2'>
        <Label htmlFor='title'>Title</Label>
        <Input name='title' placeholder='Enter The Title of Your Post' value={formState.title} onChange={handleInputChange} />
        {errors.title && <p className='text-red-500 text-sm'>{errors.title[0]}</p>}
      </div>

      {/* Contenido */}
      <div className='grid gap-2'>
        <Label htmlFor='content'>Content</Label>
        <Textarea
          name='content'
          placeholder='Write Your Post Content Here'
          rows={6}
          value={formState.content}
          onChange={handleContentChange}
        />
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
        <Input name='tags' placeholder='Enter tags (comma-separated)' value={formState.tags} onChange={handleInputChange} />
        {errors.tags && <p className='text-red-500 text-sm'>{errors.tags[0]}</p>}
      </div>

      {/* Publicado */}
      <div className='flex items-center'>
        <input className='mx-2 w-4 h-4' type='checkbox' name='published' checked={formState.published} onChange={handleCheckboxChange} />
        <Label htmlFor='published'>Published Now</Label>
      </div>

      {/* Botón de envío */}
      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
