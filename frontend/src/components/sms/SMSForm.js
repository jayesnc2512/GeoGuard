import React, { Component } from 'react';
import styled from 'styled-components';

const SMSPageWrapper = styled.div`
.sms-form {
  text-align: left;
  padding: 1em;
}
.sms-form label {
  display: block;
}
.sms-form input,
.sms-form textarea {
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
}
.sms-form div {
  margin-bottom: 0.5em;
}
.sms-form button {
  font-size: 1em;
  width: 100%;
}
.sms-form.error {
  outline: 2px solid #f00;
}

`;
class SMSForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        to: '',
        body: ''
      },
      submitting: false,
      error: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    fetch(`${process.env.REACT_APP_API_URL}/twilio/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.message)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: '',
              body: ''
            }
          });
        } else {
          this.setState({
            error: true,
            submitting: false
          });
        }
      });
  }

  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    this.setState({
      message: { ...this.state.message, [name]: event.target.value }
    });
  }

  render() {
    return (
      <SMSPageWrapper>
      <form
        onSubmit={this.onSubmit}
        className={this.state.error ? 'error sms-form' : 'sms-form'}
      >
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="tel"
            name="to"
            id="to"
            value={this.state.message.to}
            onChange={this.onHandleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Message:</label>
          <textarea
            name="body"
            id="body"
            value={this.state.message.body}
            onChange={this.onHandleChange}
          />
        </div>
        <button type="submit" disabled={this.state.submitting}>
          Send message
        </button>
      </form>
      </SMSPageWrapper>
    );
  }
}

export default SMSForm;
