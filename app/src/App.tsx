import { useState } from "react";
import { Button } from "@/components/ui/button";
import { greet, type AppError } from "@/lib/tauriCommands";

function App() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [error, setError] = useState<AppError | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGreet() {
    setGreeting(null);
    setError(null);
    setLoading(true);
    try {
      const result = await greet("World");
      setGreeting(result);
    } catch (err) {
      if (err && typeof err === "object" && "kind" in err && "message" in err) {
        setError(err as AppError);
      } else {
        setError({
          kind: "Internal",
          message: err instanceof Error ? err.message : String(err),
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold">Cadence</h1>
      <p className="text-muted-foreground mt-2">
        Performance capture and reflection
      </p>
      <div className="mt-4 flex flex-col items-center gap-2">
        <Button onClick={handleGreet} disabled={loading}>
          {loading ? "Greeting…" : "Greet"}
        </Button>
        {greeting && (
          <p className="text-muted-foreground" role="status">
            {greeting}
          </p>
        )}
        {error && (
          <p className="text-destructive" role="alert">
            {error.kind}: {error.message}
          </p>
        )}
      </div>
      <Button className="mt-4">Get started</Button>
    </main>
  );
}

export default App;
