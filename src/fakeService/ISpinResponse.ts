import IWinLine from "./IWinLine";

export default interface ISpinResponse {
    balance: number,
    iconsMap: number[][],
    winLines: IWinLine[],
    winSum: number
}