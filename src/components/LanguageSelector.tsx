'use client';

import {useRouter, usePathname, useParams} from 'next/navigation';

const LanguageSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { lng } = useParams<{ lng: string }>()

  const changeLanguage = (lng: string) => {
    const newPathname = `/${lng}${pathname.slice(3)}`;
    router.push(newPathname);
  };

  return (
    <div className="relative inline-block">
      <select
        className="bg-transparent text-white border border-white rounded px-2 py-1 focus:outline-none hover:bg-[#ffffff14]"
        onChange={(e) => changeLanguage(e.target.value)}
        value={lng}
      >
        <option value="en" className="bg-gray-800 text-white">EN</option>
        <option value="ua" className="bg-gray-800 text-white">UA</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
