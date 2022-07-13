import React, { Component } from 'react'
// import { QrReader } from 'react-qr-reader'
import { connect } from 'react-redux';
import QrReader from 'modern-react-qr-reader'
// import QrReader from 'react-qr-scanner'
// import Scanner from "react-webcam-qr-scanner";
// import BarcodeScannerComponent from "react-qr-barcode-scanner";


class QRCodeScanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
      checked: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleScan = this.handleScan.bind(this)
  }

  handleScan(data) {
    console.log("::::::AAAA!!!!!!!");
    console.log(data);

    if (data) {
      this.props.dataFetch(data);
    }

    // this.setState({
    //   result: data,
    // })
  }

  handleError(err) {
    console.log("(!!!!!!!!!!@@@@@@@@@@@");
    alert(err)
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    return (
      <div className='w100'>
        {/* <Switch
          checked={this.state.checked}
          onChange={this.handleChange}
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={20}
          width={48}
          className="react-switch"
          id="material-switch"
        />

        {
          (this.state.checked)
            ? <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: '100%' }}
            />
            :""
        } */}
        
        <QrReader
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
          className="w100"
        />

        {/* <Scanner
          className="some-classname"
          onDecode={this.handleError}
          onScannerLoad={this.handleScan}
          constraints={{
            audio: false,
            video: {
              facingMode: "environment"
            }
          }}
          captureSize={{ width: "400px", height: "500px" }}
        /> */}
{/* 
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) console.log(result.text);
            else console.log("Not Found");
          }}
        /> */}

        {/* <p>{this.state.result}</p> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(QRCodeScanner);