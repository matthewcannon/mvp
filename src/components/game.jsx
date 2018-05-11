import React from "react";
import { connect } from "react-redux";
import * as _Game from "../core/game";

class Game extends React.Component {
    componentDidMount() {
        const gameRefreshInterval = 20;
        this.timer = setInterval(() => this.props.refreshGame(this.props.actors), gameRefreshInterval);
    }

    render() {
        <div>
            <s>MVP</s>
        </div>
    }
}

Game.propTypes = {
    actors: React.PropTypes.array,
};

const mapStateToProps = state => {
    return {
        actors: state.actors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        refreshGame: actors => _Game.refresh(actors, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
