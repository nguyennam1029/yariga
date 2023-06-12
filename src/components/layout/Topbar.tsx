import Image from "next/image";
import Link from "next/link";
import React from "react";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-whiteFC">
      <div className="flex items-center gap-32">
        <Link href="#" className="flex items-center gap-3">
          <svg
            width="39"
            height="36"
            viewBox="0 0 39 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.8398 16.9045C30.0314 17.2378 30.1322 17.6155 30.1322 18C30.1322 18.3845 30.0314 18.7622 29.8398 19.0955L25.531 26.5289C25.3385 26.8608 25.0622 27.1363 24.7298 27.3278C24.3975 27.5194 24.0206 27.6204 23.637 27.6206L15.0656 27.6206C14.6846 27.6177 14.3109 27.5155 13.9815 27.324C13.652 27.1326 13.3782 26.8585 13.187 26.5289L8.87818 19.0955C8.68663 18.7622 8.58582 18.3845 8.58582 18C8.58582 17.6155 8.68663 17.2378 8.87818 16.9045L11.2583 12.8001L16.5546 21.8575C16.6418 22.0125 16.7691 22.1413 16.9232 22.2302C17.0772 22.3191 17.2524 22.3649 17.4302 22.3628L21.2877 22.3628C21.4656 22.3649 21.6408 22.3191 21.7948 22.2302C21.9489 22.1413 22.0762 22.0125 22.1634 21.8575L24.0921 18.4899C24.1795 18.3386 24.2255 18.167 24.2255 17.9923C24.2255 17.8176 24.1795 17.646 24.0921 17.4947L15.3973 2.45044C15.0956 1.92866 14.662 1.4954 14.14 1.1941C13.618 0.89281 13.0259 0.734085 12.4232 0.733856L11.644 0.733856C10.9544 0.733593 10.2769 0.91492 9.6797 1.25959C9.08244 1.60427 8.58648 2.10014 8.24169 2.69732L0.526706 16.0404C0.181668 16.6372 -7.84862e-07 17.3145 -7.54727e-07 18.0039C-7.24593e-07 18.6933 0.181668 19.3705 0.526706 19.9673L8.2417 33.3104C8.58697 33.9069 9.08314 34.402 9.68036 34.7459C10.2776 35.0899 10.9548 35.2707 11.644 35.27L27.074 35.27C27.7636 35.2703 28.441 35.0889 29.0383 34.7443C29.6355 34.3996 30.1315 33.9037 30.4763 33.3065L38.1913 19.9635C38.5363 19.3666 38.718 18.6894 38.718 18C38.718 17.3106 38.5363 16.6334 38.1913 16.0365L30.4763 2.69346C30.1315 2.09627 29.6355 1.60041 29.0383 1.25573C28.441 0.911059 27.7636 0.729739 27.074 0.729998L20.5162 0.729999L29.8398 16.9045Z"
              fill="#475BE8"
            />
          </svg>
          <h1 className="text-2xl text-primaryText">Yariga</h1>
        </Link>
        <div className="bg-grayF4 relative min-w-[406px] w-full rounded-lg">
          <span className="absolute left-3 top-2/4 -translate-y-2/4">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.803 13.8637C13.0959 14.1566 13.5708 14.1566 13.8637 13.8637C14.1566 13.5708 14.1566 13.0959 13.8637 12.803L12.803 13.8637ZM11.25 7C11.25 9.34721 9.34721 11.25 7 11.25V12.75C10.1756 12.75 12.75 10.1756 12.75 7H11.25ZM7 11.25C4.65279 11.25 2.75 9.34721 2.75 7H1.25C1.25 10.1756 3.82436 12.75 7 12.75V11.25ZM2.75 7C2.75 4.65279 4.65279 2.75 7 2.75V1.25C3.82436 1.25 1.25 3.82436 1.25 7H2.75ZM7 2.75C9.34721 2.75 11.25 4.65279 11.25 7H12.75C12.75 3.82436 10.1756 1.25 7 1.25V2.75ZM13.8637 12.803L11.0719 10.0113L10.0113 11.0719L12.803 13.8637L13.8637 12.803Z"
                fill="#808191"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search Property, Customer etc"
            className="w-full py-3 pr-3 bg-transparent outline-none pl-9 placeholder:text-gray80 placeholder:text-sm "
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Image src="/bell.png" alt="bell" width={20} height={20} />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#EB5757]"></span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <Image
              src="/avatar.jpg"
              alt="avatar"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="">
            <h2 className="text-sm font-semibold text-primaryText mb-[-4px]">
              Hawkins Maru
            </h2>
            <span className="text-sm text-gray80">Company Manager</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
