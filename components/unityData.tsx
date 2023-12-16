"use client";

import {Unity, useUnityContext} from "react-unity-webgl";

export const UnityData = () => {
    const {unityProvider, addEventListener, removeEventListener} = 
    useUnityContext({
        loaderUrl: "Build/unity.loader.js",
        dataUrl: "Build/unity.data",
        frameworkUrl: "Build/unity.framework.js",
        codeUrl : "Build/unity.wasm",
    });
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