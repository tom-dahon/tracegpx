'use client';
import { MapPinIcon } from '@heroicons/react/24/solid';


export default function NavBar() {
    return (
        <nav className="flex justify-between px-8 space-x-1 items-center p-4 border-b border-gray-200" style={{backgroundColor: '#fc4c02'}}>

          <div className="flex items-center gap-2">
            <MapPinIcon className="w-7 h-7 text-white" />

                <span
            className="font-semibold"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '24px',
              color: 'white',
            }}
          >
            TraceGPX
          </span>
          </div>

           <div className="flex items-center gap-4">
        <button
          onClick={() => window.open('https://forms.gle/xxxx', '_blank')}
          className="text-white font-semibold hover:underline cursor-pointer"
    
        >
          Donner ton avis
        </button>

      
      </div>
        </nav>
    )
}