import Link from "next/link";
import { useTranslation } from '@/app/i18n';
import LanguageSelector from "@/components/LanguageSelector";

type HeaderProps =  {
    lng: string
};

const Header: React.FC<HeaderProps>  = async ({ lng } ) => {
    const { t } = await useTranslation(lng);

    return (
        <div className='sticky bg-[#1976d2] top-0 z-50'>
            <div className='container'>
                <div className='flex items-center justify-between px-4 py-4'>
                    <div className='flex items-center gap-2'>
                        <Link href="/"  className='text-white hover:bg-[#ffffff14] p-1 duration-300'>
                            {t('Home')}
                        </Link>
                        <Link href="/products" className='text-white hover:bg-[#ffffff14] p-1 duration-300'>
                            {t('Products')}
                        </Link>
                    </div>
                    <LanguageSelector />
                </div>
            </div>
        </div>
    );
};

export default Header;
