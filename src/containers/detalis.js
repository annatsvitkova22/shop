import React, {Component} from 'react';
import { connect } from 'react-redux';

class Details extends Component {
    render () {
        if(!this.props.author){
            return (<p>Add author...</p>);
        }
        return (
            <div>
                <h2>{this.props.author.name}</h2>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        author: state.active
    };
}

export default connect (mapStateToProps)(Details);