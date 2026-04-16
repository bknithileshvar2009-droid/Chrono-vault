'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { APP_NAME } from '@/lib/constants';
import { Terminal } from 'lucide-react';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({ title: 'Account created successfully!' });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast({ title: 'Welcome back!' });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({ title: 'Signed in with Google!' });
    } catch (error: any) {
        toast({
            variant: 'destructive',
            title: 'Google Sign-In Error',
            description: error.message,
        });
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background p-4 font-mono">
      <div className="w-full max-w-sm rounded-md border-2 border-foreground bg-card p-6 shadow-[8px_8px_0px_hsl(var(--foreground))]">
        <div className="flex items-center gap-2 mb-4">
            <Terminal />
            <h1 className="text-2xl font-bold text-foreground">{APP_NAME}</h1>
        </div>
        <p className="text-muted-foreground mb-6">{isSignUp ? 'Create a new account.' : 'Please log in to continue.'}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground">email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@domain.com"
              className="bg-input border-2 border-foreground"
              required
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="bg-input border-2 border-foreground"
              required
            />
          </div>
          <Button type="submit" className="w-full border-2 border-foreground shadow-[2px_2px_0px_hsl(var(--foreground))] hover:shadow-none transition-shadow" disabled={loading}>
            {loading ? '...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </Button>
        </form>

        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-dashed border-foreground"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
        </div>

        <Button onClick={handleGoogleSignIn} variant="secondary" className="w-full border-2 border-foreground" disabled={loading}>
            Google
        </Button>

        <p className="mt-6 text-center text-xs">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)} className="underline ml-1">
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}
