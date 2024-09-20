// import Image from "next/image";


import Main from "@/components/Main";

export default function Home() {
    return (
        <div
            className={`
                w-full min-h-screen p-6 px-4 md:px-6
            `}
        >
            <h1 className="text-3xl text-center font-bold">Eleições PB 2024</h1>
            <p className="mt-4 text-center">
                Veja dados sobre as os candidatos e as eleições de 2024 na Paraíba.
            </p>
            <Main />
        </div>
    );
}
