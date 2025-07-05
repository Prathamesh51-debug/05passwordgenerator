import { useState, useCallback,useEffect } from 'react'

function App() {
  const [password, setpassword] = useState("");
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [animate, setAnimate] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()_+[]{}|;:,.<>";
    }
    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }
    setpassword(pass);
    setCopied(false);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  }, [length, numberAllowed, characterAllowed]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {passwordGenerator()},[passwordGenerator, length, numberAllowed, characterAllowed]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <div className="py-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
          <div className="mb-2 flex gap-2">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full p-2 rounded bg-gray-800 text-orange-400"
            />
            <button
              className={`bg-gray-600 text-white px-3 py-2 rounded transition-all duration-300 relative overflow-hidden
                ${copied ? "animate-pulse" : ""}
                copy-btn`}
              onClick={copyToClipboard}
              disabled={!password}
            >
              {copied ? "Copied!" : "Copy"}
              <span className="thumb-effect" />
            </button>
          </div>
          <div className="flex gap-2 mb-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={e => setlength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex gap-4 mb-4">
            <label>
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setnumberAllowed(prev => !prev)}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={characterAllowed}
                onChange={() => setcharacterAllowed(prev => !prev)}
              />
              Special Characters
            </label>
          </div>
          <button
            className={`bg-orange-500 text-white px-4 py-2 rounded transition-all duration-300 font-bold shadow-lg
              ${animate ? "generate-animate" : ""}
              glow-btn`}
            onClick={passwordGenerator}
          >
            Generate Password
            <span className="thumb-effect" />
          </button>
        </div>
      </div>
      <style>
        {`
        .glow-btn {
          box-shadow: 0 0 4px 1px #ff9800, 0 0 8px 2px #ff9800;
          transition: box-shadow 0.3s;
        }
        .glow-btn:hover, .glow-btn:focus {
          box-shadow: 0 0 8px 2px #ff9800, 0 0 16px 4px #ff9800;
        }
        .generate-animate {
          animation: bounce 0.5s;
        }
        @keyframes bounce {
          0% { transform: scale(1);}
          30% { transform: scale(1.15);}
          50% { transform: scale(0.95);}
          70% { transform: scale(1.05);}
          100% { transform: scale(1);}
        }
        .copy-btn {
          box-shadow: 0 0 4px 0.5px #fff3, 0 0 0 #fff0;
        }
        .copy-btn:focus, .copy-btn:hover {
          box-shadow: 0 0 6px 1px #fff8;
        }
        /* Thumb effect for buttons */
        .thumb-effect {
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          background: rgba(255,255,255,0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.3s, width 0.3s, height 0.3s, opacity 0.3s;
          opacity: 0;
        }
        button:active .thumb-effect {
          width: 120%;
          height: 300%;
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
          transition: 0s;
        }
        `}
      </style>
    </>
  )
}

export default App
