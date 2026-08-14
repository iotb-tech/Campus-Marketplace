import Image from "next/image";

export default function MyComponent() {
  return (
        <div className="hidden lg:flex w-1/2 relative bg-primary-container overflow-hidden        items-center justify-center">
          {/* Left Side: Visual/Branding (Visible on large screens) */}
          <div className="relative z-10 px-20 text-white max-w-2xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="p-2 bg-surface-container-lowest rounded-xl">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">
                Academic Exchange
              </h1>
            </div>
            <h2 className="text-5xl font-black mb-6 leading-tight">
              Elevate your campus journey.
            </h2>
            <p className="text-xl opacity-90 leading-relaxed font-light mb-10">
              A secure space built exclusively for scholars. Join thousands of
              your peers in sharing insights, resources, and innovation within
              a trusted community.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <span className="material-symbols-outlined text-4xl mb-3">
                  verified_user
                </span>
                <h4 className="font-bold text-lg mb-1">Campus Verified</h4>
                <p className="text-sm opacity-80">
                  Access restricted to verified university emails only.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <span className="material-symbols-outlined text-4xl mb-3">
                  groups
                </span>
                <h4 className="font-bold text-lg mb-1">Collaborative</h4>
                <p className="text-sm opacity-80">
                  Sync with study groups and department projects instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Image Accent */}
          <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 opacity-20">
            <Image
              className="w-full h-full object-cover rounded-full"
              width={500}
              height={500}
              alt="University architecture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsqbYg5VGtA-bVIB4NhYf4yZDGFJbWBlp8Ag48OQ3tiwuK4zEVeoBzTTxGAHIFQ7I_BdgtVvLG7SFqnbXWIvTg4tQjoJH9ej_QJfAkxVOyV0SzAG8TxV-HeQHYWS0bhx2y074uioFEW9eCrlhroTg6fL5ABL-84SQDoPQQPgERSLDPLWJZrDUp_Iq10ZCIJsno25yJ_IQvBKYUKNeqX-unVvn4nzwNqihYNczXHGZJgeGNO-xRmXA"
            />
          </div>
        </div>
  );
}




  
 