class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.state = config.initial;
        this.config = config;
        this.undoList = [];
        this.stateHistory = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.stateHistory.push(this.state)
            this.state = state;
            this.undoList = [];
        }
        else throw new Error

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.state].transitions[event])
            this.changeState(this.config.states[this.state].transitions[event]);
        else throw new Error;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.config.initial
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var statesWithEvent = [];
        if (event) {
            Object.keys(this.config.states).forEach(state => {
                if (this.config.states[state].transitions[event]) statesWithEvent.push(state);
            })
            return statesWithEvent;
        }
        else return Object.keys(this.config.states);

    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.stateHistory.length) {
            this.undoList.push(this.state);
            this.state = this.stateHistory.pop();
            return true;
        }
        else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.undoList.length) {
            this.stateHistory.push(this.state);
            this.state = this.undoList.pop();
            return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stateHistory = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
