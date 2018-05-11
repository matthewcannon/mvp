import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as _Game from "../core/game";

class Game extends React.Component {
    componentDidMount() {
        const gameRefreshInterval = 20;
        this.timer = setInterval(() => this.props.refreshGame(this.props.actors), gameRefreshInterval);
    }

    render() {
        return (
            <div>
                <span>MVP</span>
            </div>
        );
    }
}

Game.propTypes = {
    actors: PropTypes.array,
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
