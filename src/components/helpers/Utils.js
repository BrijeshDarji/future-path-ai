export const htmlToPlainText = (html) => {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.innerText || temp.textContent;
}
