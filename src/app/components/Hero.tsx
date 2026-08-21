import campusmarket from "../assets/campusmarket.jpg";

export default function Hero() {
  return (
    <section className="w-full bg-white px-4 py-8 sm:px-6 sm:py-15 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* LEFT SIDE */}
        <div className="flex w-full flex-col text-left">

          {/* Trust Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600">
              <span className="mr-2">✓</span>
              Trusted by <b className="ml-1">500+</b>&nbsp; students
            </span>
          </div>

          {/* Heading */}
          <div>
            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-5xl">
              The safest way to{" "}
              <span className="text-blue-600">buy</span> and{" "}
              <span className="text-emerald-600">sell</span> on campus
            </h1>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Connect with verified students at your university. Buy textbooks,
            sell furniture, and discover local deals safely and sustainably.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              className="rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Browse Listings
            </button>

            <button
              className="rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
            >
              How it works
            </button>
          </div>

          {/* Trust Features */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">

            {/* Verified Students */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <span className="text-lg">✓</span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Verified Students
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  University email verification
                </p>
              </div>
            </div>

            {/* Private & Secure */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-lg">forum</span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Private & Secure
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  In-app messaging keeps you private
                </p>
              </div>
            </div>

            {/* Community Trust */}
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <span className="text-lg">★</span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Community Trust
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Report system keeps the community trusted
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE / IMAGE */}
        <div className="relative w-full">

          {/* Decorative background */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-[1.5rem] bg-purple-50 sm:translate-x-5 sm:translate-y-5" />

          {/* Image container */}
          <div className="relative overflow-hidden rounded-[1.5rem] bg-white shadow-xl">
            <img
              src={campusmarket.src}
              alt="Students buying and selling items on campus"
              className="h-[350px] w-full object-cover sm:h-[450px] lg:h-[500px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}