import { EmojiSad } from 'iconsax-react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="flex flex-col gap-2 h-screen justify-center items-center text-center">
      <div className="text-red-400">
        <EmojiSad size="32" />
      </div>
      <div>
        <p className="text-gray-600 py-2 text-center">Lỗi rồi!</p>
        <Link to="/timeline">
          <p className="px-4 py-2 bg-blue-600 rounded-lg font-bold text-white">
            Trở lại
          </p>
        </Link>
      </div>
    </div>
  );
}
