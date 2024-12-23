import Slider from 'react-slick';
import {
  ArrowRight2,
  ArrowLeft2,
  VideoCircle,
  PauseCircle,
} from 'iconsax-react';
import ReactPlayer from 'react-player';
import ImageBox from './ImageBox';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { VideoPlayer } from '../components/VideoPlayer';

export default function Files(props) {
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  };
  const refSlider = useRef(null);
  const refPlayer = useRef(null);
  const next = e => {
    e.stopPropagation();
    refSlider?.current?.slickNext();
  };
  const previous = e => {
    e.stopPropagation();
    refSlider?.current?.slickPrev();
  };

  const [videoPlaying, setVideoPlaying] = useState(false);

  const toggleVideo = () => {
    setVideoPlaying(state => !state);
  };
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    setVideoPlaying(inView);
  }, [inView]);
  return (
    <div className="w-full relative">
      <Slider {...settings} ref={refSlider}>
        {props?.attach_files?.map((file, index) => {
          if (file?.resource_type === 'image') {
            return (
              <div
                className="h-96 rounded-xl overflow-hidden border shadow"
                key={index}
                onClick={e => e.stopPropagation()}
              >
                <ImageBox
                  className="object-cover h-full w-full"
                  src={file?.url || '/placeholder.webp'}
                  alt=""
                />
              </div>
            );
          }
          if (file?.resource_type === 'video') {
            return <VideoPlayer url={file?.url} />;
          }
        })}
      </Slider>
      {props?.attach_files?.length > 1 && (
        <div className="w-full flex justify-center gap-2 mt-8">
          <button
            type="button"
            className="p-1 bg-gray-100 rounded-lg"
            onClick={previous}
          >
            <ArrowLeft2 size={18} />
          </button>
          <button
            type="button"
            className="p-1 bg-gray-100 rounded-lg"
            onClick={next}
          >
            <ArrowRight2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
