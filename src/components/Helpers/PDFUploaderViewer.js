import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Col,
    Button,
} from 'reactstrap';
import { Document, Page, pdfjs } from 'react-pdf';
import FileUpload from 'components/Helpers/FileUpload';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PDFUploaderViewer = (props) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
    const [file, setFile] = useState(props.origFile); //setting 1 to show fisrt page

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    console.log("______________________________________________");
    console.log((props.origFile == file && file != null));
    console.log(file);
    console.log(props.origFile);
    console.log(props);
    var uploadDisabled = props.hasOwnProperty("uploadDisabled") ? props.uploadDisabled : false;
    var wRemove = props.hasOwnProperty("wRemove") ? props.wRemove : true;
    console.log(wRemove);
    return (
        <div id="pdf-notice-file-upload">
            {
                (!file)
                    ? <div className='pdf-upload-div'>
                        <FileUpload
                            GetProfileFile={(file) => {
                                setFile(file[0].file);
                            }}
                            file={null}
                            doctype="app-letter"
                            filetype=".pdf"
                        />

                        {
                            (props.origFile != null)
                                ? <Col className='pdf-pagination' sm="12">

                                    <Button size="sm" className="button-orange-gradient" color="primary" onClick={() => {
                                        setFile(props.origFile);
                                    }}>
                                        Revert
                                    </Button>
                                </Col>
                                : ""
                        }

                    </div>
                    : <div>
                        <Document
                            file={file}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page pageNumber={pageNumber} />
                        </Document>
                        <div className='pdf-pagination'>
                            <p>
                                <i
                                    className={"fas fa-angle-left clickable" + ((pageNumber <= 1) ? " disable-arrow" : "")}
                                    onClick={previousPage}
                                />
                                Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                                <i
                                    className={"fas fa-angle-right clickable" + ((pageNumber >= numPages) ? " disable-arrow" : "")}
                                    onClick={nextPage}
                                />
                            </p>
                            <br />
                        </div>

                        <Col className='pdf-pagination' sm="12">
                            {
                                wRemove
                                    ? <Button size="sm" className="button-orange-gradient" color="primary" onClick={() => {
                                        setFile(null);
                                    }}>
                                        Remove
                                    </Button>
                                    : ""
                            }

                            {
                                (props.origFile == file && file != null)
                                    ? ""
                                    : <Button size="sm" className="button-orange-gradient"
                                        disabled={(uploadDisabled) ? "disabled" : ""} color="primary"
                                        onClick={() => {
                                            props.upload(file)
                                        }}>
                                        Upload
                                    </Button>

                            }

                        </Col>

                    </div>
            }

        </div>
    );
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
})(PDFUploaderViewer);