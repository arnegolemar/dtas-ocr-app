import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropzone, FileItem } from "@dropzone-ui/react";
import { SERVER_URI } from 'config';

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };

        this.SetFiles = this.SetFiles.bind(this);
        this.RemoveFile = this.RemoveFile.bind(this);
    }

    SetFiles(files) {
        console.log(files);
        this.props.GetProfileFile(files);
        this.setState({
            files: [...files]
        })
    }

    RemoveFile(id) {
        this.setState({
            files: this.state.files.filter((x) => x.id !== id)
        })
    };


    render() {

        console.log(this.state.files);

        return (
            <div id="file-upload">
                {
                    (this.props.file != null)
                        ? <img
                            className='clickable'
                            style={{ minWidth: "200px", maxWidth: "200px" }}
                            alt="..."
                            src={
                                require("../../assets/img/file-icon.png")
                                    .default
                            }
                            onClick={() => {
                                console.log(this.props.file.path);
                                console.log(SERVER_URI + "files/" + this.props.doctype + "/" + this.props.file.path);
                                window.open(SERVER_URI + "files/" + this.props.doctype + "/" + this.props.file.path);
                            }}
                        />
                        : <Dropzone
                            style={{ minWidth: "200px", maxWidth: "500px" }}
                            onChange={this.SetFiles}
                            value={this.state.files}
                            maxFileSize={2618000}
                            maxFiles={1}
                            accept={(this.props.hasOwnProperty("filetype") && this.props.filetype != "")?this.props.filetype:".pdf, .docs, .xlsx, .xls, .doc, .docx, image/*"}
                        >
                            {this.state.files.map((file) => (
                                <FileItem {...file} onDelete={this.RemoveFile} key={file.id} info />
                            ))}
                        </Dropzone>
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {

})(FileUpload);
