let bubbleElements = document.getElementsByClassName('bubble');

for(el of bubbleElements){
    el.addEventListener('click', bubble);
    el.addEventListener('click', cap, true);
}

function bubble(){
    alert('Bubbling ' + this.tagName);
}

let captureElements = document.getElementsByClassName('capture');

for(el of captureElements){
    el.addEventListener('click', cap, true);
}

function cap(){
    alert("Capturing: " + this.tagName);
}

function viewTarget(event){
    console.log(event.target);
}

function stopProp(event){
    alert('Bubbling ' + event.target);
    event.stopImmediatePropagation();
}

document.getElementById('mouse').addEventListener('mouseenter', printEnter);
document.getElementById('mouse').addEventListener('mouseleave', printExit);
document.getElementById('mouse').addEventListener('mouseover', printCoords);

function printEnter(event){
    console.log(`Mouse entered at ${event.screenX}, ${event.screenY}`);
}

function printExit(event){
    console.log(`Mouse exited at ${event.clientX}, ${event.clientY}`);
}

function printCoords(event){
    console.log(`Mouse is mosing at ${event.offsetX}, ${event.offsetY}`);
}

document.getElementById('keyboard').addEventListener('keydown', printKey);

function printKey(event){
    console.log(`The key: ${event.key} was pressed`);
    if(event.repeat){
        console.log(`The key: ${event.which} is being held down`);
    }
}