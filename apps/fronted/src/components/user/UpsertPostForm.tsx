'use client';

import SubmitButton from '../auth/SubmitButton';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { Textarea } from '../ui/Textarea';
import { Loader2 } from 'lucide-react';
import { usePostForm } from '@/hooks/usePostForm';
import { PostFormState } from '@/lib/types/formState';

const UpsertPostForm = ({ initialPost }: { initialPost?: PostFormState }) => {
  const { formState, isSubmitting, onSubmit, onCheckboxChange, fileInputRef, onImageChange, onInputChange } = usePostForm(initialPost);
  const { data: postValuesForm, errors } = formState;
  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      {/* Título */}
      <div className='grid gap-2'>
        <Label htmlFor='title'>Title</Label>
        <Input name='title' placeholder='Enter The Title of Your Post' value={postValuesForm.title} onChange={onInputChange} />
        {errors.title && <p className='text-red-500 text-sm'>{errors.title[0]}</p>}
      </div>

      {/* Contenido */}
      <div className='grid gap-2'>
        <Label htmlFor='content'>Content</Label>
        <Textarea
          name='content'
          placeholder='Write Your Post Content Here'
          rows={6}
          value={postValuesForm.content}
          onChange={onInputChange}
        />
        {errors.content && <p className='text-red-500 text-sm'>{errors.content[0]}</p>}
      </div>

      {/* Imagen */}
      <div className='grid gap-2'>
        <Label htmlFor='thumbnail'>Thumbnail</Label>
        <Input type='file' name='thumbnail' accept='image/*' onChange={onImageChange} ref={fileInputRef} />
        {postValuesForm.thumbnailUrl && (
          <img src={postValuesForm.thumbnailUrl} alt='Thumbnail Preview' className='w-32 h-32 object-cover rounded-md' />
        )}
        {errors.thumbnail && <p className='text-red-500 text-sm'>{errors.thumbnail[0]}</p>}
      </div>

      {/* Etiquetas */}
      <div className='grid gap-2'>
        <Label htmlFor='tags'>Tags (comma-separated)</Label>
        <Input name='tags' placeholder='Enter tags (comma-separated)' value={postValuesForm.tags} onChange={onInputChange} />
        {errors.tags && <p className='text-red-500 text-sm'>{errors.tags[0]}</p>}
      </div>

      {/* Publicado */}
      <div className='flex items-center'>
        <input className='mx-2 w-4 h-4' type='checkbox' name='published' checked={postValuesForm.published} onChange={onCheckboxChange} />
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
          <span>{initialPost?.data.postId ? 'Update' : 'Save'}</span>
        )}
      </SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
