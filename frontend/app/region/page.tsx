import { RegionSelector } from "@/components/region/RegionSelector";

export default function RegionPage() {
  return (
    <main className="flex-1 px-4 md:px-8 lg:px-12 pb-24 max-w-7xl mx-auto w-full pt-8">
      <div className="mb-10">
        <h1 className="font-h1 text-h1 text-primary mb-2">Select Your Voting Region</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            To provide you with accurate ballot information, polling locations, and local representatives, we need to know where you are registered to vote.
        </p>
      </div>
      <RegionSelector />
    </main>
  );
}
