import { Link } from "react-router-dom";

const Page_Not_Found = () => {
  return (
    <section className="min-h-[80vh]  grid gap-6">
      <div className=" h-full   flex items-center">
        <div className="p-6 text-center flex w-fit flex-col gap-4 sm:gap-2 sm:mx-auto sm:flex-row">
          <h1 className=" px-4 text-7xl md:text-5xl lg:text-6xl flex items-center justify-center font-bold text-neutral-black-900 sm:border-r sm:border-gray-400 ">
            404
          </h1>
          <div className="px-4 text-center sm:text-start grid gap-2">
            <h2 className="text-neutral-black-900  text-lg md:text-xl xl:text-2xl font-semibold ">
              Oops! Page Not Found
            </h2>

            <div className="flex_center_y flex-col xs:flex-row gap-2 text-sm">
              <p className="text-neutral-black-500 ">
                Let’s get you back on the road
              </p>
              <Link
                to="/"
                className="text-neutral-black-900 underline underline-offset-2 "
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page_Not_Found;
