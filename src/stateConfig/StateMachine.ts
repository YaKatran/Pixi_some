import IdleController from "./IdleController"
import InitController from "./InitController"
import SpinEndController from "./SpinEndController"
import SpinningController from "./SpinningController"
import SpinStartController from "./SpinStartController"
import StartGameController from "./StartGameController"
import { State, StateEvent } from "./StateEnums"
import WinAnimationController from "./WinAnimationController"

type TTransition = {
    readonly from: State,
    readonly to: State,
    readonly event: StateEvent
}

export default class StateMachine {
    private currentState: State
    private readonly stateControllers = {
        [State.Init]: new InitController(),
        [State.StartGame]: new StartGameController(),
        [State.Idle]: new IdleController(),
        [State.SpinStart]: new SpinStartController(),
        [State.SpinEnd]: new SpinEndController(),
        [State.Spinning]: new SpinningController(),
        [State.WinAnimation]: new WinAnimationController()
    }
    private readonly config: TTransition[] = [
        {from: State.Init, to: State.StartGame, event: StateEvent.Default},
        {from: State.StartGame, to: State.Idle, event: StateEvent.Default},
        {from: State.Idle, to: State.SpinStart, event: StateEvent.InteractionStart},
        {from: State.SpinStart, to: State.Spinning, event: StateEvent.Default},
        {from: State.Spinning, to: State.SpinEnd, event: StateEvent.Default},
        {from: State.SpinEnd, to: State.WinAnimation, event: StateEvent.GotWin},
        {from: State.SpinEnd, to: State.Idle, event: StateEvent.GotLoose},
        {from: State.WinAnimation, to: State.Idle, event: StateEvent.AnimationEnded}
    ]

    constructor() {
        this.currentState = State.Init
        this.stateControllers[this.currentState].go().then(this.onStateEnded)
    }
    private readonly onStateEnded = (event: StateEvent) => {
        const newState = this.config.find(transition => transition.event === event && this.currentState === transition.from).to
        this.currentState = newState;
        this.stateControllers[this.currentState].go().then(this.onStateEnded)
    }
}