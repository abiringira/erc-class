import React, { Component } from "react"
import { Modal, ModalBody, ModalHeader } from 'shards-react';

class Error extends Component {

  render() {
    const { open, title, message, code,onClose } = this.props

    return (
      <Modal
        open={open}
        toggle={() => {
          onClose(code);

        }}
      >
        <ModalHeader className="success-style" >
          <h4 className="error-code">{title}</h4>
        </ModalHeader>

        <ModalBody>
          <h6 className="success-text" >{message}</h6>
        </ModalBody>

      </Modal>
    )
  }
}

export default Error