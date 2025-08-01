import React, { useRef, useEffect } from "react";

const shapesConfig = [
  {
    className: "shape-1",
    style: {
      width: 100,
      height: 100,
      top: "20%",
      left: "10%",
      background: "rgba(37,99,235,0.1)", // blue-600/20
      animationDelay: "0s",
    },
  },
  {
    className: "shape-2",
    style: {
      width: 150,
      height: 150,
      top: "60%",
      right: "15%",
      background: "rgba(147,51,234,0.1)", // purple-600/20
      animationDelay: "2s",
    },
  },
  {
    className: "shape-3",
    style: {
      width: 80,
      height: 80,
      bottom: "20%",
      left: "20%",
      background: "rgba(34,197,94,0.1)", // green-600/20
      animationDelay: "4s",
    },
  },
];

function randomFloatTransform() {
  const randomX = Math.random() * 50 - 25;
  const randomY = Math.random() * 50 - 25;
  return `translate(${randomX}px, ${randomY}px)`;
}

const NotFound = () => {
  const shapeRefs = [useRef(), useRef(), useRef()];
  const errorCodeRef = useRef();

  useEffect(() => {
    const intervals = shapeRefs.map((ref, idx) =>
      setInterval(() => {
        if (ref.current) {
          ref.current.style.transform = randomFloatTransform();
        }
      }, 3000 + idx * 1000)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  const handleErrorCodeClick = () => {
    if (errorCodeRef.current) {
      errorCodeRef.current.style.transform = "rotate(360deg) scale(1.1)";
      errorCodeRef.current.style.transition = "transform 0.6s ease";
      setTimeout(() => {
        errorCodeRef.current.style.transform = "rotate(0deg) scale(1)";
      }, 600);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white overflow-x-hidden font-sans relative">
      {/* Animated background */}
      <div className="fixed w-full h-full top-0 left-0 z-0 pointer-events-none">
        {shapesConfig.map((shape, idx) => (
          <div
            key={shape.className}
            ref={shapeRefs[idx]}
            className="absolute rounded-full"
            style={{
              ...shape.style,
              position: "absolute",
              borderRadius: "50%",
              animation: "float 6s ease-in-out infinite",
            }}
          />
        ))}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 relative z-10 w-full">
        <div
          ref={errorCodeRef}
          className="error-code font-extrabold mb-4"
          style={{
            fontSize: "clamp(6rem, 15vw, 12rem)",
            background: "conic-gradient(from 45deg, #3b82f6, #8b5cf6, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            lineHeight: 0.9,
            animation: "pulse 2s ease-in-out infinite",
            cursor: "pointer",
          }}
          onClick={handleErrorCodeClick}
        >
          404
        </div>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}</style>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-blue-400">Page Not Found</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-xl mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have vanished into the digital void. <br />
          Don't worry though - we'll help you get back on track to boost your productivity.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a
            href="/"
            className="px-6 py-3 rounded-xl flex items-center gap-2 transition-all bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </a>
          <button
            className="px-6 py-3 rounded-xl flex items-center gap-2 transition-all border border-gray-700 bg-gray-800 text-white hover:bg-gray-900"
            onClick={() => window.history.back()}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            Go Back
          </button>
        </div>

        <div className="flex flex-wrap gap-12 justify-center items-center">
          <div className="text-center">
            <span className="text-xl md:text-2xl font-bold text-blue-400 block">10K+</span>
            <span className="text-sm text-gray-400 mt-1 block">Happy Users</span>
          </div>
          <div className="text-center">
            <span className="text-xl md:text-2xl font-bold text-blue-400 block">1M+</span>
            <span className="text-sm text-gray-400 mt-1 block">Tasks Completed</span>
          </div>
          <div className="text-center">
            <span className="text-xl md:text-2xl font-bold text-blue-400 block">100%</span>
            <span className="text-sm text-gray-400 mt-1 block">Free Forever</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
