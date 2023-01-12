let parent = document.getElementById('buttonTop').parentElement;
//let child = document.getElementById('buttonTop a').childElement;

while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;
    if (hasOverflow !== 'visible') {
        console.log(hasOverflow, parent);
    }
    else {
       // console.log(hasOverflow, child);
    }
}
