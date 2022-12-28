import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal"

function Balance() {
  const [balanceId, setBalanceId] = useState("")
  const [balance, setBalance] = useState("")


  async function handleClick() {
    const balance = await token.balanceOf(Principal.fromText(balanceId))
    const symbol = await token.getSymbol()
    setBalance(`${balance.toLocaleString()} ${symbol}`)
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          onChange={(event) => setBalanceId(event.target.value)}
          value={balanceId}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={balance === ""}>This account has a balance of {balance} .</p>
    </div>
  );
}

export default Balance;
