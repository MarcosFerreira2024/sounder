import { useGoogleLogin } from '@react-oauth/google';
import React, { useEffect } from 'react'
import { getGoogleUserInfo } from '../actions/getGoogleUserInfo';
import { useNavigate } from 'react-router-dom';
import { GITHUB_CLIENT_ID } from '../main';

function useLoginProviders() {
  const navigate = useNavigate()



   const loginWithGoogle = useGoogleLogin({
    onSuccess: async  (response) => {
      await getGoogleUserInfo(response.access_token)

      navigate("/")

      
    },
    onError: () => {
      console.log("login failed");
    },
  });

  const loginWithGithub = () => window.location.assign("https://github.com/login/oauth/authorize?client_id="+GITHUB_CLIENT_ID)

  useEffect(() => {
    const query = window.location.search;
    const url = new URLSearchParams(query);
    const code = url.get("code");
    if(!code) return

    console.log(code);
  });

    const data = [
        {
          icon:"ui/google-icon.svg",
          text:"Google",
          tooltip:"Logar com Google",
          onClick: () => loginWithGoogle()
        },
        {
          icon:"ui/github-icon.svg",
          text:"GitHub",
          tooltip:"Logar com GitHub",
          onClick: ()=> loginWithGithub()
        }
    ]


  return {
    data
  }
}

export default useLoginProviders