import Controller from "../Controller";
import { StateEvent } from "./StateEvent";

export default class State {

    controller: Controller
    eventMap: { [event in StateEvent]: State }


}