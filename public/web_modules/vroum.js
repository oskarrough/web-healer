/**
 * Bundled by jsDelivr using Rollup v2.74.1 and Terser v5.15.1.
 * Original file: /npm/vroum@0.1.6/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var t=Object.defineProperty,s=(s,i,e)=>(((s,i,e)=>{i in s?t(s,i,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[i]=e})(s,"symbol"!=typeof i?i+"":i,e),e);class i{constructor(){s(this,"events",{})}dispatch(t,...s){if(this.events[t])for(const i of this.events[t])i.call(this,this,...s)}subscribe(t,s){this.events[t]||(this.events[t]=[]),!(this.events[t].indexOf(s)>=0)&&this.events[t].push(s)}unsubscribe(t,s){if(!this.events[t])return;if(!s)return void(this.events[t].length=0);const i=this.events[t].indexOf(s);this.events[t].splice(i,1)}}class e extends i{constructor(t,i){super(),s(this,"props"),s(this,"root"),s(this,"parent"),s(this,"children"),s(this,"isMounted"),this.props=t??{},this.children=i??[],this.isMounted=!1,this.props.ref&&(this.props.ref.ref=this)}static ref(){return{ref:void 0}}is(t){return!t||("string"==typeof t?this.constructor.name===t:this instanceof t)}get(t){for(const s of this.children)if(s.is(t))return s}getAll(t){const s=[];for(const i of this.children)i.is(t)&&s.push(i);return s}find(t){for(const s of this.children){if(s.is(t))return s;const i=s.find(t);if(i)return i}}findAll(t,s=[]){for(const i of this.children)i.is(t)&&s.push(i),i.findAll(t,s);return s}closest(t){var s;return null!=(s=this.parent)&&s.is(t)?this.parent:this.parent?this.parent.closest(t):void 0}add(...t){for(const s of t)s.connect(this)}remove(...t){for(const s of t)s.disconnect(this)}set(t){var s,i;null==(s=this.beforeUpdate)||s.call(this,t),Object.assign(this.props,t),null==(i=this.afterUpdate)||i.call(this,t)}connect(t,s=!t||t.isMounted){var i,e,o,r;this.parent&&this.parent!==t&&n(this),null==(i=this.beforeInit)||i.call(this),null==(e=this.init)||e.call(this),this.parent=t,this.root=(null==t?void 0:t.root)??this,this.parent&&this.parent.children.indexOf(this)<0&&this.parent.children.push(this),this.build&&(this.children=this.build(this.children));for(const t of this.children)t.connect(this,s);s&&(null==(o=this.beforeMount)||o.call(this),this.isMounted=!0,null==(r=this.mount)||r.call(this))}disconnect(t){var s,i,e;if(!t||this.parent===t){this.isMounted&&(null==(s=this.beforeDestroy)||s.call(this)),this.parent&&n(this);for(const t of Array.from(this.children))t.disconnect();this.isMounted&&(null==(i=this.destroy)||i.call(this),this.isMounted=!1,null==(e=this.afterDestroy)||e.call(this))}}}function n(t){if(!t.parent)return;const s=t.parent.children;t.parent=void 0;const i=s.indexOf(t);i>=0&&s.splice(i,1)}var o=Object.defineProperty,r=(t,s,i)=>(((t,s,i)=>{s in t?o(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i})(t,"symbol"!=typeof s?s+"":s,i),i);class h extends e{constructor(){super(...arguments),r(this,"loop"),r(this,"delay"),r(this,"interval"),r(this,"duration"),r(this,"repeat"),r(this,"limit"),r(this,"startTime"),r(this,"cycles"),r(this,"ticks")}beforeInit(){this.tick=this.tick??this.props.tick,this.delay=this.props.delay??this.delay??0,this.interval=this.props.interval??this.interval??0,this.duration=this.props.duration??this.duration??0,this.repeat=this.props.repeat??this.repeat??1/0,this.limit=this.props.limit??this.limit??(this.duration>0?1/0:1)}beforeMount(){this.loop=this instanceof l?this:this.closest(l),this.startTime=this.loop.elapsedTime,this.cycles=0,this.ticks=0}run(t){var s;const i=t.elapsedTime-this.startTime,e=this.duration+this.interval,n=this.delay+this.cycles*e-t.deltaTime,o=n+this.duration,r=o+this.interval,h=i>=n,a=this.duration>0&&i>o,c=i>=r,l=this.ticks>=this.limit;h&&!a&&!l&&(null==(s=this.tick)||s.call(this,t,this),this.ticks+=1),c&&(this.cycles+=1,this.ticks=0),this.cycles>=this.repeat&&this.disconnect()}}class a extends h{constructor(){super(...arguments),r(this,"started",!1),r(this,"paused",!1),r(this,"time"),r(this,"lastTime"),r(this,"deltaTime",0),r(this,"elapsedTime",0),r(this,"lastTick"),r(this,"runTasks",(t=>{if(this.lastTime=this.time??t,this.time=t,this.deltaTime=this.time-this.lastTime,!this.paused){this.elapsedTime+=this.deltaTime;const t=this.findAll(h,[this]);for(const s of t)s.run(this)}this.requestNextTick()}))}beforeMount(){super.beforeMount(),this.started=!0,this.paused=!1,this.requestNextTick()}afterDestroy(){this.started=!1,this.paused=!1,this.cancelLastTick(),this.reset()}start(){this.started||(this.connect(),this.dispatch("start",this))}stop(){this.started&&(this.disconnect(),this.dispatch("stop",this))}play(){this.paused=!1,this.dispatch("play",this)}pause(){this.paused=!0,this.dispatch("pause",this)}timeSince(t){return this.elapsedTime-t}requestNextTick(){this.lastTick=function(t){return c()?window.requestAnimationFrame(t):setTimeout((()=>t(performance.now())),0)}(this.runTasks)}cancelLastTick(){this.lastTick&&function(t){c()?window.cancelAnimationFrame(t):clearTimeout(t)}(this.lastTick)}reset(){this.time=void 0,this.deltaTime=0,this.elapsedTime=0}}function c(){return void 0!==typeof window&&"requestAnimationFrame"in window}const l=a;var u=Object.defineProperty,p=(t,s,i)=>(((t,s,i)=>{s in t?u(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i})(t,"symbol"!=typeof s?s+"":s,i),i);function d(t,s){return{x:t,y:s}}const f=class{constructor(t,s=t){p(this,"x"),p(this,"y"),this.x=t,this.y=s}static of(t,s){return new f(t,s)}static from(t){return new f(t.x,t.y)}static center(t,s){return f.from(t).add(f.from(s).scale(.5))}static origin(t,s){return f.from(t).sub(f.from(s).scale(.5))}static normal(t,s){const i=s.x-t.x,e=s.y-t.y;return f.of(-e,i).unit()}norm(){return Math.sqrt(this.x*this.x+this.y*this.y)}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-t.x*this.y}equals(t){return this.x===t.x&&this.y===t.y}is(t,s=t){return this.x===t&&this.y===s}apply(t,s=t){return this.x=t(this.x),this.y=s(this.y),this}coords(){return{x:this.y,y:this.y}}unit(){return this.scale(1/this.norm())}project(t){const s=this.dot(t),i=t.dot(t);return t.scale(s/i)}copy(t){return this.x=t.x,this.y=t.y,this}set(t,s=t){return this.x=t,this.y=s,this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,s){return this.max(t).min(s)}add(t){return this.x+=t.x,this.y+=t.y,this}sub(t){return this.x-=t.x,this.y-=t.y,this}mul(t){return this.x*=t.x,this.y*=t.y,this}div(t){return this.x/=t.x,this.y/=t.y,this}translate(t,s=t){return this.x+=t,this.y+=s,this}scale(t,s=t){return this.x*=t,this.y*=s,this}rotate(t,s=f.ZERO){const i=this.x-s.x,e=this.y-s.y,n=Math.cos(t),o=Math.sin(t);return this.x=n*i-o*e+s.x,this.y=o*i+n*e+s.y,this}};let m=f;p(m,"ZERO",Object.freeze({x:0,y:0}));var y=Object.defineProperty,v=(t,s,i)=>(((t,s,i)=>{s in t?y(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i})(t,"symbol"!=typeof s?s+"":s,i),i);class b extends e{constructor(){super(...arguments),v(this,"tag"),v(this,"container"),v(this,"element")}beforeInit(){this.props.tag&&(this.tag=this.props.tag),this.container=this.props.container??this.container,this.element=this.createElement()}beforeMount(){var t,s;this.applyProps(),this.container||(this.container=(null==(t=this.closest(b))?void 0:t.element)??document.body),null==(s=this.container)||s.append(this.element)}beforeUpdate(){this.removeEventListeners()}afterUpdate(){this.applyProps()}afterDestroy(){this.removeEventListeners(),this.element.remove()}setAttribute(t,s){let i;"boolean"==typeof t?i=s?"":void 0:null!=s&&(i=String(s)),i?this.element.setAttribute(t,i):this.element.removeAttribute(t)}applyProps(){for(const t in this.props)w(t)?this.element.addEventListener(t.slice(1),this.props[t]):x(t)?this.element[t.slice(1)]=this.props[t]:g(t)&&this.setAttribute(t,this.props[t])}removeEventListeners(){for(const t in this.props)"$"===t[0]&&this.element.removeEventListener(t.slice(1),this.props[t])}}function x(t){return"_"===t[0]}function w(t){return"$"===t[0]}function g(t){return"ref"!==t}class M extends b{createElement(){return document.createElement(this.tag??"div")}}function E(t,s,i){return new M({tag:t,...s},i)}var k=Object.defineProperty,O=(t,s,i)=>(((t,s,i)=>{s in t?k(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i})(t,"symbol"!=typeof s?s+"":s,i),i);class D extends M{constructor(){super(...arguments),O(this,"tag","canvas"),O(this,"ctx"),O(this,"width"),O(this,"height")}beforeInit(){super.beforeInit(),this.ctx=this.element.getContext("2d"),this.width=this.props.width??window.innerWidth,this.height=this.props.height??window.innerHeight}clearCanvas(){this.ctx.clearRect(0,0,this.width,this.height)}}class L extends h{constructor(){super(...arguments),O(this,"position"),O(this,"fill"),O(this,"stroke"),O(this,"canvas")}beforeInit(){super.beforeInit(),this.position=this.props.position??this.position??m.of(0),this.fill=this.props.fill??this.fill,this.stroke=this.props.stroke??this.stroke}beforeMount(){if(super.beforeMount(),this.canvas=this.closest(D),!this.canvas)throw new Error("Parent canvas not found")}tick(){var t;const s=this.canvas.ctx;this.fill&&(s.fillStyle=this.fill),this.stroke&&(s.strokeStyle=this.stroke),null==(t=this.paint)||t.call(this,this.canvas.ctx)}}class A extends h{constructor(){super(...arguments),O(this,"position"),O(this,"dimensions"),O(this,"static"),O(this,"colliding"),O(this,"adjustments")}beforeInit(){super.beforeInit(),this.position=this.props.position??this.position??m.of(0),this.dimensions=this.props.dimensions??this.dimensions??m.of(0),this.static=this.props.static??this.static??!1,this.colliding=!1,this.adjustments=[]}tick(){if(this.colliding=!1,this.static)return;const t=this.root.findAll(A),s=this.checkCollisions(t);for(const t of s)this.position.add(t)}checkCollisions(t){this.adjustments.length=0;for(const s of t){if(this===s||!this.hasOverlap(s))continue;this.colliding=!0,s.colliding=!0,this.dispatchCollision(s);const t=this.getOverlapAdjustment(s);this.adjustments.push(t)}return this.adjustments}dispatchCollision(t){this.dispatch("collision",t)}subscribeCollision(t){this.subscribe("collision",t)}unsubscribeCollision(t){this.unsubscribe("collision",t)}hasOverlap(t){const s=m.from(this.dimensions).scale(.5),i=m.from(this.position).sub(s),e=m.from(this.position).add(s),n=m.from(t.dimensions).scale(.5),o=m.from(t.position).sub(n),r=m.from(t.position).add(n);return i.x<r.x&&e.x>o.x&&i.y<r.y&&e.y>o.y}getOverlapAdjustment(t){const s=m.of(0),i=m.from(this.position).sub(t.position),e=m.from(i).apply(Math.abs),n=m.from(this.dimensions).add(t.dimensions).scale(.5),o=m.from(n).sub(e);return o.x<o.y?s.x=Math.sign(i.x)*o.x:s.y=Math.sign(i.y)*o.y,s}}class T extends b{createElement(){return document.createElementNS("http://www.w3.org/2000/svg",this.tag??"svg")}}function I(t,s,i){return new T({tag:t,...s},i)}var U=Object.defineProperty,P=(t,s,i)=>(((t,s,i)=>{s in t?U(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i})(t,"symbol"!=typeof s?s+"":s,i),i);class j extends e{constructor(){super(...arguments),P(this,"element"),P(this,"parentInput"),P(this,"action"),P(this,"actions",{}),P(this,"buttons",{}),P(this,"clearInput",(()=>{this.action=void 0,this.buttons={}}))}beforeMount(){var t,s;this.parentInput=this.closest(j),this.element=(null==(t=this.parentInput)?void 0:t.element)??(null==(s=this.closest(M))?void 0:s.element),this.element.addEventListener("blur",this.clearInput)}afterDestroy(){this.element.removeEventListener("blur",this.clearInput)}press(t){this.buttons[t]=!0}release(t){delete this.buttons[t]}dispatchInput(t,s){var i;this.dispatch("input",t,s),null==(i=this.parentInput)||i.dispatchInput(t,s)}subscribeInput(t){this.subscribe("input",t)}unsubscribeInput(t){this.unsubscribe("input",t)}dispatchAction(t,s){this.action=t,this.dispatchInput(t,s),this.action=void 0}isAction(t,s){if(t in this.actions)return this.actions[t](this,s);if(this.action===t&&this.hasButtons(s))return!0;for(const i of this.getAll(j))if(i.isAction(t,s))return!0;return!1}isActive(){for(const t in this.buttons)if(this.buttons[t])return!0;return!1}hasButtons(t){return!t||t.every((t=>this.buttons[t]))}}const H=class extends j{constructor(){super(...arguments),P(this,"onKeyDown",(t=>{t.repeat||(this.press(t.key),this.dispatchAction(H.DOWN,t.key)),this.action=H.HOLD})),P(this,"onKeyUp",(t=>{this.dispatchAction(H.UP,t.key),this.release(t.key),this.isActive()&&(this.action=H.HOLD)}))}beforeMount(){super.beforeMount(),this.element.tabIndex=0,this.element.focus(),this.element.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}afterDestroy(){super.afterDestroy(),this.element.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp)}};let C=H;P(C,"DOWN","KEYBOARD_DOWN"),P(C,"HOLD","KEYBOARD_HOLD"),P(C,"UP","KEYBOARD_UP");const W=class extends j{constructor(){super(...arguments),P(this,"position",m.of(0)),P(this,"travel",m.of(0)),P(this,"wheel",m.of(0)),P(this,"onMouseDown",(t=>{const s=B(t);this.press(s),this.dispatchAction(W.DOWN,s),this.action=W.HOLD})),P(this,"onMouseMove",(t=>{const s=this.element.getBoundingClientRect(),i=m.from(this.position);this.position.set(t.pageX-s.x,t.pageY-s.y),this.travel.copy(this.position).sub(i)})),P(this,"onMouseUp",(t=>{const s=B(t);this.dispatchAction(W.UP,s),this.release(s),this.isActive()&&(this.action=W.HOLD)})),P(this,"onWheel",(t=>{this.wheel.set(t.deltaX,t.deltaY),this.dispatchAction(W.WHEEL),this.wheel.set(0),this.isActive()&&(this.action=W.HOLD)})),P(this,"onContextMenu",(t=>{t.preventDefault(),t.stopPropagation()}))}beforeMount(){super.beforeMount(),this.element.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("wheel",this.onWheel),this.element.addEventListener("contextmenu",this.onContextMenu)}afterDestroy(){super.afterDestroy(),this.element.removeEventListener("mousedown",this.onMouseDown),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("wheel",this.onWheel),this.element.removeEventListener("contextmenu",this.onContextMenu)}isActive(){for(const t in this.buttons)if(this.buttons[t])return!0;return!1}};let R=W;function B(t){switch(t.button){case 0:return R.LEFT;case 1:return R.MIDDLE;case 2:return R.RIGHT;case 3:return R.BACK;case 4:return R.FORWARD;default:return"unknown"}}P(R,"DOWN","MOUSE_DOWN"),P(R,"HOLD","MOUSE_HOLD"),P(R,"UP","MOUSE_UP"),P(R,"WHEEL","MOUSE_WHEEL"),P(R,"LEFT","MouseLeft"),P(R,"MIDDLE","MouseMiddle"),P(R,"RIGHT","MouseRight"),P(R,"BACK","MouseBack"),P(R,"FORWARD","MouseForward");var K=Object.defineProperty,F=(t,s,i)=>(((t,s,i)=>{s in t?K(t,s,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[s]=i})(t,"symbol"!=typeof s?s+"":s,i),i);class N{constructor(t="Benchmark"){F(this,"t0"),F(this,"title"),F(this,"steps"),this.t0=performance.now(),this.title=t,this.steps=[]}step(t,s){const i=performance.now();this.steps.push([i,t,s])}done(){console.log(`=== ${this.title} ===`);for(let t=0;t<this.steps.length;t++){const[s]=0===t?this.steps[0]:this.steps[t-1],[i,e,n]=this.steps[t],o=i-s,r=`[${o.toFixed(3)}ms]`;let h="";n&&(h=`(${(n/o).toFixed(0)}ops/ms)`),console.log(`${r} ${e} ${h}`.trim())}const t=(performance.now()-this.t0).toFixed(3);console.log(`=== Done in ${t} ===`),console.log("\n"),this.steps.length=0}}export{A as BBox,D as Canvas,b as Dom,i as Emitter,M as Html,j as Input,C as Keyboard,a as Loop,R as Mouse,e as Node,N as Perf,L as Shape,T as Svg,h as Task,m as Vec2,E as html,d as point,I as svg};export default null;
//# sourceMappingURL=/sm/f961d322fd4e8e7e7f7e89e61afa07c05e03b16f1df060e8ec71c81f7a83191d.map