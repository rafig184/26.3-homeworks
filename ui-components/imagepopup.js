function openPopUp(src) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    const image = getImg(src);
    const closeBtn = document.createElement("span");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = `&times;`;
    closeBtn.addEventListener("click", () => {
        popup.remove()
    })

    popup.appendChild(image);
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);
    popup.style.display = "flex"
}