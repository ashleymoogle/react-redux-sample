import { connect } from 'react-redux';

import MenuNavTop from '../menus/MenuNavTop'
import styles from "./SecondContainer.css"

class SecondContainer extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
        console.log("Component mounted with props :", this.props)
    }

    render () {
        let {factory, counter2, onIncrement, onDecrement} = this.props
        return (
            <div className={"wrapper"}>
                <div>
                    <MenuNavTop factory={factory}/>
                </div>
                <h2>TEST</h2>
                <div>
                    <h3 className={styles.title1}>COUNTER 2 : {counter2}</h3>
                    <button onClick={() => onIncrement()}>+</button>
                    <button onClick={() => onDecrement()}>-</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter2: state.counter2
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        onIncrement:() => {
            dispatch({
                type:`INCREMENT2`,
            })
        },
        onDecrement:() => {
            dispatch({
                type:`DECREMENT2`,
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SecondContainer)
