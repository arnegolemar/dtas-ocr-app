import React from 'react';
import { Label, Input} from 'reactstrap';
import QR from 'qrcode.react';

const QRCode = (props) =>  {
    return (
      <div className="qr-code-display">
        <QR value={props.value}/>
        <div className="qr-details">
          {/* <strong>{props.type + ": "}</strong><span>{props.text}</span> */}
        </div>
      </div>
    );
}

export default QRCode;
