import { MapPinIcon } from '@heroicons/react/24/solid';


export default function NavBar() {
    return (
        <nav className="flex justify-start px-8 space-x-1 items-center p-4 border-b border-gray-200 ">
                  <MapPinIcon className="w-7 h-7 text-blue-500" />

            <span
        className="text-gray-800 font-semibold"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          color: '#1f2937',
        }}
      >
        TraceGPX
      </span>
        </nav>
    )
}