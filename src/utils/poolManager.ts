class PoolManager {
    private poolDictionary: { [name: string]: Pool<any> } = {}
    createPool<T>(name: string, creator: (...args: any[]) => T, destructor?: (element: T, ...args: any[]) => void) {
        if (this.poolDictionary[name]) {
            throw `Pool with name ${name} is already busy`
        }
        this.poolDictionary[name] = new Pool(creator, destructor)
    }
    getFromPool<T>(name: string, validator?: (candidate: any) => candidate is T, ...args: any[]): Pooled<T> {
        if (!this.poolDictionary[name]) {
            throw `Pool with name ${name} not exists`
        }
        const element = this.poolDictionary[name].getElement(...args)
        if (validator) {
            if (!validator(element)) {
                throw `Value from pool ${name} does not support desired type`
            }
        }
        return element
    }
}

export type Pooled<T> = T & { returnToPool: (...args: any[]) => void }

export class Pool<T> {
    private elements: Pooled<T>[] = []
    constructor(private creator: (...args: any[]) => T, private destructor?: (element: T, ...args: any[]) => void) {

    }
    getElement(...args: any[]) {
        let element = this.elements.pop()
        if (!element) {
            element = this.creator(...args) as Pooled<T>
            element.returnToPool = (...args: any[]) => {
                if (this.destructor) {
                    this.destructor(element, ...args)
                }
                this.elements.push(element)
            }
        }
        return element
    }
}

export default new PoolManager()