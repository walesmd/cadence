import { Button } from "@/components/ui/button";

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold">Cadence</h1>
      <p className="text-muted-foreground mt-2">
        Performance capture and reflection
      </p>
      <Button className="mt-4">Get started</Button>
    </main>
  );
}

export default App;
