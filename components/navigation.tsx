import Link from "next/link"

export const Navigation = () => {
  return (
    <nav className="flex">
      <div className="flex gap-4 sm:gap-6 md:gap-8">
        <Link href="#" className="text-sm sm:text-lg md:text-xl uppercase font-bold border-b-2 border-black">
          NEWS
        </Link>
        <Link href="#" className="text-sm sm:text-lg md:text-xl uppercase font-bold border-b-2 border-black">
          CAREERS
        </Link>
        <Link href="#" className="text-sm sm:text-lg md:text-xl uppercase font-bold border-b-2 border-black">
          INVESTORS
        </Link>
      </div>
    </nav>
  )
}
