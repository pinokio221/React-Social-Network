import React from 'react'


class TwoFactorAuth extends React.Component {
    componentDidMount() {

    }
    render() {
        return <div><img src={this.props.qrCode}/></div>
    }
}

export default TwoFactorAuth;