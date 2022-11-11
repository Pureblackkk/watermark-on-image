export class BaseToolChains<T>{
    private functionChainsArray: ({ type: T, func: (() => void) })[] = [];

    protected addIntoFuncArray(type: T, func: (() => void)) {
        this.functionChainsArray.push({ type, func: () => {
            func();
            this.runNext();
        }});
        return this;
    }

    protected runNext(): void {
        if (this.functionChainsArray.length === 0) return;
        const { func: currentFuncForApply } = this.functionChainsArray.shift()!;
        currentFuncForApply();
    }
}