import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { MdContentCopy } from "react-icons/md";

const CopyPasteText = ({ text, copyText: copyTextOpt }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyText = copyTextOpt ?? text;

  const onCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <CopyToClipboard text={copyText} onCopy={onCopy}>
      <div className="copyable">
        <div className="copyable__text">{text}</div>
        <span className={`copy ${isCopied ? "active" : ""}`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z"
              fill="white"
            />
            <path
              d="M17.1 2H12.9C9.81693 2 8.37099 3.09409 8.06975 5.73901C8.00673 6.29235 8.465 6.75 9.02191 6.75H11.1C15.3 6.75 17.25 8.7 17.25 12.9V14.9781C17.25 15.535 17.7077 15.9933 18.261 15.9303C20.9059 15.629 22 14.1831 22 11.1V6.9C22 3.4 20.6 2 17.1 2Z"
              fill="white"
            />
          </svg>
          {isCopied ? " copied!" : ""}
        </span>
      </div>
    </CopyToClipboard>
  );
};

export default CopyPasteText;
