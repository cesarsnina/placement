// outers = new Array();
//   active: any;
//   queue: any;

//   h: any;
//   init: any;
//   u: any;

//   activate(thing: HTMLElement): void {
//     if (this.active === thing) return;
//     this.queue = this.queue.then(() => {
//       return new Promise((r) => {
//         this.moveTo(thing);
//         this.minimize()
//           .then(() => this.expand(thing))
//           .then(r);
//         this.active = thing;
//         thing.classList.add('active');
//       });
//     });
//   }

//   minimize() {
//     if (!this.active) return Promise.resolve();
//     this.active.classList.remove('active');
//     return new Promise((r) => {
//       this.active.addEventListener('transitionend', r, { once: true });
//       this.active.style.width = this.init;
//       this.h.style.width = this.init;
//     });
//   }

//   moveTo(target: any) {
//     this.h.style.transform = `translateX(${this.u * target.dataset.idx}px)`;
//   }

//   expand(target: any) {
//     return new Promise((r) => {
//       target.addEventListener('transitionend', r, { once: true });
//       const width =
//         target.getElementsByClassName('inner')[0].getBoundingClientRect()
//           .width + 'px';
//       target.style.width = width;
//       this.h.style.width = width;
//     });
//   }


//   this.h = document.getElementsByClassName('highlight')[0];
//   this.init = this.outers[0].getAttribute("width");
//   this.queue = Promise.resolve();

//   this.u =
//     this.outers[1].getBoundingClientRect().x -
//     this.outers[0].getBoundingClientRect().x;
//   setTimeout(() => this.activate(this.outers[0]), 500);
//   this.outers.forEach((o, i) => {
//     o.dataset.idx = i;
//     o.addEventListener('click', () => this.activate(o));
//   });
// }

// ngAfterViewInit(): void {
//   this.outers = Array.from(document.getElementsByClassName('outer'));
// }