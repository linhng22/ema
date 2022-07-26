import React, { useEffect, useRef } from "react"
import sprite from "../images/dog_sprite.png"

export default function Canvas() {
    
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const CANVAS_WIDTH = canvas.width = 300;
        const CANVAS_HEIGHT = canvas.height = 300;

        const playerImage = new Image();
        playerImage.src = sprite
        const spriteWidth = 256.9;
        const spriteHeight = 256.875;
        let gameFrame = 0;
        const staggerFrames = 5;
        const spriteAnimations = [];
        let playerState = "idle";
        const animationStates = [
            {
                name: 'dead',
                frames: 10
            },
            {
                name: 'fall',
                frames: 8
            },
            {
                name: 'hurt',
                frames: 10
            },
            {
                name: 'idle',
                frames: 10
            },
            {
                name: 'jump',
                frames: 8
            },
            {
                name: 'run',
                frames: 8
            },
            {
                name: 'slide',
                frames: 10
            },
            {
                name: 'walk',
                frames: 9
            },

        ];
        animationStates.forEach((state, index) => {
            let frames = {
                loc: [],
            };
            for (let j = 0; j < state.frames; j++) {
                let positionX = j * spriteWidth;
                let positionY = index * spriteHeight;
                frames.loc.push({x: positionX, y: positionY});
            };
            spriteAnimations[state.name] = frames;
        });
        
        function animate() {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
            let frameX = spriteWidth * position;
            let frameY = spriteAnimations[playerState].loc[position].y;
            ctx.drawImage(playerImage, frameX, frameY,
                spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            gameFrame ++;
            requestAnimationFrame(animate);
        }
        animate();
    }, []);
    
    
    

    return (
        <>
            <div className="canvas">
                <canvas id="canvas1" ref={canvasRef}/>
            </div>
        </>
    )
}