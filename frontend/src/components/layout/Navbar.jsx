import { Link, NavLink } from "react-router-dom";
import {
    Phone,
    Mail,
    User,
    ChevronDown,
    Menu,
} from "lucide-react";

import Logo from "../common/Logo";

const Navbar = () => {
    return (
        <>
            {/* ================= TOP BAR ================= */}

            <div className="bg-[#4B4B7C] text-white">

                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

                    <div className="hidden lg:flex items-center gap-5 text-sm">

                        <span>IQAC</span>

                        <span>|</span>

                        <span>NIRF</span>

                        <span>|</span>

                        <span>ARIIA</span>

                        <span>|</span>

                        <span>MOUS</span>

                        <span>|</span>

                        <span>IIC</span>

                        <span>|</span>

                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>080 25530137</span>
                        </div>

                        <span>|</span>

                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>info@jyotinivas.org</span>
                        </div>

                    </div>

                    <div className="flex items-center gap-4 ml-auto">

                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold text-sm">
                            ONLINE PAYMENT
                        </button>

                        <button className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold text-sm">
                            Admissions 2026-27
                        </button>

                    </div>

                </div>

            </div>

            {/* ================= LOGO ROW ================= */}

            <div className="bg-white border-b">

                <div className="max-w-7xl mx-auto px-6 py-2 flex items-center">

                    {/* Logo */}

                    <Link to="/" className="flex-shrink-0">
                        <Logo className="w-[540px] h-auto" />
                    </Link>

                    {/* ================= STATISTICS ================= */}

                    <div className="hidden lg:flex items-center ml-auto gap-9">

                        <div className="text-center">
                            <h2
                                className="text-[22px] font-bold text-black leading-none"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                59
                            </h2>
                            <p
                                className="mt-1 text-[11px] text-black leading-none"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Years
                            </p>
                        </div>

                        <div className="text-center">
                            <h2
                                className="text-[22px] font-bold text-black leading-none"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                6
                            </h2>
                            <p
                                className="mt-1 text-[11px] text-black leading-none"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Streams
                            </p>
                        </div>

                        <div className="text-center">
                            <h2
                                className="text-[22px] font-bold text-black leading-none"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                43
                            </h2>
                            <p
                                className="mt-1 text-[11px] text-black leading-none"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Programmes
                            </p>
                        </div>

                        <div className="text-center">
                            <h2
                                className="text-[22px] font-bold text-black leading-none"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                64th
                            </h2>
                            <p
                                className="mt-1 text-[11px] text-black whitespace-nowrap"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Best College in India
                            </p>
                        </div>

                        <div className="text-center">
                            <h2
                                className="text-[22px] font-bold text-black leading-none"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                5th
                            </h2>
                            <p
                                className="mt-1 text-[11px] text-black whitespace-nowrap"
                                style={{ fontFamily: "Georgia, serif" }}
                            >
                                Best College in Karnataka
                            </p>
                        </div>

                    </div>

                </div>

            </div>

            {/* ================= NAVBAR ================= */}

            <nav className="bg-white shadow-sm sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

                    <div className="hidden lg:flex items-center gap-9">

                        <NavLink
                            to="/"
                            className="bg-red-500 text-white px-5 py-2 rounded-full text-[15px] font-semibold tracking-wide"
                        >
                            HOME
                        </NavLink>

                        <button className="flex items-center gap-1 text-[15px] font-medium text-black hover:text-[#4B4B7C] transition-colors">
                            ABOUT US
                            <ChevronDown size={16} />
                        </button>

                        <button className="flex items-center gap-1 text-[15px] font-medium text-black hover:text-[#4B4B7C] transition-colors">
                            ACADEMICS
                            <ChevronDown size={16} />
                        </button>

                        <button className="flex items-center gap-1 text-[15px] font-medium text-black hover:text-[#4B4B7C] transition-colors">
                            DEPARTMENTS
                            <ChevronDown size={16} />
                        </button>

                        <button className="flex items-center gap-1 text-[15px] font-medium text-black hover:text-[#4B4B7C] transition-colors">
                            RESEARCH
                            <ChevronDown size={16} />
                        </button>

                        <button className="flex items-center gap-1 text-[15px] font-medium text-black hover:text-[#4B4B7C] transition-colors">
                            STUDENT SUPPORT
                            <ChevronDown size={16} />
                        </button>

                        <button className="flex items-center gap-1 text-[15px] font-medium text-black hover:text-[#4B4B7C] transition-colors">
                            ADMISSIONS
                            <ChevronDown size={16} />
                        </button>

                        <button className="flex items-center gap-1 text-[15px] font-medium text-black hover:text-[#4B4B7C] transition-colors">
                            CONTACT
                        </button>

                    </div>

                    <div className="flex items-center gap-5 ml-auto">

                        <NavLink to="/login">
                            <User size={28} />
                        </NavLink>

                        <button className="lg:hidden">
                            <Menu size={30} />
                        </button>

                    </div>

                </div>

            </nav>
        </>
    );
};

export default Navbar;