import React from "react";
import AuthCarousel from "../components/AuthCarousel";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="bg-neutral-950 h-screen flex items-center  px-4 justify-center">
      <img
        src="/logo.png"
        onClick={() => navigate("/")}
        className="w-fit lg:hidden  absolute top-2 z-40 left-2 h-fit"
      />
      <div
        className="bg-neutral-900 shadow-2xl  border
       border-neutral-800 w-[1440px] h-[800px] 
       p-2 rounded-2xl "
      >
        <div className="flex shadow-2xl  bg-neutral-950 border border-neutral-900 rounded-2xl h-full p-4 gap-6">
          {/* lado esquerdo*/}
          <AuthCarousel isTyping={isTyping} />

          <div className="lg:w-2/3 w-full  flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-main text-4xl">{title}</h1>
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
