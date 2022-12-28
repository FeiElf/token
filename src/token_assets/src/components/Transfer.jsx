import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal"

function Transfer() {

  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  
  async function handleClick() {
    setFeedback("");
    setDisabled(true);
    const principalTo = Principal.fromText(to);
    const amountInt = parseInt(amount);
    const result = await token.transfer(principalTo, amountInt);
    setFeedback(result);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={to}
                onChange={ (e) => setTo(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={ (e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={disabled}>
            Transfer
          </button>
        </p>
        <p>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
