import React, { useEffect, useRef, useState } from 'react';
import CLOUDS from '/node_modules/vanta/src/vanta.clouds.js';

const Canvas = () => {
    const [darkMode, setDarkMode] = useState(false);
    const vantaRef = useRef(null);
    let vantaEffect = useRef(null);


    useEffect(() => {
        if (vantaEffect.current) {
            vantaEffect.current.destroy();
        }

        vantaEffect.current = CLOUDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            backgroundColor: darkMode ? 0x000000 : 0xffffff,
            skyColor: darkMode ? 0x000000 : 0x68b8d7,
            cloudColor: 0xadc1de,
            cloudShadowColor: darkMode ? 0x000000 : 0x183550,
            sunColor: darkMode ? 0x000000 : 0xff9919,
            sunGlareColor: darkMode ? 0x000000 : 0xff6633,
            sunlightColor: darkMode ? 0x000000 : 0xff9933,
            speed: 1.3,
        });

        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
            }
        };
    }, [darkMode]);

    return (
        <>
            <div id='canvas' ref={vantaRef} />
            <div className="darkMode">
                <input type="checkbox" id="darkModeControl" className="darkModeControl" onChange={() => setDarkMode(!darkMode)} />
                <label htmlFor="darkModeControl" className="customCheckboxLabel"></label>
            </div>
        </>
    )
}

export default Canvas;
