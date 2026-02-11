import { authClient } from '../libs/auth/auth';
import type { SocialProvider } from 'better-auth';

function useLoginProviders() {




    const signIn = async (provider: SocialProvider) => {
      await authClient.signIn.social({
        provider,
        callbackURL: "http://localhost:5173/auth/callback",
      })
    }



    const data = [
        {
          icon:"ui/google-icon.svg",
          text:"Google",
          tooltip:"Logar com Google",
          onClick: async () => await signIn("google")
        },
        {
          icon:"ui/github-icon.svg",
          text:"GitHub",
          tooltip:"Logar com GitHub",
          onClick: async () => await signIn("github")
        }
    ]


  return {
    data
  }
}

export default useLoginProviders