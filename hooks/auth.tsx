import { createContext, useContext, useState, useEffect } from 'react';
import { Hub } from '@aws-amplify/core';
import { signIn, confirmSignIn, signOut, getCurrentUser, AuthError } from '@aws-amplify/auth';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  phoneNumber: string | null;
  signIn: (phone: string) => Promise<any>;
  verifyOTP: (code: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: any | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [signInData, setSignInData] = useState<any>(null);

  useEffect(() => {
    checkAuthState();
    const listener = Hub.listen('auth', ({ payload: { event } }) => {
      switch (event) {
        case 'signedIn':
        case 'signedIn':
          checkAuthState();
          break;
        case 'signedOut':
          setIsAuthenticated(false);
          setUser(null);
          setPhoneNumber(null);
          break;
      }
    });

    return () => listener();
  }, []);

  async function checkAuthState() {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error) {
      if (error instanceof AuthError) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleSignIn = async (phone: string) => {
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
      setPhoneNumber(formattedPhone);
      
      const { nextStep } = await signIn({
        username: formattedPhone,
        options: {
          authFlowType: "CUSTOM_WITHOUT_SRP"
        }
      });

      if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE') {
        setSignInData({ nextStep });
        return { nextStep };
      }
      
      throw new Error('Unexpected auth flow step');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const handleVerifyOTP = async (code: string) => {
    try {
      if (!signInData?.nextStep) throw new Error('No sign in data available');
      
      const result = await confirmSignIn({
        challengeResponse: code
      });

      if (result.isSignedIn) {
        await checkAuthState();
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsAuthenticated(false);
      setUser(null);
      setPhoneNumber(null);
      setSignInData(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated,
        isLoading, 
        phoneNumber,
        signIn: handleSignIn,
        verifyOTP: handleVerifyOTP,
        signOut: handleSignOut,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
