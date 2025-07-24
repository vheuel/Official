import Link from "next/link"
import Image from "next/image"

export const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="flex flex-col md:flex-col">
        <div className="mb-4 md:mb-2">
          <Image src="/logo.png" alt="Vheüel Logo" width={240} height={80} className="w-48 sm:w-56 md:w-64 lg:w-72" />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
          <div className="flex flex-wrap gap-x-4 md:gap-x-6">
            <Link href="#" className="text-xs sm:text-sm border-b border-black">
              Square
            </Link>
            <Link href="#" className="text-xs sm:text-sm border-b border-black">
              Cash App
            </Link>
            <Link href="#" className="text-xs sm:text-sm border-b border-black">
              Afterpay
            </Link>
            <Link href="#" className="text-xs sm:text-sm border-b border-black">
              TIDAL
            </Link>
            <Link href="#" className="text-xs sm:text-sm border-b border-black">
              Bitkey
            </Link>
            <Link href="#" className="text-xs sm:text-sm border-b border-black">
              Proto
            </Link>
          </div>

          <div className="mt-8 md:mt-0 flex flex-col md:items-end">
            <p className="text-xs mb-1">
              © 2025 Vheüel, Inc. VHEÜEL and the Vheüel Logo are trademarks of Vheüel, Inc.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-xs border-b border-black">
                Legal
              </Link>
              <Link href="#" className="text-xs border-b border-black">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
