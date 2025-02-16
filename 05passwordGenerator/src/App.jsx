import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "~!@#$%^&*()_+-=<>?/.,:{}[]`";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);
  return (
    <>
      <h3 className="text-4xl text-white text-center mt-10 font-serif">
        Password Generator
      </h3>
      <div className="w-[600px] rounded-2xl bg-gray-800 text-white mx-auto mt-10">
        <div className="flex flex-col gap-2 p-8">
          <div className="flex gap-3">
            <input
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300  px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-100"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button
              className="inline cursor-pointer rounded-md bg-emerald-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 active:scale-95 w-fit"
              onClick={copyPasswordToClipboard}
            >
              Copy
            </button>
          </div>
          <div className="PB-range-slider-div">
            <input
              type="range"
              min={8}
              max={100}
              className="PB-range-slider"
              id="myRange"
              defaultValue={8}
              onChange={(e) => setLength(e.target.value)}
            />
            <p className="PB-range-slidervalue"> {length}</p>
          </div>
          <label className="flex cursor-pointer items-center justify-between p-1">
            Include Numbers
            <div className="relative inline-block">
              <input
                type="checkbox"
                className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white checked:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                defaultChecked={numberAllowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-gray-400 transition-all duration-200 peer-checked:left-7 peer-checked:bg-emerald-600"></span>
            </div>
          </label>
          <label className="flex cursor-pointer items-center justify-between p-1">
            Include Characters
            <div className="relative inline-block">
              <input
                type="checkbox"
                className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white checked:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                defaultChecked={characterAllowed}
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                }}
              />
              <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-gray-400 transition-all duration-200 peer-checked:left-7 peer-checked:bg-emerald-600"></span>
            </div>
          </label>
        </div>
      </div>
    </>
  );
};

export default App;
