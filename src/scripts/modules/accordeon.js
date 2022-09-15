import {gsap} from 'gsap';

import {ScrollTrigger} from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const accordeon = document.querySelector('.accordeon');
console.log('accordeon');
if(accordeon) {
  const headers = accordeon.querySelectorAll('.accordeon__header');
  const fields = accordeon.querySelectorAll('.accordeon__field');

  function recalculatePos(fields) {
    fields.forEach((field,i) => {
      if(field.classList.contains('transitioned') && OFFSET_WIDTH !== null) {
        field.style.left = 'calc(100% - ' + OFFSET_WIDTH * (fields.length - i) + 'px)';
      } else {
        field.style.left = OFFSET_WIDTH * i + 'px';
      }
    })
  }

  function calculatePos(fields, target) {
    if( OFFSET_WIDTH !== null ) {
      fields.forEach((field,i) => {
        if(target === field && !field.classList.contains('transitioned')) {

          if(!target.classList.contains('active')) {
            fields.forEach(field => {
              field.classList.contains('active') ?
              field.classList.remove('active') : null;
            })

            target.classList.add('active');
          }

          fields.forEach((field,j) => {
            //показ
            if(j > i) {
              if(!field.classList.contains('transitioned')) {
                gsap.to(field, {
                  duration: 0.5,
                  delay: 0.2,
                  left: 'calc(100% - ' + OFFSET_WIDTH * (fields.length - j) + 'px)',
                  ease: 'ease-in'
                })

                !field.classList.contains('transitioned') ?
                field.classList.add('transitioned') : null;
              }
            }
          })

        } else if(fields[i] === target && field.classList.contains('transitioned')) {
          if(!target.classList.contains('active')) {
            fields.forEach(field => {
              field.classList.contains('active') ?
              field.classList.remove('active') : null;
            })

            target.classList.add('active');
          }

          // скрытие
          fields.forEach((field,j) => {
            if(j < i + 1 ) {
              if(field.classList.contains('transitioned')) {
                gsap.to(field, {
                  duration: 0.5,
                  delay: 0.2,
                  left: OFFSET_WIDTH * j + 'px',
                  ease: 'ease-in'
                })

                field.classList.contains('transitioned') ?
                field.classList.remove('transitioned') : null;
              }
            }
          });
        }
      });
    } else {
      fields.forEach(field => {
        field.classList.remove('transitioned');
      })

      fields.forEach((field,i) => {
        if(field.classList.contains('active') && field !== target) {
          field.classList.remove('active');
        } else if(!field.classList.contains('active') && field === target) {
          target.classList.add('active');

          for (let index = i + 1; index < fields.length; index++) {
            fields[index].classList.add('transitioned');
          }
        }
      })
    }
  }

  let OFFSET_WIDTH = null;

  if(window.innerWidth > 960 && window.innerWidth < 1441) {
    OFFSET_WIDTH = 70;
  } else if(window.innerWidth > 1440) {
    OFFSET_WIDTH = 100;
  }

  const onWindowResizeHandler = () => {
    if(window.innerWidth < 961) {
      OFFSET_WIDTH = null;
      recalculatePos(fields);
    }
    else if( window.innerWidth > 960 && window.innerWidth < 1441) {
      OFFSET_WIDTH = 70;
      recalculatePos(fields);
    } else if(window.innerWidth > 1440) {
      OFFSET_WIDTH = 100;
      recalculatePos(fields);
    }
  }

  window.addEventListener('resize', onWindowResizeHandler);

  function setaccordeonAnimationDirection(field,i) {
    let body = field.querySelector('.accordeon__body');

    const trigger = {
      trigger: accordeon,
      start: 'top bottom'
    };

    if(OFFSET_WIDTH !== null) {
      gsap.from(field, {
        scrollTrigger: trigger,
        duration: 1,
        delay: 0.15 * (i+1),
        y: '100vh',
        ease: 'back'
      })
    } else {
      gsap.from(field, {
        scrollTrigger: trigger,
        duration: 1,
        delay: 0.15 * (i+1),
        x: '100vw',
        ease: 'back'
      })
    }

    gsap.from(body, {
      scrollTrigger: trigger,
      duration: 1,
      delay: 1.85,
      opacity: 0,
      ease: 'ease-in'
    });
  };

  fields.forEach((field,i) => {
    field.style.left = OFFSET_WIDTH * i + 'px';
    // анимация аккордеона
    //setaccordeonAnimationDirection(field, i);
  })

  const onClickOpenaccordeonField = (evt) => {
    const target = evt.currentTarget.parentNode;

    if(!target.classList.contains('active')) {
      calculatePos(fields, target);

      const body = target.querySelector('.accordeon__body');
      gsap.from(body, {
        duration: 0.7,
        opacity: 0,
        ease: 'linear'
      });
    }
  }

  if(headers) {
    headers.forEach(header => {
      header.addEventListener('click', onClickOpenaccordeonField);
    });
  }
}
