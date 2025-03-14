import React, { useEffect, useRef } from 'react';
import { Entity, Scene } from "aframe-react";

const ARViewer = ({ modelUrl }) => {
    const sceneRef = useRef(null);

    useEffect(() => {
        if(sceneRef.current) {
            sceneRef.current.addEventListener("loaded", () => {
                console.log("AR Scene Loaded");
            })
        }
    }, []);

    return (
        <div>
            <h3>Explora en Realidad Aumentada</h3>
            <Scene embedded ref={sceneRef} vr-mode-ui="enabled: false"> 
                <a-assets>
                    <a-asset-item id="model" src={modelUrl}></a-asset-item>
                </a-assets>
                <Entity gltf-model="#model" position=" 0 0 -2" scale="1 1 1"/>
                <Entity camera look-controls></Entity>
            </Scene>
        </div>
    );
};

export default ARViewer;