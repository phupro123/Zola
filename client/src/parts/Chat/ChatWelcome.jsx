import { Outlet, Link } from 'react-router-dom';

export default function ChatWelcome() {
  return (
    <div className="flex items-center justify-center h-screen p-4 mx-auto">
      <div>
        <p className="font-bold text-3xl">Bắt đầu nhắn tin</p>
        <p className="text-gray-500 text-sm font-medium text-justify my-2 w-3/4">
          Chọn từ các cuộc trò chuyện hiện có của bạn hoặc bắt đầu một cuộc trò
          chuyện mới.
        </p>
        <Link to="/messages/new">
          <button
            className="bg-blue-600 hover:bg-blue-700 transition-colors duration-150 text-white text-sm font-bold px-4 py-2 rounded-lg"
            type="button"
          >
            Tạo nhóm mới
          </button>
        </Link>
        <Link to="/conversations">
          <button
            className="bg-white hover:bg-gray-50 ml-2 transition-colors duration-150  text-sm font-bold px-4 py-2 rounded-lg"
            type="button"
          >
            Hộp thoại
          </button>
        </Link>
      </div>
    </div>
  );
}
