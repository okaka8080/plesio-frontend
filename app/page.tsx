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
  const [auth, setAuth] = useState<Auth | null>(null);
  const [provider, setProvider] = useState<GithubAuthProvider | null>(null);

  useEffect(() => {
    if (provider === null) {
      const newProvider = new GithubAuthProvider();
      newProvider.addScope('repo'); // 既定ではユーザー自身のemailを取得するスコープしか付与されない。必要に応じてスコープを追加する
      setProvider(newProvider);
    }
  }, [provider]);

  useEffect(() => {
    if (provider !== null && auth === null) {
      setAuth(getAuth());
      console.log(auth);
    }
  }, [auth, provider]);

  useEffect(() => {
    if (provider !== null && auth !== null && token === null) {
      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential && credential.accessToken) {
          setToken(credential.accessToken);
          console.log('token: ' + credential.accessToken);
        }
        console.log(result.user);
      });
    }
  }, [auth, provider, token]);

  

  return (
    <main >
      <UnityData/>
    </main>
  )
}
