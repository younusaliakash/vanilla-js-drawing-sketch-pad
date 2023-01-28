class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color : white;
            box-shadow : 0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas);

        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);

        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML = "Undo"
        container.appendChild(this.undoBtn)

        this.ctx = this.canvas.getContext("2d");

        this.paths = [];
        this.isDrawing = false;
        this.#reDraw()

        this.#addEventListener()
    }

    reset() {
        this.paths = [];
        this.isDrawing = false;
        this.#reDraw()
    }

    #addEventListener() {
        this.canvas.onmousedown = (event) => {
            const mouse = this.#getMouse(event)
            this.paths.push([mouse])
            this.isDrawing = true;
        }

        this.canvas.onmousemove = (event) => {
            if (this.isDrawing) {

                const lastPath = this.paths[this.paths.length - 1]
                const mouse = this.#getMouse(event)
                lastPath.push(mouse)
                this.#reDraw()
            }
        }
        //use document to pravent side line
        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        }

        this.canvas.ontouchstart = (event) => {
            const locat = event.touches[0];
            this.canvas.onmousedown(locat)
        }
        this.canvas.ontouchmove = (event) => {
            const locat = event.touches[0];
            this.canvas.onmousedown(locat)
        }
        //use document to pravent side line
        this.canvas.ontouchend = () => {
            this.canvas.onmouseup()
        }

        // Undo
        this.undoBtn.onclick = () => {
            this.paths.pop()
            this.#reDraw()
        }


    }

    #reDraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        draw.paths(this.ctx, this.paths)

        if (this.paths.length > 0) {
            this.undoBtn.disabled = false
        } else {
            this.undoBtn.disabled = true;
        }
    }

    #getMouse = (event) => {
        const react = this.canvas.getBoundingClientRect();
        return [
            Math.round(event.clientX - react.left),
            Math.round(event.clientY - react.top)
        ]
    }
}
