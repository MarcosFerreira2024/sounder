import React from "react";
import AuthCarousel from "../components/auth/AuthCarousel";
import { Link, useNavigate } from "react-router-dom";
import Image from "../components/ui/Image";

type AuthLayoutProps = {
  children: React.ReactNode;
  isTyping: boolean;
  title: string;
  text: string;
  link: string;
  linkText: string;
};

function AuthLayout({
  children,
  isTyping,
  link,
  linkText,
  text,
  title,
}: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-neutral-950 h-screen flex items-center py-2 px-2 md:py-4 md:px-4 justify-center">
      <Image
        src="/logo.png"
        onClick={() => navigate("/")}
        className=" lg:hidden w-30 absolute top-8 z-40 right-10 h-fit"
      />
      <div
        className="bg-neutral-900 shadow-md  border
       border-neutral-800 w-[1440px] h-full lg:max-h-[800px] 
        p-2 rounded-2xl "
      >
        <div className="flex shadow-md  bg-neutral-950 border border-neutral-900 rounded-2xl h-full md:p-4 p-2 gap-6">
          <AuthCarousel isTyping={isTyping} />

          <div className="lg:w-2/3 w-full  flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-main md:text-4xl text-2xl">{title}</h1>
              <p className="text-opacity text-sm">
                {text}{" "}
                <Link
                  title={"Ir para página de registro"}
                  className="text-neutral-300 underline "
                  to={link}
                >
                  {linkText}
                </Link>
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
