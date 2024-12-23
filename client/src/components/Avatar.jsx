import ImageBox from './ImageBox';

export const Avatar = props => {
  return (
    <div className="flex relative">
      <div className="w-10 h-10">
        <ImageBox
          className="w-full h-full rounded-full object-cover"
          src={props?.src || '/avatar.png'}
        />
        <span
          className={`bottom-0 left-7 absolute  w-3.5 h-3.5  border-2 border-white dark:border-gray-800 rounded-full ${
            props?.status !== 'offline' ? 'bg-blue-600' : 'bg-slate-600'
          }`}
        />
      </div>
    </div>
  );
};
