export default interface IInitResponse {
    balance: number,
    linesDictionary: { [id: number]: number[] },
    bets: number[]

}