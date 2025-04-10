import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

// Tipe data buat struktur menu dropdown
type Submenu = {
  category: string;     // Nama kategori 
  items: string[];      // Isi item di tiap kategori
};

// Data untuk menu "Fitur"
const profileMenus: Submenu[] = [
  {
    category: "Akuntansi",
    items: ["Laporan Keuangan", "Pembukuan", "Perpajakan", "Bank", "Pembukuan", "Biaya & Pengeluaran"]
  },
  {
    category: "Supply Chain Management",
    items: ["Management Product", "Management Inventori", "Management Gudang", "Management Supplier"]
  },
  {
    category: "Integration & Platform",
    items: ["User Management", "Pay", "Pos & Marketplace",]
  },
];

// Data untuk menu "Solusi"
const solusiMenus: Submenu[] = [
  {
    category: "Industri",
    items: ["Ritel", "Teknologi", "Toko Online"]
  },
  {
    category: "Bisnis",
    items: ["StartUp", "Usaha Kecil","Usaha Besar","Usaha Menengah"]
  },
];

// Komponen utama Navbar
export default function Navbar() {
  // State buat buka/tutup dropdown Fitur
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // State buat buka/tutup dropdown Solusi
  const [isSolusiOpen, setIsSolusiOpen] = useState(false);
  const [activeSolusiCategory, setActiveSolusiCategory] = useState<string | null>(null);

  // Ref buat deteksi klik di luar dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);
  const solusiRef = useRef<HTMLDivElement>(null);

  // Kalau klik di luar dropdown, semua dropdown ditutup
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        solusiRef.current && !solusiRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
        setActiveCategory(null);
        setIsSolusiOpen(false);
        setActiveSolusiCategory(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // Navbar utama ya broo
    <nav className="bg-blue-500 text-white shadow-md px-8 py-4 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
       {/* ini logo baru gua buat default nya text dulu */}
        <div className="text-xl font-bold">Logo</div>

        {/* Navigasi kanan */}
        <div className="flex space-x-8 items-center">
          
          {/* Dropdown Fitur */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsSolusiOpen(false); // Biar dropdown lain ketutup
                if (!isProfileOpen) {
                  setActiveCategory(profileMenus[0]?.category); // Default buka kategori pertama
                }
              }}
              className="flex items-center gap-1 bg-transparent focus:outline-none hover:text-yellow-200"
            >
              Fitur
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {isProfileOpen && (
              <div
                className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-2xl min-w-[700px] p-6 z-50 flex"
                onMouseLeave={() => {
                  setIsProfileOpen(false);
                  setActiveCategory(null);
                }}
              >
                {/* Sidebar kategori fitur */}
                <ul className="w-1/4 space-y-3 border-r pr-6">
                  {profileMenus.map((menu) => (
                    <li
                      key={menu.category}
                      className={`cursor-pointer text-sm hover:text-blue-600 transition ${
                        activeCategory === menu.category ? "font-semibold text-blue-600" : ""
                      }`}
                      onClick={() => setActiveCategory(menu.category)}
                    >
                      {menu.category}
                    </li>
                  ))}
                </ul>

                {/* Card isi fitur */}
                <div className="w-3/4 pl-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activeCategory &&
                    profileMenus
                      .find((menu) => menu.category === activeCategory)
                      ?.items.map((item) => (
                        <div
                          key={item}
                          className="bg-gray-100 hover:bg-blue-100 transition duration-200 ease-in-out rounded-xl p-4 shadow-sm cursor-pointer"
                        >
                          <h4 className="text-base font-medium text-gray-800">{item}</h4>
                          <p className="text-xs text-gray-500 mt-1 leading-tight">
                            Fitur <span className="font-semibold">{item}</span> dalam kategori{" "}
                            <span className="italic">{activeCategory}</span>
                          </p>
                        </div>
                      ))}
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Solusi */}
          <div className="relative" ref={solusiRef}>
            <button
              onClick={() => {
                setIsSolusiOpen(!isSolusiOpen);
                setIsProfileOpen(false); // Tutup fitur kalo buka solusi
                if (!isSolusiOpen) {
                  setActiveSolusiCategory(solusiMenus[0]?.category);
                }
              }}
              className="flex items-center gap-1 bg-transparent focus:outline-none hover:text-yellow-200"
            >
              Solusi
              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {isSolusiOpen && (
              <div
                className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-2xl min-w-[700px] p-6 z-50 flex"
                onMouseLeave={() => {
                  setIsSolusiOpen(false);
                  setActiveSolusiCategory(null);
                }}
              >
                {/* Sidebar kategori solusi */}
                <ul className="w-1/4 space-y-3 border-r pr-6">
                  {solusiMenus.map((menu) => (
                    <li
                      key={menu.category}
                      className={`cursor-pointer text-sm hover:text-green-600 transition ${
                        activeSolusiCategory === menu.category ? "font-semibold text-green-600" : ""
                      }`}
                      onClick={() => setActiveSolusiCategory(menu.category)}
                    >
                      {menu.category}
                    </li>
                  ))}
                </ul>

                {/* Card isi solusi */}
                <div className="w-3/4 pl-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activeSolusiCategory &&
                    solusiMenus
                      .find((menu) => menu.category === activeSolusiCategory)
                      ?.items.map((item) => (
                        <div
                          key={item}
                          className="bg-green-100 hover:bg-green-200 transition duration-200 ease-in-out rounded-xl p-4 shadow-sm cursor-pointer"
                        >
                          <h4 className="text-base font-medium text-gray-800">{item}</h4>
                          <p className="text-xs text-gray-500 mt-1 leading-tight">
                            Solusi <span className="font-semibold">{item}</span> dalam kategori{" "}
                            <span className="italic">{activeSolusiCategory}</span>
                          </p>
                        </div>
                      ))}
                </div>
              </div>
            )}
          </div>

          {/* Tombol harga */}
          <button className="bg-transparent hover:text-yellow-200">Harga</button>
          <button className="bg-sky-900 hover:text-yellow-200">Sign In</button>
        </div>
      </div>
    </nav>
  );
}
