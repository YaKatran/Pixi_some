import IIcon from "./IIcon";
import IInitResponse from "./IInitResponse";
import ISpinResponse from "./ISpinResponse";
import IWinLine from "./IWinLine";

export default class FakeService {



    private winsDictionary: { [id: number]: { [count: number]: number } } = {
        1: { 3: 1, 4: 2, 5: 5 },
        2: { 3: 1, 4: 2, 5: 5 },
        3: { 3: 1, 4: 2, 5: 5 },
        4: { 3: 2, 4: 5, 5: 10 },
        5: { 3: 2, 4: 5, 5: 10 },
        6: { 3: 5, 4: 10, 5: 20 }
    }

    private linesDictionary: { [id: number]: number[] } = {
        1: [0, 0, 0, 0, 0],
        2: [1, 1, 1, 1, 1],
        3: [2, 2, 2, 2, 2],
        4: [0, 0, 1, 2, 2],
        5: [2, 2, 1, 0, 0],
        6: [0, 1, 1, 1, 2],
        7: [2, 1, 1, 1, 0],
        8: [1, 2, 2, 2, 1],
        9: [1, 0, 0, 0, 1]
    }

    private balance = 15000

    private numberOfSymbols = 7

    private getIdsMap(): number[][] {
        const idsMap: number[][] = []
        for (let i = 5; i--;) {
            idsMap[i] = []
            for (let n = 3; n--;) {
                idsMap[i][n] = Math.floor(Math.random() * this.numberOfSymbols) + 1
            }

        }
        return idsMap
    }

    async getInitResponse(): Promise<IInitResponse> {
        return {
            balance: this.balance,
            linesDictionary: this.linesDictionary,
            bets: [1, 2, 5, 10, 20]

        }
    }

    async getSpinResponse(bet: number): Promise<ISpinResponse> {
        const iconsMap = this.getIdsMap()
        const winLines: IWinLine[] = []
        let winSum = 0

        for (const lineId in this.linesDictionary) {
            const line = this.linesDictionary[lineId]
            const iconId = iconsMap[0][line[0]]
            const payRules = this.winsDictionary[iconId]
            const icons: IIcon[] = [{ position: [0, line[0]], id: iconId }]
            if (!payRules) {
                continue
            }
            let payRule: { count: number, sum: number }
            for (let i = 1; i < line.length; i++) {
                if (iconsMap[i][line[i]] !== iconId) {
                    break
                }
                icons.push({ position: [i, line[i]], id: iconId })
                if (payRules[i + 1]) {
                    payRule = { count: i + 1, sum: payRules[i + 1] }
                }
            }

            if (payRule) {
                const sum = bet * payRule.sum
                winLines.push({ lineId: +lineId, icons, sum })
                winSum += sum
            }

        }

        return { balance: this.balance - bet + winSum, iconsMap, winLines, winSum }

    }
}