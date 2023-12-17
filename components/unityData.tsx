"use client";

import {Unity, useUnityContext} from "react-unity-webgl";
import { useEffect } from "react";
import {
    Auth,
  } from 'firebase/auth'

export const UnityData = (props: {arg1: string|null}) => {
    const {unityProvider, sendMessage, addEventListener, removeEventListener} = 
    useUnityContext({
        loaderUrl: "Build/unity.loader.js",
        dataUrl: "Build/unity.data",
        frameworkUrl: "Build/unity.framework.js",
        codeUrl : "Build/unity.wasm",
    });

    console.log("arg",props.arg1)

    useEffect(() => {
        if (props.arg1 != null){
            sendMessage("GameManager", "SetBearer", props.arg1)
        }
      }, [props.arg1, unityProvider]);
    

    return (
        <div>
            <Unity
                unityProvider={unityProvider}
                style={{
                    height: "100vh",
                    width: "100vw",
                    background: "grey",
                }}
            />
        </div>
    );
}