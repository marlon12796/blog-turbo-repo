import Image from 'next/image';
const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-sky-500 to-indigo-500 text-white pt-12">
      <div className="container px-8 justify-center mx-auto flex flex-col md:flex-row items-center flex-wrap ">
        {/* Left col */}
        <div className="flex flex-col w-full justify-center items-start md:w-[45%] text-center md:text-left">
          <p className="capitalize tracking-wide w-full">Explore insights , tutorials, and stories for curious minds like yours</p>
          <h2 className="my-5 text-5xl font-bold leading-tight">Welcome To Marlon Ureta Dev Blog</h2>

          <p className="capitalize leading-normal text-xl">Join a community that thrives on learning, creating and growing together. </p>
        </div>

        {/* right col */}
        <div className="w-full flex justify-center text-center py-7 md:w-[55%] md:justify-end">
          <Image src="/hero-image.png" alt="hero section" className="w-full md:w-3/5" width={700} height={700} />
        </div>
      </div>
      <div className="relative -mt-10 pt-12 lg:-mt-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1428 174">
          <g fill="#FFF">
            <path d="M-2 44c90.73.93 147.91 27.19 291.91 59.91q144 32.72 467.09 22.82-434.49 110.29-759-7.76" opacity=".1" />
            <path d="M98 148.7Q364.12 100 544.2 89.59 724.3 79.16 977 99.08q-71.9 1.57-362.3 56.16-290.4 54.6-516.7-6.53" opacity=".1" />
            <path d="M1044 95.65c84.83-22.32 233.08-34.04 393-11.48V164q-251.74-63.09-393-68.35" opacity=".2" />
            <path d="M-3.54 110.03q84.94 28.77 123.36 37.83c57.63 13.64 110.48 18.44 148.21 21.61 39.33 3.3 124.6 2.34 189-1.8q38.6-2.48 95.9-10.9 58.23-9.24 79.87-13.77c27.11-5.67 75.7-17.49 90.8-20.86 52.87-11.81 91.24-23.6 128.72-30.23 66.38-11.74 99.36-13.39 154.86-15.48q74.28 1.57 110.06 4.97c40.46 3.83 87.38 12.43 114.16 16.91q75.68 12.67 205.49 50.05l.3 32-1440.07-.32z" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
