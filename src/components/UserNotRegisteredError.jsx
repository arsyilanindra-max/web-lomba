import { Button } from '@/components/ui/button';

export default function UserNotRegisteredError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">User Not Registered</h1>
      <p className="text-muted-foreground mb-8">Your account is not registered for this app.</p>
      <Button onClick={() => window.location.href = '/'}>Go Home</Button>
    </div>
  );
}

