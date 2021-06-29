async function loadSvgElements() {
    let data = {};
    let promise = new Promise((resolve, reject) => {
        document.querySelector("object svg").addEventListener("load", function () {
            this.querySelectorAll("g").forEach(g => {
                data[g.getAttribute("id")] = g;
            })
            resolve(data);
        });
    });
    return await promise;
}

loadSvgElements().then(data => {

    let saveText = document.querySelector("button").textContent;
    let valid_inputs = [];

    document.querySelector("button").addEventListener("click", function () {
        var style = document.createElement('style');
        style.innerHTML = `
             input:invalid {
                border: 1px solid red;
             }
        `;
        document.head.appendChild(style);

        if (valid_inputs.length === (document.querySelectorAll(".wrapper input").length)) {
            this.classList.remove("redButton");
            this.textContent = saveText;
        } else {
            this.classList.add("redButton");
            this.textContent = "Заполните поля";
        }

    })


    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", function () {
            if (!valid_inputs.includes(this)) {
                if (this.name === "marriage") {
                    document.querySelectorAll('input[type="radio"]').forEach(radio => {
                        valid_inputs.push(radio);
                    })
                } else {
                    valid_inputs.push(this);
                }
            }

            let button = document.querySelector("button");
            if (valid_inputs.length === (document.querySelectorAll(".wrapper input").length)) {
                button.classList.remove("redButton");
                button.textContent = saveText;
            }
            drawAnimation();
        })


    });


    const Painter = {
        drawFirstAnimation: function () {
            data["svg_1"].querySelectorAll("g").forEach(g => {
                let i = 1;

                if (g.getAttribute("id") === "arrow") {
                    g.querySelectorAll("path").forEach(path_node => {
                        setTimeout(() => path_node.setAttribute("fill", "#FF4F19"), 175 * i);
                        i += 0.5;
                    })
                } else {
                    g.querySelectorAll("path").forEach(path_node => {
                        setTimeout(() => path_node.setAttribute("fill", "#4BB34B"), 1);
                    })
                }
            })
        },
        drawSecondAnimation: function () {
            data["svg_2"].querySelectorAll("g").forEach(g => {
                let i = 1;

                if (g.getAttribute("id") === "arrow") {
                    g.querySelectorAll("path").forEach(path_node => {
                        setTimeout(() => path_node.setAttribute("fill", "#FF4F19"), 175 * i);
                        i += 0.5;
                    })
                } else {
                    g.querySelectorAll("path").forEach(path_node => {
                        setTimeout(() => path_node.setAttribute("fill", "#4BB34B"), 1);
                    })
                }
            })
        },
        drawThirdAnimation: function () {
            data["svg_3"].querySelectorAll("g").forEach(g => {
                let i = 1;
                if (g.getAttribute("id") === "arrow") {
                    g.querySelectorAll("path").forEach(path_node => {
                        setTimeout(() => path_node.setAttribute("fill", "#FF4F19"), 150 * i);
                        i += 0.5;
                    })
                    setTimeout(() => this.drawFourthAnimation(), 1500);
                } else {
                    g.querySelectorAll("path").forEach(path_node => {
                        setTimeout(() => path_node.setAttribute("fill", "#4BB34B"), 1);
                    })
                }
            })
        },
        drawFourthAnimation: function () {
            data["svg_4"].querySelectorAll("g").forEach(g => {
                let i = 1;

                if (g.getAttribute("id") === "arrow") {
                    g.querySelectorAll("path").forEach(path_node => {
                        setTimeout(() => path_node.setAttribute("fill", "#FF4F19"), 125 * i);
                        i += 0.5;
                    })


                } else {
                    g.querySelectorAll("path").forEach(path_node => {
                        setTimeout(() => path_node.setAttribute("fill", "#4BB34B"), 1);
                    })
                }
            })
        }

    }
    function drawAnimation() {
        if (valid_inputs.length >= 1) {
           Painter.drawFirstAnimation();
        }

        if (valid_inputs.length >= (document.querySelectorAll(".wrapper input").length / 1.4)) {
            Painter.drawSecondAnimation();
        }

        if (valid_inputs.length === (document.querySelectorAll(".wrapper input").length)) {
            Painter.drawThirdAnimation();
        }
    }
})
