import { StateEvent } from "./StateEnums";

export default abstract class StateController {
    abstract go(): Promise<StateEvent>

}