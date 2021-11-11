import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { init, submitTxs } from "./controller";
import Modal from "../Modal";
import { PureStakeHelp } from "../PureStakeHelp";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";

export const SubmitLink = (props) => {
  let { link } = useParams();

  const [swapRequest, setSwapRequest] = useState(null);
  const [swapViewData, setSwapViewData] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [showPurestakeHelpModal, setShowPurestakeHelpModal] = useState(false);
  const [peerAddressIsCopied, setPeerAddressIsCopied] = useState(false);

  const [sendAssetIdIsCopied, setSendAssetIdIsCopied] = useState(false);
  const [receiveAssetIdIsCopied, setReceiveAssetIdIsCopied] = useState(false);

  useEffect(() => {
    init(link, apiKey, props.statusMsg, setSwapRequest, setSwapViewData);
  }, [link]);

  const onCopyPeerAddress = () => {
    setPeerAddressIsCopied(true);
    setTimeout(() => {
      setPeerAddressIsCopied(false);
    }, 1000);
  };

  const onCopySendAssetId = () => {
    setSendAssetIdIsCopied(true);
    setTimeout(() => {
      setSendAssetIdIsCopied(false);
    }, 1000);
  };

  const onCopyReceiveAssetId = () => {
    setReceiveAssetIdIsCopied(true);
    setTimeout(() => {
      setReceiveAssetIdIsCopied(false);
    }, 1000);
  };

  const swapViewDataView = () => {
    if (swapViewData) {
      return (
        <div>
          <div className="submit-swap-label">{"From:"}</div>
          <CopyToClipboard text={swapViewData.peer} onCopy={onCopyPeerAddress}>
            <div className="copyable">
              {swapViewData.peer}
              <span class="copy">
                {peerAddressIsCopied ? "copied!" : <MdContentCopy />}
              </span>
            </div>
          </CopyToClipboard>
          <div className="submit-swap-label">{"You send:"}</div>
          {tranferView(
            swapViewData.send,
            sendAssetIdIsCopied,
            onCopySendAssetId
          )}
          <div className="submit-swap-label">{"You receive:"}</div>
          {tranferView(
            swapViewData.receive,
            receiveAssetIdIsCopied,
            onCopyReceiveAssetId
          )}
          <div className="submit-swap-label">{"Your fee:"}</div>
          <div>{swapViewData.my_fee}</div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <div className="container">
        <div className="submit-swap-title">{"You got a swap request!"}</div>
        <div>
          {"Purestake api key "}
          <a href="#" onClick={() => setShowPurestakeHelpModal(true)}>
            ?
          </a>
        </div>
        <input
          type="password"
          placeholder="api key"
          className="address-input"
          size="64"
          value={apiKey}
          onChange={(event) => {
            setApiKey(event.target.value);
          }}
        />
        {swapViewDataView(swapViewData)}
        <button
          className="submit-sign-and-submit-button"
          onClick={async () => {
            await submitTxs(
              apiKey,
              swapRequest,
              props.statusMsg,
              props.showProgress
            );
          }}
        >
          {"Sign and submit"}
        </button>
        {showPurestakeHelpModal && (
          <Modal
            title={"Purestake API key help"}
            onCloseClick={() => setShowPurestakeHelpModal(false)}
          >
            <PureStakeHelp />
          </Modal>
        )}
      </div>
    </div>
  );
};

const tranferView = (transfer, assetIdIsCopied, onCopyAssetId) => {
  if (transfer.unit === "algo") {
    return <div>{transfer.amount + " Algos"}</div>;
  } else if (transfer.unit === "asset") {
    let text =
      "Asset id: " + transfer.asset_id + ", amount: " + transfer.amount;
    return (
      <CopyToClipboard text={text} onCopy={onCopyAssetId}>
        <div className="copyable">
          {text}
          <span class="copy">
            {assetIdIsCopied ? "copied!" : <MdContentCopy />}
          </span>
        </div>
      </CopyToClipboard>
    );
  } else {
    throw new Error("Invalid transfer type: " + transfer.unit);
  }
};
