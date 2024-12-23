import { CloseCircle } from 'iconsax-react';
import React, { useEffect } from 'react';
import { Portal } from 'react-portal';

const LightBoxCustom = props => {
  useEffect(() => {
    props?.open
      ? (document.body.style.overflowY = 'hidden')
      : (document.body.style.overflowY = 'auto');
  }, [props.open]);
  if (props?.open)
    return (
      <Portal>
        <div className="flex justify-center items-center fixed w-screen h-screen inset-0 bg-black z-50">
          <button
            className="absolute top-1 right-1 text-white hover:text-red-300"
            type="button"
            onClick={props?.close}
          >
            <CloseCircle variant="Bulk" />
          </button>
          <img src={props?.src} alt="" className="h-full object-contain" />
        </div>
      </Portal>
    );
};
function ImageBox(props) {
  const [open, setOpen] = React.useState(false);

  const onClick = e => {
    e.stopPropagation();
    setOpen(true);
  };
  return (
    <>
      <img
        onClick={onClick}
        onError={e => (e.target.src = '/placeholder.webp')}
        {...props}
      />
      <LightBoxCustom
        open={open}
        close={() => setOpen(false)}
        src={props?.src}
      />
      {/* <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src: props?.src }]}
      /> */}
    </>
  );
}

export default ImageBox;
