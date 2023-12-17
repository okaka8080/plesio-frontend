'use client';

import '@/components/firebaseApp';
import {UnityData} from '@/components/unityData';
import { useEffect, useState } from "react";
import {
  getAuth,
  Auth,
  GithubAuthProvider,
  signInWithPopup
} from 'firebase/auth'


export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);
  const [provider, setProvider] = useState<GithubAuthProvider | null>(null);

  useEffect(() => {
    if (provider === null) {
      const newProvider = new GithubAuthProvider();
      newProvider.addScope('repo'); 
      setProvider(newProvider);
    }
  }, [provider]);

  useEffect(() => {
    if (provider !== null && auth === null) {
      setAuth(getAuth());
    }
  }, [auth, provider]);

  useEffect(() => {
    if (provider !== null && auth !== null && token === null) {
      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential && credential.accessToken) {
          setToken(credential.accessToken);
        }
        (async () => {
          let newtoken = await result.user.getIdToken();
          setAccessToken(newtoken);
        })();
      });
    }
  }, [auth, provider, token]);

  return (
    <main >
      {(auth != null) && <UnityData arg1={accessToken}/>}
    </main>
  )
}
