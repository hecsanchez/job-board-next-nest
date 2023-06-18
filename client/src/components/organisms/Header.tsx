import logo from "@/assets/png/logo@2x.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <div className="items-center sticky top-0 bg-white shadow-md">
            <div className="max-w-[1400px] flex justify-between py-3 sm:py-5 m-auto px-12 items-center">
                <Link href='/'><Image src={logo} className="w-[284px]" alt="fantastic-jobs-logo"/></Link>
                <div className="flex text-primary font-bold gap-6">
                    <Link href='/'>Why Skillum</Link>
                    <div>Menu</div>
                    <span>Dallas</span>
                    <span>My Path</span>
                    <span>Leah</span>
                </div>
            </div>
        </div>
    )
}

export default Header;
