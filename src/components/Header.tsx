import Link from "next/link";

const Header = () => {

    return (
        <div className='sticky bg-[#1976d2] top-0 z-50'>
            <div className='container'>
                <div className='flex items-center justify-between px-4 py-4'>
                    <div className='flex items-center gap-2'>
                        <Link href="/"  className='text-white hover:bg-[#ffffff14] p-1 duration-300'>
                        Home
                        </Link>
                        <Link href="/products" className='text-white hover:bg-[#ffffff14] p-1 duration-300'>
                            Products
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
