import { useParams } from 'react-router-dom';
import ImageBox from '../../components/ImageBox';
import Empty from '../../components/Empty';
import { useUserMedia } from '../../hooks/media';
import ReactPlayer from 'react-player';
import Loading from '../../components/Loading';

export default function UserGallery() {
  const { username } = useParams();
  const { data, isLoading } = useUserMedia(username);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {data?.data?.data?.length === 0 ? (
            <Empty />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
              {data?.data?.data?.map(file => (
                <div>
                  {file?.resource_type === 'image' ? (
                    <>
                      {file?.url && (
                        <ImageBox
                          className="h-full max-w-full rounded-lg object-cover"
                          src={file?.url}
                          alt=""
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {file?.url && (
                        <ReactPlayer
                          url={file?.url}
                          controls
                          height="100%"
                          width="100%"
                          style={{
                            objectFit: 'cover',
                            borderRadius: '8px',
                            overflow: 'hidden',
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
