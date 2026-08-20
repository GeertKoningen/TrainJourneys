import Search from "@/components/journey-search";

export default function Home() {
  return (
    <div className="mx-auto max-w-200">
      <main className="mx-4 bg-white p-10 m-10 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold">Train Journey App</h1>
        <p>What is your destination?</p>

        <Search />
      </main>
    </div>
  );
}
