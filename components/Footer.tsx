import Image from "next/image";
import Link from "next/link";
import { Input } from "./ui/input";

const socials = [
    { src: "/footer/facebook.svg", path: "" },
    { src: "/footer/x.svg", path: "" },
    { src: "/footer/instagram.svg", path: "" },
    { src: "/footer/youtube.svg", path: "" },
    { src: "/footer/pinterest.svg", path: "" },
  ];
  
const Footer = () => {
  return (
    <footer className="bg-blend-multiply pt-8">
        <div className="container mx-auto border-b border-white/40">
                {/* text & socials& form input */}
                <div className="flex flex-col max-w-[550px] mx-auto text-center">
          <div className="mb-9">
            <h2 className="pretitle mb-3">Turn the page &</h2>
            <p className="text-primary">Join our list for exclusive books update and insider tips </p>
          </div>
          <form className="relative flex items-center mb-12">
            <Input
              type="text"
              placeholder="Your email address"
              className="pl-8 w-full h-[60px] rounded-full outline-none placeholder:text-primary/80 text-primary text-sm"
            />
            <button className="bg-secondary hover:bg-secondary-hover transition-all w-[114px] h-[52px] rounded-full text-sm uppercase absolute right-1">
              Join
            </button>
          </form>
          {/* socials  */}
          <div className="mb-[44px] flex gap-8 mx-auto">
            {socials.map((icon, index) => {
              return (
                <Link
                  href={icon.path}
                  key={index}
                  className="relative w-[20px] h-[20px]"
                >
                  <Image src={icon.src} fill alt="" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* copyright  */}
      <div className="py-8">
        <div className="container mx-auto ">
         
          <p className="text-sm ml-1 text-center justify-between  text-primary">copyright &copy; 2025 . All rights reserved</p>
        </div>
    
        </div>
    </footer>
  )
}
export default Footer