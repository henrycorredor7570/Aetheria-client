import React from 'react';
import { Entity, Scene } from "aframe-react";

const ARViewer = ({ modelUrl }) => {
    return (
        <div style={{width: "100%", height: "500px", margin: "auto"}}>
            <h3>Explora en Realidad Aumentada</h3>
            <Scene embedded vr-mode-ui="enabled: false" style={{ width: "100%", height: "100%"}}> 
                <a-assets>
                    <a-asset-item id="model3d" src={modelUrl}></a-asset-item>
                </a-assets>
                <Entity gltf-model="#model3d" position=" 0 0 -2" scale="2 2 2" rotation="0 45 0"/>
                <Entity camera look-controls wasd-controls position="0 1.6 3"/>
                <Entity light="type: ambient; color: #fff; intensity:1"/>
                <Entity light="type: directional; color: #fff; intensity: 0.5" position="1 1 1"/>
                <Entity sky="color: #ECECEC"/>
            </Scene>
        </div>
    );
};

export default ARViewer;