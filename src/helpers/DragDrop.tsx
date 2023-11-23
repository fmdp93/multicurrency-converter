export class DragDrop {
    holdingElKey = 0;
    dropOnRowElKey = 0;
    holdingEl: HTMLElement | null = null;
    dropEl: HTMLElement | null = null;

    drag(ev: React.DragEvent<HTMLDivElement>) {
        if (ev.target instanceof HTMLDivElement) {
            this.holdingElKey = this.getKey(ev);
            ev.target.style.setProperty("display", "none")
            this.holdingEl = ev.target;
        }
    }
    allowDrop(ev: React.DragEvent<HTMLDivElement>) {
        ev.preventDefault();
    }
    drop(ev: React.DragEvent<HTMLDivElement>) {
        if (ev.target instanceof HTMLDivElement) {
            this.dropOnRowElKey = this.getKey(ev);
            this.dropEl = ev.target;
        }

        this.holdingEl?.style.setProperty("display", "flex");
    }

    getKey(ev: React.DragEvent<HTMLDivElement>): number {
        if (ev.target instanceof HTMLDivElement) {
            return parseInt(
                ev.target.getAttribute("data-key") || "0");
        }
        return 0;
    }

    // 4
    // dragEnd(ev: React.DragEvent<HTMLDivElement>) {

    //     if (ev.target instanceof HTMLDivElement) {
    //         ev.target.style.setProperty("display", "flex")
    //     }
    // }


}