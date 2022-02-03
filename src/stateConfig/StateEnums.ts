export enum State {
    Init,
    StartGame,
    Idle,
    SpinStart,
    Spinning,
    SpinEnd,
    WinAnimation
}

export enum StateEvent {
    Default,
    InteractionStart,
    GotWin,
    GotLoose,
    AnimationEnded
}