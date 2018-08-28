import anime from 'animejs';

let currentAnimation;

export const verticalAnimateIn = OptsGroupContainer => { 

    if (currentAnimation) currentAnimation.pause();

    const opts = [...OptsGroupContainer.querySelectorAll('button')];

    opts.forEach(o => o.style.opacity = 0);

    currentAnimation = anime({
        targets: opts,
        duration: 500,
        delay: function(t, i, c) {
            return i*80;
        },
        easing: [0.1,1,0.3,1],
        rotate: function(t, i,c) { 
            return [0,-10*(c-i-1) - 15 + 'deg']; 
        },
        opacity: {
            value: 1,
            duration: 10,
            delay: function(t, i, c) {
                return i*80 + 10;
            },
            easing: 'linear'
        }
    });
}

export const verticalAnimateOut = OptsGroupContainer => { 

    if (currentAnimation) currentAnimation.pause();

    const opts = [...OptsGroupContainer.querySelectorAll('button')];

    opts.forEach(o => o.style.opacity = 0);

    currentAnimation = anime({
        targets: opts,
        duration: 500,
        easing: [0.1,1,0.3,1],
        rotate: 0,
        opacity: {
            value: 0,
            duration: 20,
            delay: 80,
            easing: 'linear'
        }
    });
}


