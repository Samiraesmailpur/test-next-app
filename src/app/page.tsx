import Link from 'next/link'

const Home = () => {

  return (
    <div className='container'>
      <div className='flex align-center justify-center text-center min-h-[80vh] flex-col'>
        <h3 className='text-4xl mb-4'>
          Welcome
        </h3>
        <p className='text-xl mb-3'>
          We offer a variety of products to suit your needs. Explore and enjoy!
        </p>

        <Link
          className='max-w-md rounded-lg text-base py-2.5	px-5 bg-[#1976d2] text-white my-0 mx-auto hover:bg-[#196ab9] duration-300'
          href={`/products`}
        >
          Explore Products
        </Link>
      </div>
    </div>
  );
};

export default Home;
