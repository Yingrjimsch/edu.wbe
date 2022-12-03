function renderSJDON1(sjdon, node=document.getElementById("app")) {
    let [type, ...children] = sjdon;
    let newNode = document.createElement(type);
    let attr = [];
    children.forEach(child => {
        if(Array.isArray(child)) {
            renderSJDON1(child, newNode);
        } else if (typeof child === 'object') {
            attr.push(child);
        } else {
            newNode.textContent += child
        }
    });
    Object.assign(newNode, ...attr);
    node.appendChild(newNode);
}

function renderSJDON2(sjdon, node) {
    if (Array.isArray(sjdon)) {
      let [type, ...children] = sjdon
      let newNode = document.createElement(type)
      for (let child of children) renderSJDON2(child, newNode)
      node.appendChild(newNode)
    } else if (typeof sjdon === 'object') {
      Object.assign(node, sjdon)
    } else {
      node.appendChild(document.createTextNode(sjdon))
    }
}

function renderSJDON3(sjdon, node) {
    if (Array.isArray(sjdon)) {
      let [type, ...children] = sjdon
      let newNode = document.createElement(type)
      for (let child of children) renderSJDON3(child, newNode)
      node.appendChild(newNode)
    } else if (typeof sjdon === 'object') {
      for (attr in sjdon) {
        node.setAttribute(attr, sjdon[attr])
      }
    } else {
      node.appendChild(document.createTextNode(sjdon))
    }
}

function renderSJDON4(sjdon, node=document.getElementById("app")) {
    let [type, ...children] = sjdon;
    let newNode = document.createElement(type);
    children.filter(child => Array.isArray(child)).forEach(child => renderSJDON4(child, newNode));
    Object.assign(newNode, ...children.filter(child => (!Array.isArray(child) && typeof child === 'object')));
    children.filter(child => typeof child === 'string').forEach(text => newNode.textContent += text);
    node.appendChild(newNode);
}

const element =
 ["div", {style: "background: salmon"},
 ["h1", "Hello World"],
 ["h2", {style: "text-align:right"}, "from our library"]]

let appRoot = document.getElementById("app")

for (let i = 1; i<5; i++) {
    let times = []
    for (let j = 0; j<100000; j++) {
        appRoot.innerHTML = ''
        let startTime = performance.now()
        window['renderSJDON'+i](element, appRoot)
        //console.log(performance.now() - startTime)
        times.push(performance.now() - startTime);
    }
    console.log('render function:', i, 'mean performance:', times.reduce((partialSum, a) => partialSum + a, 0) / 100000)
}