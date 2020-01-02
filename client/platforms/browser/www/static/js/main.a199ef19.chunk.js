(this["webpackJsonpkings-cup-client"]=this["webpackJsonpkings-cup-client"]||[]).push([[0],{46:function(e,t,n){e.exports=n(88)},5:function(e,t,n){var a=function(){},r=(0,n(56).createActions)({SET_USERNAME:function(e){return{name:e}},DISCONNECT:a,START_GAME:a,DRAW_CARD:function(e){return{index:e}},SET_CARD_DETAIL:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"ALL";return{value:e,detail:t,suit:n}},SAVE_AVATAR:function(e){return{image:e}},REMAKE_GAME:a,KICK_PLAYER:function(e){return{sessionId:e}}});e.exports=r},51:function(e,t,n){},56:function(e,t,n){var a=n(57);function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}e.exports={createActions:function(e){return Object.keys(e).map((function(t){return{type:t,fn:e[t]}})).reduce((function(e,t){var n=function(){return{type:t.type,payload:t.fn.apply(t,arguments)}};return n.toString=function(){return t.type},function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e,a({},t.type.toLowerCase().replace(/(_[a-z])/g,(function(e,t){return t[1].toUpperCase()})),n))}),{})}}},67:function(e,t){},81:function(e,t,n){},82:function(e,t,n){},83:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(12),o=n.n(c),l=(n(51),n(3)),i=n(20),s=n(10),u=n(6),m=function(e){return e.preventDefault()},d=function(){r.a.useEffect((function(){return document.addEventListener("touchmove",m,{passive:!1}),document.documentElement.classList.add("scroll-lock"),function(){document.removeEventListener("touchmove",m),document.documentElement.classList.remove("scroll-lock")}}))},v=[],f={x:null,y:null},p=function(e){return{touch:{clientX:e.clientX,clientY:e.clientY},t:+new Date}},g=function(){return d(),r.a.createElement("div",{className:"column-layout",style:{paddingTop:"100px"}},r.a.createElement("img",{src:"/images/logo.png",alt:"Kings Cup!",width:"80%"}),r.a.createElement(l.b,{to:"/game",className:"CTA"},"Play!"))},h=function(){return r.a.createElement("div",null,"Find Screen (TODO)")},b=n(5),E=n(14),y=n(11),C=n.n(y),w=n(21),x=n(39),O=n(40),k=n(44),S=n(41),j=n(13),N=n(45),A=n(42),I=n(19),_=r.a.createContext(),D=function(e){function t(e){var n;return Object(x.a)(this,t),(n=Object(k.a)(this,Object(S.a)(t).call(this,e))).client=new A.Client(e.url),n.state=Object(w.a)({isJoined:!1,room:null,messages:[]},e.initialState),n.onVisibilityChange=n.onVisibilityChange.bind(Object(j.a)(n)),n}return Object(N.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){return C.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:this.onConnect(),document.addEventListener("visibilitychange",this.onVisibilityChange);case 2:case"end":return e.stop()}}),null,this)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("visibilitychange",this.onVisibilityChange);var e=this.state.room;e&&(e.removeAllListeners(),e.leave()),window.localStorage.removeItem(this.getLsKey())}},{key:"getLsKey",value:function(){return"@@Colyseus_GC_".concat(this.props.roomId)}},{key:"onVisibilityChange",value:function(){return C.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:if(document.hidden){e.next=3;break}return e.next=3,C.a.awrap(this.onConnect());case 3:case"end":return e.stop()}}),null,this)}},{key:"onConnect",value:function(){var e,t,n,a,r=this;return C.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:if(c.prev=0,e=this.props.roomId,t=this.getLsKey(),!(n=JSON.parse(window.localStorage.getItem(t)||"{}")).id||!n.sessionId){c.next=24;break}return c.prev=5,c.next=8,C.a.awrap(this.client.reconnect(n.id,n.sessionId));case 8:a=c.sent,c.next=22;break;case 11:if(c.prev=11,c.t0=c.catch(5),window.localStorage.removeItem(t),"/"!==window.location.pathname){c.next=20;break}return c.next=17,C.a.awrap(this.client.joinOrCreate(e));case 17:a=c.sent,c.next=22;break;case 20:return this.props.history.push("/"),c.abrupt("return");case 22:c.next=27;break;case 24:return c.next=26,C.a.awrap(this.client.joinOrCreate(e));case 26:a=c.sent;case 27:this.setState({isJoined:!0,room:a}),a.onStateChange(this.setState.bind(this)),a.onMessage((function(e){"FORCE_DC"===e&&(a.leave(),r.props.history.push("/")),r.setState((function(t){return{messages:[].concat(Object(E.a)(t.messages),[e])}}))})),window.localStorage.setItem(t,JSON.stringify(Object(I.pick)(a,"id","sessionId","name"))),this.state._processing&&(this.state._processing.forEach(a.send.bind(a)),delete this.state._processing),c.next=38;break;case 34:c.prev=34,c.t1=c.catch(0),console.log("could not join room",c.t1),this.props.history.push("/");case 38:case"end":return c.stop()}}),null,this,[[0,34],[5,11]])}},{key:"render",value:function(){return r.a.createElement(_.Provider,{value:this.state},this.props.children)}}]),t}(r.a.Component),L=function(e){var t,n=e.room;return null!==(t=null===n||void 0===n?void 0:n.state.players[null===n||void 0===n?void 0:n.sessionId])&&void 0!==t?t:{}},P=function(){var e,t,n=r.a.useContext(_),a=null!==(e=null===n||void 0===n?void 0:null===(t=n.room)||void 0===t?void 0:t.serializer)&&void 0!==e?e:{};return a.getSelf=L.bind(null,n),a},K=function(){var e,t=r.a.useContext(_);return(null===t||void 0===t?void 0:null===(e=t.room)||void 0===e?void 0:e.send)?function(e){t.room.send(e)}:function(e){t._processing=[].concat(Object(E.a)(t._processing||[]),[e])}},T=function(){var e,t=r.a.useContext(_);return null!==(e=null===t||void 0===t?void 0:t.room)&&void 0!==e?e:{}},M=Object(s.j)(D),R=function(e){var t=e.suit,n=e.value;return"/images/cards/".concat(n,"_").concat(t.toUpperCase(),".svg")},F=Object(s.j)((function(e){var t,n,a,c=e.history,o=Object(s.i)().path,i=P(),m=i.state,d=void 0===m?{}:m,v=i.getSelf,f=K(),p=r.a.useState(localStorage.getItem("@KC_Name")||""),g=Object(u.a)(p,2),h=g[0],E=g[1],y=v(),C=y.name,w=y.id;r.a.useEffect((function(){E(C||"")}),[C]),r.a.useEffect((function(){d.hasStarted&&c.push("/game/play")}),[d.hasStarted]),r.a.useEffect((function(){localStorage.getItem("@KC_Name")&&f(Object(b.setUsername)(localStorage.getItem("@KC_Name"))),localStorage.getItem("@KC_Avatar")&&f(Object(b.saveAvatar)(localStorage.getItem("@KC_Avatar")))}),[]);var x=function(e){e.preventDefault(),f(Object(b.setUsername)(h)),document.activeElement.blur(),localStorage.setItem("@KC_Name",h)};return r.a.createElement("div",{style:{paddingBottom:"130px"}},v().isHost&&r.a.createElement("button",{onClick:function(){f(Object(b.startGame)())},type:"button",className:"CTA"},"Start"),r.a.createElement("h2",{className:"row"},"Players:"),r.a.createElement("ul",{className:"notList"},Object.keys(null!==(t=null===d||void 0===d?void 0:d.players)&&void 0!==t?t:{}).map((function(e){var t=d.players[e];return r.a.createElement("li",{key:e,className:"PlayerRow".concat(e===w?" selected":"")},r.a.createElement("img",{src:t.avatar,className:"AvatarContainer",alt:""}),r.a.createElement("div",{className:"name"},t.name||e,t.isHost?"*":""),v().isHost&&!t.isHost&&r.a.createElement("button",{type:"button",onClick:function(){return function(e){f(Object(b.kickPlayer)(e))}(e)},className:"kick-button"},"Kick"))}))),r.a.createElement("div",{className:"Flex Flex--edges row"},r.a.createElement("h2",null,"Rules:"),v().isHost&&r.a.createElement(l.b,{to:"".concat(o,"/edit"),className:"h2"},r.a.createElement("h2",null,"Edit"))),Object.keys(null!==(n=null===d||void 0===d?void 0:d.rules)&&void 0!==n?n:{}).map((function(e){var t=d.rules[e];return r.a.createElement("li",{key:e,className:"PlayerRow"},r.a.createElement("img",{src:R(t.card),className:"AvatarContainer AvatarContainer--card",alt:""}),r.a.createElement("div",{className:"name"},t.rule))})),r.a.createElement("div",{className:"Fixed Fixed--bottom Fixed--stylish"},r.a.createElement(l.b,{to:"".concat(o,"/draw"),style:{position:"relative",alignSelf:"flex-end",padding:"10px 0 10px 10px"}},r.a.createElement("img",{src:(null===(a=v())||void 0===a?void 0:a.avatar)||"",className:"AvatarContainer",alt:""}),r.a.createElement("span",{style:{position:"absolute",top:"32%",left:"21px",color:"black",fontWeight:"bold",textShadow:"0px 0px 3px white"}},"Set")),r.a.createElement("form",{onSubmit:x,action:"#",style:{padding:"10px"}},r.a.createElement("input",{style:{textAlign:"left"},placeholder:"Your name",type:"text",value:h,onChange:function(e){return E(e.currentTarget.value)},onBlur:x}))))})),V=["2","3","4","5","6","7","8","9","10","J","Q","K","A"],W=["Heart","Diamond","Spade","Club"],B=function(e){var t=e.initialValue,n=e.value;switch(!0){case t===n&&""!==n:return"green";case t!==n:return"red";case""===n:return"orange";default:return""}},U=function(e){var t=e.face,n=e.initialValue,a=void 0===n?"":n,c=r.a.useState(a),o=Object(u.a)(c,2),l=o[0],i=o[1],s=K();return r.a.useEffect((function(){i(a),""!==a&&function(){var e=document.querySelectorAll("input"),t=Object(E.a)(e).findIndex((function(e){return document.activeElement.isEqualNode(e)}));t+1<e.length?e[t+1].focus():document.activeElement.blur()}()}),[a]),r.a.createElement("li",{className:"PlayerRow"},r.a.createElement("img",{src:R({suit:"ALL",value:t}),className:"AvatarContainer AvatarContainer--card"}),r.a.createElement("div",{className:"name"},r.a.createElement("form",{action:"#",onSubmit:function(e){e.preventDefault(),s(Object(b.setCardDetail)(t,l))}},r.a.createElement("div",{className:"StatusDot ".concat(B({initialValue:a,value:l}))}),r.a.createElement("input",{type:"text",value:l,onChange:function(e){return i(e.currentTarget.value)}}))))},H=function(){var e=P().state;return r.a.createElement("div",{style:{paddingBottom:"120px"}},r.a.createElement("ul",{className:"notList"},V.map((function(t){var n,a;return r.a.createElement(U,{face:t,suits:W,key:t,initialValue:null!==(n=null===e||void 0===e?void 0:null===(a=e.rules["".concat(t,"_ALL")])||void 0===a?void 0:a.rule)&&void 0!==n?n:""})}))),r.a.createElement(l.b,{to:"/game/lobby"},r.a.createElement("div",{className:"Fixed Fixed--bottom Fixed--stylish",style:{fontWeight:"bold",padding:"20px",display:"block"}},"Done!")))},Y=n(43),J=n.n(Y),G=(n(81),["#272727","#fff","#9d0b0b","#ff7315","#a35638","#50d890","#333366","#f67280","#ad62aa"]),X=function(){var e=K(),t=P().getSelf,n=Object(s.g)(),a=r.a.useState(null),c=Object(u.a)(a,2),o=c[0],l=c[1],i=r.a.useState("#272727"),m=Object(u.a)(i,2),v=m[0],f=m[1],p=r.a.useState(!1),g=Object(u.a)(p,2),h=g[0],E=g[1],y=t().avatar;r.a.useEffect((function(){h&&(E(!1),l(null))}),[h]),r.a.useEffect((function(){var e=new Image;e.src=y,document.querySelector("canvas").getContext("2d").drawImage(e,0,0)}),[y]),d();return r.a.createElement("div",{className:"column-layout"},r.a.createElement("h1",{style:{marginBottom:0}},"Draw your avatar"),r.a.createElement("ul",{className:"ColorPicker"},G.map((function(e){return r.a.createElement("li",{key:e,style:{backgroundColor:e},onClick:function(){return f(e)}})}))),r.a.createElement("div",{className:"AvatarContainer AvatarContainer--edit"},r.a.createElement(J.a,{brushColor:v,lineWidth:8,clear:h})),r.a.createElement("div",{className:"Fixed Fixed--bottom Fixed--stylish"},r.a.createElement("button",{type:"button",onClick:function(){E(!0)}},"Clear"),r.a.createElement("button",{type:"button",onClick:function(){return l(document.querySelector("canvas").toDataURL())}},"Preview"),r.a.createElement("button",{onClick:function(){var t=document.querySelector("canvas").toDataURL();e(Object(b.saveAvatar)(t)),localStorage.setItem("@KC_Avatar",t),n.push("/game/lobby")}},"Save!"),o&&r.a.createElement("img",{src:o,className:"AvatarContainer",alt:"",style:{position:"absolute",top:"-40px",left:"calc(50% - 25px)"}})))},q={J:"Jack",Q:"Queen",K:"King",A:"Ace"},z=(n(82),function(){var e=P(),t=e.state,n=void 0===t?{}:t,a=e.getSelf;if(!n||!n.players)return null;var c=a(),o=n.players;return r.a.createElement("ul",{className:"PlayerList notList"},Object.keys(o).map((function(e,t){var a=o[e];return r.a.createElement("li",{key:e,className:[c.id===e?"self":"",n.active===t?"selected":""].filter((function(e){return!!e})).join(" ")},r.a.createElement("img",{src:a.avatar,className:"AvatarContainer"}),a.name||a.id,r.a.createElement("div",{className:"StatusDot ".concat(a.connected?"green":"orange")}))})))}),Q=(n(83),function(){return r.a.createElement("div",{className:"cup"},Array.from({length:8},(function(e,t){return t})).map((function(e){var t=2*Math.PI*(e/8),n=Math.sin(t),a=Math.cos(t),c=180/Math.PI;return r.a.createElement("div",{key:t,className:"cup-face",style:{transform:"translate3d(".concat(48*n,"px, ").concat(48*a,"px, 80px)\n\t\t\t\t\t\trotate3d(0, 0, 1, ").concat(Math.atan2(a,n)*c+90,"deg)\n\t\t\t\t\t\trotate3d(1, 0, 0, 90deg)")}})})),Array.from({length:3},(function(e,t){return t})).map((function(e){return r.a.createElement("div",{className:"cup-base",key:e,style:{transform:"translate3d(0, 0, ".concat(3*e,"px) scale(").concat(1.15-.05*e,")")}})})))}),$=(n(84),["top","bottom","left","right"]),Z=Object(I.memoize)((function(e,t,n,a){var r=1.95*Math.PI*(e/t),c=Math.sin(r),o=Math.cos(r),l=180/Math.PI;switch(!0){case a===e:return"";case n===e:return"translate3d(".concat(220*c,"px, ").concat(220*o,"px, 1px)\n\t\t\trotate3d(0, 0, 1, ").concat(Math.atan2(o,c)*l+90,"deg)");default:return"translate3d(".concat(130*c,"px, ").concat(130*o,"px, 1px)\n\t\t\trotate3d(0, 0, 1, ").concat(Math.atan2(o,c)*l+90,"deg)")}}),(function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.join("|")})),ee=function(e){var t,n,a,c=e.canDraw,o=r.a.useState(null),l=Object(u.a)(o,2),i=l[0],s=l[1],m=r.a.useState(null),d=Object(u.a)(m,2),g=d[0],h=d[1],E=P().state,y=void 0===E?{}:E,C=K(),x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.x,n=e.y,a=r.a.useState(t||0),c=Object(u.a)(a,2),o=c[0],l=c[1],i=r.a.useState(n||0),s=Object(u.a)(i,2),m=s[0],d=s[1],g=r.a.useState(0),h=Object(u.a)(g,2),b=h[0],E=h[1],y=function(e){({x:e.touches[0].clientX,y:e.touches[0].clientY}),f={x:e.touches[0].clientX,y:e.touches[0].clientY},v.unshift(p(e.touches[0])),E(0)},C=function(e){v.unshift(p(e.touches[0])),l(o+(f.x-e.touches[0].clientX)),d(m+(f.y-e.touches[0].clientY)),f={x:e.touches[0].clientX,y:e.touches[0].clientY},v.length>8&&(v.length=8)},w=function(){try{var e=v[0],t=v[v.length-1],n=Math.max(0,(1e3-(+new Date-t.t))/20);E(n/100),l(o+(t.touch.clientX-e.touch.clientX)*(n/30)),d(m+(t.touch.clientY-e.touch.clientY)*(n/30)),v=[]}catch(a){}};return{containerProps:{onTouchStart:y,onTouchEnd:w,onTouchMove:C},transformValue:{x:o,y:m,duration:b}}}({x:0,y:0}),O=x.containerProps,k=x.transformValue,S=document.body.getBoundingClientRect().height-135,j=null===(t=y.deck)||void 0===t?void 0:t.map((function(e){return e.isDrawn})).join("|");return r.a.useEffect((function(){s(null)}),[j]),r.a.createElement(r.a.Fragment,null,g&&r.a.createElement("div",{className:"draw-container"},r.a.createElement("div",{className:"card-rule-container"},r.a.createElement("img",{src:R(g),alt:""}),r.a.createElement("div",null,r.a.createElement("span",null,null===(n=y.rules["".concat(g.value,"_ALL")])||void 0===n?void 0:n.rule))),r.a.createElement("button",{onClick:function(){return h(null)}},"\u2716")),r.a.createElement("div",Object.assign({className:"container"},O,{style:{height:S,perspective:S}}),r.a.createElement("div",{className:"stage",style:{transform:"".concat("rotate3d(1, 0, 0, 66deg) translate3d(5px, -100px, 0)"," rotate3d(0, 0, 1, ").concat(k.x,"deg)"),transition:"transform ".concat(k.duration,"s ease-out")}},null===(a=y.deck)||void 0===a?void 0:a.map((function(e,t){return e.isDrawn?null:r.a.createElement("img",Object.assign({key:R(e),src:"/images/cards/BACK.svg"},c?{onClick:function(){return e=t,void(g||(e===i?(C(Object(b.drawCard)(e)),h(Object(w.a)({},y.deck[e]))):s(e)));var e}}:{},{className:"PlayingCard",style:{transform:Z(t,y.deck.length,i,g)}}))})),$.map((function(e){return r.a.createElement("div",{className:"edge ".concat(e),key:e})})),r.a.createElement(Q,null))))},te=function(){var e=T(),t=Object(s.g)(),n=function(){var e=r.a.useContext(_);return function(){e.messages=[]}}();return r.a.createElement("div",{className:"endgame-splash"},r.a.createElement("h1",null,"Game complete!"),r.a.createElement("button",{onClick:function(){e.send(Object(b.remakeGame)()),n()},type:"button"},"Play again"),r.a.createElement("button",{onClick:function(){e.leave(),t.push("/"),window.localStorage.removeItem("@@Colosyius_GC_kings_cup")},type:"button",className:"leave"},"Leave"))},ne=function(e){return e.name||e.id},ae=function(){d();var e=Object(s.g)(),t=P(),n=t.state,a=void 0===n?{}:n,c=t.getSelf,o=a.active,l=a.players,u=void 0===l?{}:l,m=a.deck,v=function(e){return function(t){return e[Object.keys(e)[t]]}}(u)(o)||{},f=c()||{},p=v.id===f.id;r.a.useEffect((function(){a.hasStarted||e.push("/game/lobby")}),[a.hasStarted]),function(e){var t=r.a.useContext(_);r.a.useEffect((function(){t.messages.length&&e(t.messages[t.messages.length-1])}),[t.messages.length])}((function(e){var t;e.type===b.drawCard.toString()&&i.b.warning(r.a.createElement(r.a.Fragment,null,r.a.createElement("img",{src:R(e.card),className:"AvatarContainer AvatarContainer--card"}),r.a.createElement("img",{src:u[e.player].avatar,className:"AvatarContainer"}),r.a.createElement("div",null,ne(u[e.player])," just drew a ",(t=e.card,"".concat(q[t.value]||t.value," of ").concat(t.suit,"s"))),r.a.createElement("div",null,e.rule||"No rule defined for this card... I guess you're playing it by ear","!")))}));var g=0===(m||[]).filter((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.isDrawn;return!t})).length;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"column-layout container gameboard",style:g?{filter:"brightness(0.3)"}:{}},!g&&r.a.createElement("h1",null,"It's ",p?"your":"".concat(ne(v),"'s")," turn"),r.a.createElement(z,null),r.a.createElement(ee,{canDraw:p&&!g})),g&&r.a.createElement(te,null))},re=(n(85),function(){var e=P().state,t=T(),n=Object(s.g)();Object(s.h)();var a=function(){(null===e||void 0===e||!e.hasStarted||window.confirm("Are you sure? There is a game in progress!"))&&(t.leave(),n.push("/"),window.localStorage.removeItem("@@Colosyius_GC_kings_cup"))},c=function(t){return r.a.createElement("div",{className:"Header".concat(t?" is-hidden":"")},n.length>1&&r.a.createElement("div",{className:"Header-actionBar"},!(null===e||void 0===e?void 0:e.hasStarted)&&r.a.createElement("button",{onClick:function(e){e.preventDefault(),n.go(-1)}},"Back"),r.a.createElement("span",{className:"spacer"}),!!e&&r.a.createElement("button",{onClick:a},"Leave")),r.a.createElement("div",{className:"Header-title"},r.a.createElement("h1",null,"Kings Cup")))};return r.a.createElement("div",null,c(!0),c(!1))}),ce=function(){var e,t,n=Object(s.i)().path,a=(null!==(e=null===(t=window)||void 0===t?void 0:t.location)&&void 0!==e?e:{}).hostname;return r.a.createElement(M,{roomId:"kings_cup",url:"ws://".concat(a).concat(":2567")},r.a.createElement(re,null),r.a.createElement(s.d,null,r.a.createElement(s.b,{exact:!0,path:"".concat(n,"/lobby")},r.a.createElement(F,null)),r.a.createElement(s.b,{exact:!0,path:"".concat(n,"/lobby/edit")},r.a.createElement(H,null)),r.a.createElement(s.b,{exact:!0,path:"".concat(n,"/lobby/draw")},r.a.createElement(X,null)),r.a.createElement(s.b,{exact:!0,path:"".concat(n,"/play")},r.a.createElement(ae,null)),r.a.createElement(s.a,{to:"".concat(n,"/lobby")})))},oe=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.d,null,r.a.createElement(s.b,{exact:!0,path:"/"},r.a.createElement(g,null)),r.a.createElement(s.b,{exact:!0,path:"/find"},r.a.createElement(h,null)),r.a.createElement(s.b,{path:"/game"},r.a.createElement(ce,null))))},le=(n(86),n(87),function(){return r.a.createElement(l.a,null,r.a.createElement(i.a,{position:"top-center",autoClose:!1,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnVisibilityChange:!0,draggable:!0,pauseOnHover:!0,draggablePercent:40}),r.a.createElement(oe,null))}),ie=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function se(e,t){navigator.serviceWorker.register(e,{scope:"/"}).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}o.a.render(r.a.createElement(le,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");ie?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):se(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):se(t,e)}))}}()}},[[46,1,2]]]);
//# sourceMappingURL=main.a199ef19.chunk.js.map