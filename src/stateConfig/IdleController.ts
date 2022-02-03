import StateController from "./StateController";

export default class IdleController extends StateController {
    async go(){
        return undefined
    }
}