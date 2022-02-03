import IWinLine from "./fakeService/IWinLine"

export default class Model {
    
    private balance: number
    private winLines: IWinLine[]

    setBalance(balance: number){
        this.balance = balance
    }

    getBalance(){
        return this.balance
    }

    setWinlines(winLines: IWinLine[]) {
        this.winLines = winLines
    }

    getWinlines(){
        return this.winLines
    }

}