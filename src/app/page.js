"use client";
import { useRef, useEffect, useState } from 'react';

export default function HeartCanvas() {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);

    const drawHeart = (ctx, width, height) => {
        let t = 0; // Time variable for animation
        const interval = setInterval(() => {
            if (t > Math.PI * 2) {
                clearInterval(interval); // Stop animation after completing the heart
                return;
            }

            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.moveTo(width / 2, height / 2);

            for (let i = 0; i < t; i += 0.01) {
                const x = 16 * Math.pow(Math.sin(i), 3);
                const y = 13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i);
                ctx.lineTo(width / 2 + x * 10, height / 2 - y * 10);
            }

            ctx.strokeStyle = "#ff0000";
            ctx.lineWidth = 3;
            ctx.stroke();

            t += 0.05; // Control the drawing speed
        }, 30);
    };

    const handleDraw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        drawHeart(ctx, width, height);
        setDrawing(true);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
            <canvas ref={canvasRef} width={400} height={400} className="border border-red-300 rounded-xl shadow-md" />
            <button
                onClick={handleDraw}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                disabled={drawing}
            >
                {drawing ? "Drawing in Progress" : "Draw a Heart"}
            </button>
        </div>
    );
}
