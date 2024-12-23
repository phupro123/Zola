import React, { useEffect, useMemo } from 'react';
import { Image, EmojiHappy, AttachCircle, CloseCircle } from 'iconsax-react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import Files from '../components/Files';
import { useCreatePost } from '../hooks/post';

const formatMedia = files => {
  return Array.from(files || [])?.map(file => {
    return {
      url: URL.createObjectURL(file),
      resource_type: file?.type.split('/')[0],
    };
  });
};

function AddPostPage() {
  const { mutate } = useCreatePost();
  const defaultValues = {
    content: '',
  };
  const { register, handleSubmit, watch, setFocus, resetField } = useForm({
    defaultValues,
  });
  const content = watch('content');

  const media = useMemo(() => {
    return formatMedia(watch('media'));
  }, [watch('media')]);

  const onSubmit = data => {
    const payload = {
      files: Array.from(data?.media),
      content: data?.content,
      scope: data?.scope,
    };
    mutate(payload);
  };

  useEffect(() => {
    setFocus('content');
  }, [setFocus]);
  return (
    <div className="px-2">
      <div className="font-bold text-2xl my-5 text-gray-800">Viết nhật ký</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col text-gray-800 gap-4">
          <div className="flex items-center text-gray-500 gap-4">
            <label htmlFor="media" className="cursor-pointer">
              <Image size={18} />
              <input
                type="file"
                id="media"
                className="hidden"
                multiple
                accept="video/*,image/*"
                {...register('media')}
              />
            </label>

            <button className="" type="button">
              <EmojiHappy size={18} />
            </button>
            <button className="" type="button">
              <AttachCircle size={18} />
            </button>
          </div>
          {media?.length > 0 && (
            <>
              <button
                type="button"
                className="hover:text-red-600 ml-auto"
                onClick={() => resetField('media')}
              >
                <CloseCircle size={18} variant="Bulk" />
              </button>
              <Files attach_files={media} />
            </>
          )}
          <div>
            <div className="ml-auto text-gray-400 text-xs mb-1">
              {content?.length}/300
            </div>
            <TextareaAutosize
              id="content"
              className="bg-gray-50 p-4 h-80 outline-none rounded-xl resize-none w-full focus:outline-blue-500 focus:outline-1"
              spellCheck="false"
              placeholder="Nhập nội dung bài viết..."
              autoFocus
              minRows={8}
              {...register('content', { required: true })}
            />
          </div>

          <div className="flex w-full justify-end mb-4">
            <select
              name="scope"
              id="scope"
              className="outline-none cursor-pointer rounded-lg border bg-white py-2 px-4 font-bold text-sm hover:bg-gray-50 transition-colors duration-150"
              {...register('scope')}
            >
              <option value="public">Tât cả</option>
              <option value="private">Riêng tư</option>
            </select>
            <button
              type="submit"
              className="py-2 px-4 rounded-lg font-bold cursor-pointer text-white text-sm ml-2 bg-blue-500 hover:bg-blue-600 transition-colors duration-150"
            >
              Đăng bài
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddPostPage;
