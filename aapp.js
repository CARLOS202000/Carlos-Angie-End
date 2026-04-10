let listBg = document.querySelectorAll('.bg');
let banner = document.querySelector('.banner');
let tabs = document.querySelectorAll('.tab');
let container = document.querySelector('.container');
let heightDefault = container.offsetHeight;
let topBefore = 0;

window.addEventListener('wheel', function(event){
    event.preventDefault();
    const scrollSpeed = 0.2;
    const scrollValue = window.scrollY + (event.deltaY/3) * scrollSpeed;
    window.scrollTo(0, scrollValue);

    let top = scrollValue;
    listBg.forEach((bg, index) => {
        if(index != 0){
            bg.style.transform = `translateY(${-top*index}px)`;
        }

        if(index == listBg.length - 1){
            tabs.forEach(tab => {
                tab.style.transform = `translateY(${-top*index}px)`;
            });

            if(topBefore < top){
                let setHeight = heightDefault - window.scrollY*index + 100;
                container.style.height = `${setHeight}px`;
                topBefore = window.scrollY;
            }
        }

        tabs.forEach((tab, tabIndex) => {
            let content = tab.querySelector('.content');
            let tabOffsetTop = tab.offsetTop - top;
            let transformContent = window.innerHeight*(tabIndex+1) - tabOffsetTop;

            if(tabOffsetTop <= window.innerHeight*(tabIndex+1)){
                content.style.transform = `translateY(${-transformContent + (100*tabIndex)}px)`;
            }
        });
    });
}, { passive: false });
