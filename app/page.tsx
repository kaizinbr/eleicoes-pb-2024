// import Image from "next/image";


import Main from "@/components/Main";

export default function Home() {
    return (
        <div
            className={`
                w-full min-h-screen p-6
            `}
        >
            <h1 className="text-3xl font-bold">Welcome to the Election Data API</h1>
            <p className="mt-4">
                This is an API that provides data about elections in Brazil. You can use it to get
                information about candidates, cities, and more.
            </p>
            <Main />
        </div>
    );
}
