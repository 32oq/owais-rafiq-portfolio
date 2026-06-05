import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl font-bold gradient-text select-none">404</div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-text-primary">Page not found</h1>
          <p className="text-text-muted">
            Looks like this page got lost in the mountains of Kashmir. Let&apos;s get you back on track.
          </p>
        </div>
        <div className="font-mono text-sm text-text-muted bg-surface-2 border border-border rounded-lg p-4 text-left">
          <span className="text-accent">const</span>{" "}
          <span className="text-blue-400">page</span> ={" "}
          <span className="text-red-400">null</span>
          <span className="text-text-muted">; // 404: not found</span>
        </div>
        <LinkButton href="/" size="lg" leftIcon={<ArrowLeft size={16} />}>
          Back to Home
        </LinkButton>
      </div>
    </div>
  );
}
