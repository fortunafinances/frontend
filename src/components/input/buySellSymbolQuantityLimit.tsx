import Select from "react-select";
import { useState } from "react";
import { BiDollar } from "react-icons/bi";

export default function SymbolQuantityLimit() {
  const aquaticCreatures = [
    { label: "Shark", value: "Shark" },
    { label: "Dolphin", value: "Dolphin" },
    { label: "Whale", value: "Whale" },
    { label: "Octopus", value: "Octopus" },
    { label: "Crab", value: "Crab" },
    { label: "Lobster", value: "Lobster" },
  ];

  const [marketState, setMarketState] = useState(true);

  return (
    <div>
      <div className="m-4 mt-6 flex flex-col gap-3">
        <h1 className="font-semibold text-xl">Symbol</h1>
        <Select
          options={aquaticCreatures}
          theme={(theme) => ({
            ...theme,
            borderRadius: 3,
          })}
        />
      </div>
      <div className="m-4 mt-6 flex flex-col gap-3">
        <h1 className="font-semibold text-xl">Quantity</h1>
        {/* <div className="border-[1px] rounded-[3px] border-[#cccccc] "> */}
        <input
          type="number"
          min={1}
          step={1}
          placeholder="Stock Amount"
          className="input rounded-sm h-9 w-full border-[1px] rounded-[3px] border-[#cccccc] focus:ring-blue-500 focus:border-blue-500 focus:border-[2px] !outline-none"
        />
        {/* </div> */}
      </div>
      <div className="flex flex-row justify-evenly font-semibold [&>button]:w-full px-4 h-10 [&>button]:border border-[#cccccc] rounded-sm">
        <button
          onClick={() => {
            setMarketState(true);
          }}
          className={
            marketState ? "bg-[#e6e6e6] shadow-lg shadow-inner" : "bg-white"
          }
        >
          Market
        </button>
        <button
          onClick={() => {
            setMarketState(false);
          }}
          className={
            !marketState ? "bg-[#e6e6e6] shadow-lg shadow-inner" : "bg-white"
          }
        >
          Limit
        </button>
      </div>
      {!marketState ? (
        <span className="m-4 mt-6 flex flex-col gap-3">
          <h1 className="font-semibold text-xl">Limit Price</h1>
          <div className="relative">
            <i className="absolute top-[50%] -translate-y-[50%] align-middle">
              <BiDollar />
            </i>
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="Price"
              className="input h-9 w-full border-[1px] rounded-[3px] border-[#cccccc] focus:ring-blue-500 focus:border-blue-500 focus:border-[2px] !outline-none"
            />
          </div>
        </span>
      ) : null}
      <div className="m-4 mt-6 flex flex-row gap-3 font-semibold text-xl">
        <h1>Total Price</h1>
        <h1>$1234</h1>
      </div>
      <div className="flex flex-row justify-end m-4 gap-4 text-xl [&>button]:rounded-xl [&>button]:px-3 [&>button]:py-1 [&>button]:border-4 [&>button]:font-bold">
        <button className="border-[#920000] text-[#920000] bg-[#F9E5E5] hover:shadow-xl shadow-[#920000]">
          Cancel
        </button>
        <button className="border-success-content text-success-content bg-[#E3FDDC] hover:shadow-xl shadow-succes-content">
          Submit
        </button>
      </div>
    </div>
  );
}
