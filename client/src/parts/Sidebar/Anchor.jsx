import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { formatNumber } from '../../utils';

export function Anchor(props) {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  return (
    <Link to={`/${props?.path}`}>
      <div className="p-2.5 xl:m-0 m-auto bg-transparent hover:bg-gray-100 w-fit rounded-xl delay-75 duration-100 transition-all">
        <button className="flex xl:rounded-full items-center outline-none">
          <div className="relative">
            <div className={`${path === props?.path && 'text-blue-600'}`}>
              {props?.icon}
            </div>
            {props?.badges > 0 && (
              <div className="h-4 w-4 rounded-full absolute -top-2 -right-2 flex  justify-center items-center bg-red-400">
                <span className="text-sm text-white">
                  {formatNumber(props?.badges)}
                </span>
              </div>
            )}
          </div>
          <span
            className={clsx(
              'hidden pl-4 xl:inline w-max',
              path === props?.path && 'font-semibold text-blue-600',
            )}
          >
            {props?.name}
          </span>
        </button>
      </div>
    </Link>
  );
}
