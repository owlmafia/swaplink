import { updateFeeTotal } from "./controller";
import Modal from "../Modal";
import StatusMsgUpdater from "../StatusMsgUpdater";
import React, { useState } from "react";
import FeeInput from "./FeeInput";

export const FeesModal = ({
  myFee,
  setMyFee,
  peerFee,
  setPeerFee,
  feeTotal,
  setFeeTotal,
  hideFeeTotal,
  setHideFeeTotal,
  setShowFeesModal,
}) => {
  const [statusMsg, setStatusMsg] = useState(null);
  const [statusMsgUpdater, _] = useState(new StatusMsgUpdater(setStatusMsg));

  return (
    <Modal
      title={"Fees"}
      statusMsg={statusMsg}
      onCloseClick={() => setShowFeesModal(false)}
    >
      <FeeInput
        title={"Your fee"}
        fee={myFee}
        setFee={setMyFee}
        onChange={(input) => {
          updateFeeTotal(
            statusMsgUpdater,
            input,
            peerFee,
            setFeeTotal,
            setHideFeeTotal
          );
        }}
      />
      <FeeInput
        title={"Peer's fee"}
        fee={peerFee}
        setFee={setPeerFee}
        onChange={(input) =>
          updateFeeTotal(
            statusMsgUpdater,
            myFee,
            input,
            setFeeTotal,
            setHideFeeTotal
          )
        }
      />
      {!hideFeeTotal && (
        <div className="total-fees">
          <span className="fee-title">
            Total Fee
            <svg
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.05 3.60997C8.145 3.60997 7.775 2.96997 8.225 2.18497C8.485 1.72997 8.33 1.14997 7.875 0.889968L7.01 0.394968C6.615 0.159968 6.105 0.299968 5.87 0.694968L5.815 0.789968C5.365 1.57497 4.625 1.57497 4.17 0.789968L4.115 0.694968C3.89 0.299968 3.38 0.159968 2.985 0.394968L2.12 0.889968C1.665 1.14997 1.51 1.73497 1.77 2.18997C2.225 2.96997 1.855 3.60997 0.95 3.60997C0.43 3.60997 0 4.03497 0 4.55997V5.43997C0 5.95997 0.425 6.38997 0.95 6.38997C1.855 6.38997 2.225 7.02997 1.77 7.81497C1.51 8.26997 1.665 8.84997 2.12 9.10997L2.985 9.60497C3.38 9.83997 3.89 9.69997 4.125 9.30497L4.18 9.20997C4.63 8.42497 5.37 8.42497 5.825 9.20997L5.88 9.30497C6.115 9.69997 6.625 9.83997 7.02 9.60497L7.885 9.10997C8.34 8.84997 8.495 8.26497 8.235 7.81497C7.78 7.02997 8.15 6.38997 9.055 6.38997C9.575 6.38997 10.005 5.96497 10.005 5.43997V4.55997C10 4.03997 9.575 3.60997 9.05 3.60997ZM5 6.62497C4.105 6.62497 3.375 5.89497 3.375 4.99997C3.375 4.10497 4.105 3.37497 5 3.37497C5.895 3.37497 6.625 4.10497 6.625 4.99997C6.625 5.89497 5.895 6.62497 5 6.62497Z"
                fill="white"
              />
            </svg>
          </span>

          <span className="fee-currency">
            {feeTotal}

            <span>
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.59531 12L4.33076 8.99471L6.06621 6L7.79108 2.99471L8.0768 2.51852L8.20378 2.99471L8.73288 4.97355L8.14029 6L6.40484 8.99471L4.67997 12H6.75404L8.48949 8.99471L9.38896 7.43915L9.81225 8.99471L10.6165 12H12.4789L11.6747 8.99471L10.8704 6L10.6588 5.22751L11.9498 2.99471H10.0662L10.0027 2.77249L9.34664 0.31746L9.26198 0H7.45246L7.41013 0.0634921L5.71701 2.99471L3.98156 6L2.25669 8.99471L0.52124 12H2.59531Z"
                  fill="#F8F9FF"
                />
              </svg>
              algo
            </span>
          </span>
        </div>
      )}

      <button className="btn btn--confirm-fees">confirm</button>
    </Modal>
  );
};