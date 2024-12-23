import { Pause, Play } from 'iconsax-react';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useInView } from 'react-intersection-observer';

export const VideoPlayer = props => {
  const player = useRef();
  const [play, setPlay] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    props?.autoPlay && setPlay(inView);
  }, [inView]);
  return (
    <div
      className="w-full h-full rounded-lg shadow overflow-hidden relative group"
      ref={ref}
    >
      <ReactPlayer
        url={props?.url}
        playing={play}
        ref={player}
        onError={e => (e.target.src = '/Video-Placeholder.mp4')}
        height="100%"
        width="100%"
        style={{ objectFit: 'cover' }}
      />
      <div
        className={`absolute inset-0 bg-black/60 group-hover:opacity-100 transition-opacity duration-150 text-white flex justify-center items-center cursor-pointer ${
          play ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {play ? (
          <button type="button" onClick={() => setPlay(false)}>
            <Pause size={32} />
          </button>
        ) : (
          <button type="button" onClick={() => setPlay(true)}>
            <Play size={32} />
          </button>
        )}
      </div>
    </div>
  );
};
