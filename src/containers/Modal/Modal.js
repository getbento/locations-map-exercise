import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './modal.css';

const modalRoot = document.getElementById('modal');

class Modal extends Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.append(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  closeModal(event) {
    if (event.target.id === 'modalContainer') {
      this.props.hideDetail();
    }
  }

  render() {
    return (
      <div id="modalContainer" role="presentation" onClick={(event) => { this.closeModal(event); }} className={styles.modalBackground}>
        {ReactDOM.createPortal(
          this.props.children,
          this.el
        )}
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  hideDetail: PropTypes.func.isRequired
};

export default Modal;
