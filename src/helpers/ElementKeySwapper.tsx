type ElementKeySwapperConstructorType = {
    elements: JSX.Element[] | null;
    holdingItemAttKey: number | null,
    droppedOnItemAttKey: number | null,
}

export class ElementKeySwapper {
    holdingItemAttKey: number | null = null;
    droppedOnItemAttKey: number | null = null;
    holdingItemIndex: number | null = null;
    droppedOnItemIndex: number | null = null;
    holdingItem: JSX.Element | null = null;
    droppedOnItem: JSX.Element | null = null;
    elements: JSX.Element[] | null = [];

    constructor(args: ElementKeySwapperConstructorType) {
        this.elements = args.elements;
        this.holdingItemAttKey = args.holdingItemAttKey;
        this.droppedOnItemAttKey = args.droppedOnItemAttKey;
    }

    swap() {
        if (this.elements) {
            this.setItems();

            if (this.holdingItemIndex === null || this.droppedOnItemIndex === null) {
                return this.elements;
            }


            // swap
            return this.elements.map((comp: JSX.Element, i: number) => {
                if (i === this.holdingItemIndex) {
                    return this.droppedOnItem;
                }
                if (i === this.droppedOnItemIndex) {
                    return this.holdingItem;
                }
                return comp;
            }) as JSX.Element[]
        }
        return null;
    }

    setItems() {
        this.elements?.forEach((comp: JSX.Element, i: number) => {
            if (this.elements === null) {
                return;
            }

            if (this.elements[i].props.arrayKey === this.holdingItemAttKey) {
                this.holdingItem = this.elements[i];
                this.holdingItemIndex = i;
            }
            if (this.elements[i].props.arrayKey === this.droppedOnItemAttKey) {
                this.droppedOnItem = this.elements[i];
                this.droppedOnItemIndex = i;
            }
        })
    }

}