import React, { Component } from "react";


class FundraiserList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Fundraisers</h1>
                <p>
                    {this.props.user}
                </p>
            </div>
        );
    }

}


export default FundraiserList;
