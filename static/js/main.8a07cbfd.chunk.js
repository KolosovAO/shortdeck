(this.webpackJsonpshortdeck=this.webpackJsonpshortdeck||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var r,c=n(0),a=n.n(c),i=n(8),u=n.n(i),o=(n(14),n(1)),l=n(2),s=function(e){var t=e.card,n=e.onClick,r=e.disabled,c="card card__suite-"+t[1];return r&&(c+=" card__disabled"),a.a.createElement("div",{className:c,onClick:r?void 0:n},t)},f=["c","s","h","d"].reduce((function(e,t){return"6789TJQKA".split("").reverse().forEach((function(n){e.push(n+t)})),e}),[]),d=function(e){var t=e.selectCard,n=e.selected;return a.a.createElement("div",{className:"card-list"},f.map((function(e,r){return a.a.createElement(s,{key:r,card:e,onClick:function(){return t(e)},disabled:n.includes(e)})})))},m=function(e){var t=e.onClick;return a.a.createElement("div",{className:"card card__empty",onClick:t},"#")},v=function(e){var t=e.cards,n=e.selectCard,r=e.className;return a.a.createElement("div",{className:r},t.map((function(e,t){return e?a.a.createElement(s,{key:t,card:e,onClick:function(){return n(t)}}):a.a.createElement(m,{key:t,onClick:function(){return n(t)}})})))},b=function(e){var t=e.hand,n=e.select,r=e.selected,c=2===t.length?"hand__pair":"s"===t[2]?"hand__suited":"hand__offsuite";return a.a.createElement("div",{onClick:function(){return n(t)},className:"hand ".concat(c).concat(r?" hand__selected":"")},t)},O=["A","K","Q","J","T","9","8","7","6"],h=O.map((function(e,t){return O.map((function(n,r){return e===n?e+n:r>t?e+n+"s":n+e+"o"}))})),p=function(e){var t=e.selectHands,n=e.currentHands,r=Object(c.useState)(n),i=Object(l.a)(r,2),u=i[0],o=i[1],s=function(e){u.includes(e)?o(u.filter((function(t){return t!==e}))):o(u.concat(e))};return a.a.createElement("div",{className:"spectre"},h.map((function(e,t){return a.a.createElement("div",{key:t,className:"spectre__row"},e.map((function(e,t){return a.a.createElement(b,{key:t,selected:u.includes(e),select:s,hand:e})})))})),a.a.createElement("button",{onClick:function(){return t(u)}},"SELECT"))},k=(n(15),n(6)),_=n.n(k),E=n(5),j="6789TJQKA".split("").reduce((function(e,t){return["c","s","h","d"].forEach((function(n){e.push(t+n)})),e}),[]);!function(e){e[e.ROYAL_FLUSH=0]="ROYAL_FLUSH",e[e.STRAIGHT_FLUSH=1]="STRAIGHT_FLUSH",e[e.FOUR_OF_A_KIND=2]="FOUR_OF_A_KIND",e[e.FLUSH=3]="FLUSH",e[e.FULL_HOUSE=4]="FULL_HOUSE",e[e.STRAIGHT=5]="STRAIGHT",e[e.THREE_OF_A_KIND=6]="THREE_OF_A_KIND",e[e.TWO_PAIRS=7]="TWO_PAIRS",e[e.ONE_PAIR=8]="ONE_PAIR",e[e.HIGH_HAND=9]="HIGH_HAND"}(r||(r={}));var S=function(e){14===e[0]&&(e=[].concat(Object(o.a)(e),[5]));var t,n=0,r=1,c=Object(E.a)(e);try{for(c.s();!(t=c.n()).done;){var a=t.value;if(n-1===a){if(5===++r)return a+4}else n!==a&&(r=1);n=a}}catch(i){c.e(i)}finally{c.f()}},H={A:14,K:13,Q:12,J:11,T:10,9:9,8:8,7:7,6:6},g=function(e,t){return e.filter((function(e){return!t.includes(e)}))},A=function(e){return{value:H[e[0]],suit:e[1]}},N=function(e,t){var n,c=[].concat(Object(o.a)(t.map(A)),Object(o.a)(e.map(A))).sort((function(e,t){return t.value-e.value})),a=c.map((function(e){return e.value})),i={s:[],c:[],d:[],h:[]},u={},l=Object(E.a)(c);try{for(l.s();!(n=l.n()).done;){var s=n.value,f=s.suit,d=s.value;i[f].push(d),u[d]=(u[d]||0)+1}}catch(R){l.e(R)}finally{l.f()}for(var m=void 0,v=0,b=Object.values(i);v<b.length;v++){var O=b[v];if(O.length>4){m=O;break}}if(m){var h=S(m);if(h)return 14===h?{combination:r.ROYAL_FLUSH,kicker:[]}:{combination:r.STRAIGHT_FLUSH,kicker:[h]}}var p=[],k=[];for(var _ in u){var j=Number(_),H=u[j];if(4===H)return{combination:r.FOUR_OF_A_KIND,kicker:[j,g(a,[j])[0]]};3===H&&p.push(j),2===H&&k.push(j)}if(m)return{combination:r.FLUSH,kicker:m.slice(-5)};if(2===p.length)return{combination:r.FULL_HOUSE,kicker:[p[1],p[0]]};if(p.length&&k.length)return{combination:r.FULL_HOUSE,kicker:[p[0],k[k.length-1]]};var N=S(a);if(N)return{combination:r.STRAIGHT,kicker:[N]};if(p.length)return{combination:r.THREE_OF_A_KIND,kicker:[p[0]].concat(Object(o.a)(g(a,p).slice(0,2)))};if(k.length>1){var T=k.slice(-2);return{combination:r.TWO_PAIRS,kicker:[T[1],T[0],g(a,T)[0]]}}return 1===k.length?{combination:r.ONE_PAIR,kicker:[k[0]].concat(Object(o.a)(g(a,k).slice(0,4)))}:{combination:r.HIGH_HAND,kicker:a.slice(0,5)}},T=["c","s","d","h"],R=T.reduce((function(e,t){return T.forEach((function(n){t!==n&&e.push([t,n])})),e}),[]),F=T.reduce((function(e,t,n){return T.forEach((function(r,c){n<c&&e.push([t,r])})),e}),[]),C=function(e,t,n){var r=0,c=0,a=0;return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(5===t.length)return[t];for(var n=j.filter((function(n){return!t.includes(n)&&!e.includes(n)})),r=[t],c=[],a=function(){var e=n.pop();r.forEach((function(t){4===t.length?c.push(t.concat(e)):t.length+n.length>3&&r.push(t.concat(e))}))};n.length;)a();return c}([].concat(Object(o.a)(e),Object(o.a)(t)),n).forEach((function(n){var i=function(e,t,n){var r=N(e,n),c=N(t,n);if(r.combination===c.combination){for(var a=0;a<r.kicker.length;a++){if(r.kicker[a]>c.kicker[a])return 1;if(r.kicker[a]<c.kicker[a])return 2}return 0}return r.combination<c.combination?1:2}(e,t,n);0===i?c++:1===i?r++:a++})),{win:r,tie:c,lose:a,total:r+c+a}},I=function(e,t,n){var r,c=0,a=0,i=0,u=(r=t,r.reduce((function(e,t){var n=t.split(""),r=Object(l.a)(n,3),c=r[0],a=r[1],i=r[2];return 2===t.length?e.push.apply(e,Object(o.a)(F.map((function(e){var t=Object(l.a)(e,2),n=t[0],r=t[1];return[c+n,a+r]})))):"s"===i?e.push.apply(e,Object(o.a)(T.map((function(e){return[c+e,a+e]})))):e.push.apply(e,Object(o.a)(R.map((function(e){var t=Object(l.a)(e,2),n=t[0],r=t[1];return[c+n,a+r]})))),e}),[])).filter((function(t){return!e.includes(t[0])&&!e.includes(t[1])&&!n.includes(t[0])&&!n.includes(t[1])}));return _.a.mark((function t(){var r,o,l,s,f,d,m,v;return _.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=Object(E.a)(u),t.prev=1,r.s();case 3:if((o=r.n()).done){t.next=14;break}return l=o.value,s=C(e,l,n),f=s.win,d=s.lose,m=s.tie,v=(c+=f)+(i+=m)+(a+=d),t.next=12,{win:c,tie:i,lose:a,total:v};case 12:t.next=3;break;case 14:t.next=19;break;case 16:t.prev=16,t.t0=t.catch(1),r.e(t.t0);case 19:return t.prev=19,r.f(),t.finish(19);case 22:case"end":return t.stop()}}),t,null,[[1,16,19,22]])}))},L=function(e){return!!e};var U=function(){var e=Object(c.useState)(!1),t=Object(l.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)(!1),u=Object(l.a)(i,2),s=u[0],f=u[1],m=Object(c.useState)(!1),b=Object(l.a)(m,2),O=b[0],h=b[1],k=Object(c.useState)(!1),_=Object(l.a)(k,2),E=_[0],j=_[1],S=Object(c.useState)([]),H=Object(l.a)(S,2),g=H[0],A=H[1],N=Object(c.useState)([void 0,void 0,void 0,void 0,void 0]),T=Object(l.a)(N,2),R=T[0],F=T[1],U=Object(c.useState)([void 0,void 0]),w=Object(l.a)(U,2),y=w[0],D=w[1],x=Object(c.useState)([void 0,void 0]),K=Object(l.a)(x,2),P=K[0],G=K[1],J=Object(c.useState)(""),W=Object(l.a)(J,2),B=W[0],Q=W[1],$=Object(c.useState)(""),Y=Object(l.a)($,2),M=Y[0],q=Y[1],z=Object(c.useRef)(F),V=Object(c.useRef)(R),X=Object(c.useRef)(0),Z=Object(c.useRef)(0),ee=y.filter(L),te=P.filter(L),ne=[].concat(Object(o.a)(y),Object(o.a)(P),Object(o.a)(R)).filter(Boolean);return a.a.createElement("div",{className:"calculator"},"Player1 ",a.a.createElement("span",{className:"win_percent"},B),a.a.createElement(v,{className:"player",cards:y,selectCard:function(e){f(!0);var t=y.map((function(t,n){return n>=e?void 0:t}));D(t),z.current=D,V.current=t,Z.current=2-e,X.current=e}}),"Player2 ",a.a.createElement("button",{onClick:function(){return j(!E)}},"$$$")," ",a.a.createElement("span",{className:"win_percent"},M),E?a.a.createElement("button",{className:"show_spectre",onClick:function(){return h(!0)}},g.join(",")||"SELECT SPECTRE"):a.a.createElement(v,{className:"player",cards:P,selectCard:function(e){f(!0);var t=P.map((function(t,n){return n>=e?void 0:t}));G(t),z.current=G,V.current=t,Z.current=2-e,X.current=e}}),"BOARD",a.a.createElement(v,{className:"board",selectCard:function(e){f(!0);var t=R.map((function(t,n){return n>=e?void 0:t}));F(t),z.current=F,V.current=t,Z.current=e<3?3-e:1,X.current=e},cards:R}),n?a.a.createElement("div",{className:"loader"},"Loading..."):a.a.createElement("button",{onClick:function(){if(E&&g.length&&2===ee.length){var e=I(ee,g,R.filter(L))();r(!0),function t(){return setTimeout((function(){var n=e.next();if(n.done)r(!1);else{var c=n.value,a=c.win,i=c.tie,u=c.lose,o=c.total;Q(String((100*(a/o+i/2/o)).toFixed(2))),q(String((100*(u/o+i/2/o)).toFixed(2))),t()}}),5)}()}else{if(2!==ee.length||2!==te.length)return;r(!0),setTimeout((function(){var e=C(ee,te,R.filter(L)),t=e.win,n=e.tie,c=e.lose,a=e.total;Q(String((100*(t/a+n/2/a)).toFixed(2))),q(String((100*(c/a+n/2/a)).toFixed(2))),r(!1)}))}}},"COMPUTE"),s&&a.a.createElement(d,{selected:ne,selectCard:function(e){V.current=V.current.map((function(t,n){return n===X.current?e:t})),X.current++,z.current(V.current),Z.current--,0===Z.current&&f(!1)}}),s&&a.a.createElement("button",{onClick:function(){return f(!1)}},"HIDE CARDLIST"),O&&a.a.createElement(p,{currentHands:g,selectHands:function(e){A(e),h(!1)}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){e.exports=n(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.8a07cbfd.chunk.js.map