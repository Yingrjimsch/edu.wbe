const COLOR = ['blue', 'red']

function elt (type, attrs, ...children) {
    let node = document.createElement(type)
    for (a in attrs) {
        node.setAttribute(a, attrs[a])
    }
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child)
        else node.appendChild(document.createTextNode(child))
    }
    return node
}

function showBoard() {
    let i = 6*7;
    while(i > 0) {
        i--;
        rand = Math.floor(Math.random() * (COLOR.length + 1));
        if (rand < 2) {
            child = elt('div', {class:`${COLOR[rand]} piece`})
            document.querySelector('.board').appendChild(elt('div', {class:'field'}, child));
        } else {
            document.querySelector('.board').appendChild(elt('div', {class:'field'}));
        }
    }
}