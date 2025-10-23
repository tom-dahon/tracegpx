import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="text-center">
       <div className="text-center flex flex-col space-y-4 mt-4">
          <h1>Bienvenue sur TraceIt</h1>
          <p>Créez votre parcours GPS et exportez-le en GPX.</p>
       </div>

      <Link href="/map" className="mt-8">
        <button className="cursor-pointer border-3 rounded-md px-2 mt-20">Accéder à la carte</button>
      </Link>

      </main>
    </div>
  );
}
