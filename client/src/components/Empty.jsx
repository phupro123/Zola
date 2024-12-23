import { NoteAdd } from 'iconsax-react';
export default function Empty() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-96">
      <NoteAdd size={18} />
      <p>Chưa có dữ liệu</p>
    </div>
  );
}
