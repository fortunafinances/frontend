import { useEffect, useState } from "react";
import { BiDollar } from "react-icons/bi";
import { gql, useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Stock } from "../../utilities/types";
import { formatDollars } from "../../utilities/currency";
import { currentAccountId, symbol } from "../../utilities/reactiveVariables";
import { OrderType, OrderSide } from "../../utilities/types";
import { GET_STOCK_NAMES } from "../../utilities/graphQL";
import StockSearchBar from "./stockSearch";
import { preventMinus } from "../../utilities/common";

interface StockData {
  stocks: Stock[];
}

export interface buyProp {
  buyOrSell: boolean;
}

export default function TradeForm({ buyOrSell }: buyProp) {
  const { loading, error, data } = useQuery<StockData>(GET_STOCK_NAMES);

  const symbolName = useReactiveVar(symbol);
  const accountNumber = useReactiveVar(currentAccountId);

  const PLACE_ORDER = gql`
    mutation InsertTrade(
      $accID: Int!
      $type: OrderType!
      $side: OrderSide!
      $ticker: String!
      $tradeQty: Int!
    ) {
      insertTrade(
        accID: $accID
        type: $type
        side: $side
        ticker: $ticker
        tradeQty: $tradeQty
      )
    }
  `;

  type TransferReturnData = {
    insertTrade: string;
  };

  const [placeOrder] = useMutation<TransferReturnData>(PLACE_ORDER);

  const successModal = document.getElementById(
    "trade_successful"
  ) as HTMLDialogElement;

  const handleSubmit = () => {
    placeOrder({
      variables: {
        accID: accountNumber,
        type: marketState ? OrderType.Market : OrderType.Limit,
        side: buyOrSell ? OrderSide.Buy : OrderSide.Sell,
        ticker: symbolName,
        tradeQty: quantity,
      },
    })
      .then((data) => {
        console.log("success");
        if (data.data?.insertTrade === "Success") {
          successModal.showModal();
        }
      })
      .catch((error) => console.error(error))
      .finally(() => console.log("d"));
  };

  const [marketState, setMarketState] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (symbolName !== "" && symbolName !== "Select..." && data) {
      const stock = data.stocks.find(
        (element) => element.ticker === symbolName
      );
      const price = stock!.currPrice;
      setStockPrice(price!);
      setTotalPrice(quantity * stockPrice);
    }
  }, [data, quantity, symbolName, stockPrice]);

  if (loading) return <>Loading</>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <div className="m-4 mt-6 flex flex-col gap-3">
        <h1 className="font-semibold text-xl">Symbol</h1>
        <StockSearchBar className="z-40 w-full" />
      </div>
      <div className="m-4 mt-6 flex flex-col gap-3">
        <h1 className="font-semibold text-xl">Quantity</h1>
        <div className="border-[0px] rounded-[3px] border-[#cccccc] ">
          <input
            type="number"
            min={1}
            step={1}
            onKeyDown={preventMinus}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
            value={quantity}
            className="input h-9 w-full border-[1px] rounded-[3px] border-[#cccccc] focus:ring-blue-500 focus:border-blue-500 focus:border-[2px] !outline-none"
          />
        </div>
      </div>
      {/* market limit toggle buttons */}
      <div className="flex flex-row justify-evenly font-semibold [&>button]:w-full px-4 h-10 [&>button]:border border-[#cccccc] rounded-sm">
        <button
          onClick={() => {
            setMarketState(true);
          }}
          className={marketState ? "bg-[#e6e6e6] shadow-inner" : "bg-white"}
        >
          Market
        </button>
        <button
          onClick={() => {
            setMarketState(false);
          }}
          className={!marketState ? "bg-[#e6e6e6] shadow-inner" : "bg-white"}
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
              onKeyDown={preventMinus}
              className="input h-9 w-full border-[1px] rounded-[3px] border-[#cccccc] focus:ring-blue-500 focus:border-blue-500 focus:border-[2px] !outline-none"
            />
          </div>
        </span>
      ) : null}
      <div className="m-4 mt-6 flex flex-row gap-3 font-semibold text-xl">
        <h1>Total Price:</h1>
        <h1>
          {quantity} x {formatDollars(stockPrice)} = {formatDollars(totalPrice)}
        </h1>
      </div>
      {/* cancel and submit buttons */}
      <div className="flex flex-row justify-end m-4 gap-4 text-xl [&>button]:rounded-xl [&>button]:px-3 [&>button]:py-1 [&>button]:border-4 [&>button]:font-bold">
        <button className="border-[#920000] text-[#920000] bg-[#F9E5E5] hover:shadow-xl shadow-[#920000] hover:bg-[#920000] hover:text-[#f9e5e5]">
          Cancel
        </button>
        <button
          className="border-success-content text-success-content bg-[#E3FDDC] hover:shadow-xl shadow-success-content hover:bg-success-content hover:text-[#e3fddc]"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
