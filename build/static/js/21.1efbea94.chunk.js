(this.webpackJsonpbaseapp=this.webpackJsonpbaseapp||[]).push([[21],{150:function(e,t,n){"use strict";var r=n(145),c=(n(1),n(154)),a=n(311),i=n(2);var o=Object(r.a)({root:{position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)","z-index":"899","& svg":{fontSize:80}},modal:{width:"308px",height:"172px",backgroundColor:"white",borderRadius:"4px",position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",padding:8},text:{fontSize:"16px",margin:0},buttonGroup:{"& button":{border:"none",fontSize:"16px",opacity:"0.6",margin:"0 8px",padding:"4px 8px",borderRadius:4,color:"white","&:hover":{cursor:"pointer",opacity:"1"}}},delete:{color:"red"},check:{color:"#00AA85"},agree:{backgroundColor:"#0061FF"},disagree:{backgroundColor:"#AAAAAA"}});t.a=function(e){var t=e.typeIcon,n=e.text,r=e.onAgree,s=void 0===r?null:r,u=e.onDisagree,l=void 0===u?null:u,p=o();return Object(i.jsx)("div",{className:p.root,children:Object(i.jsxs)(a.a.div,{animate:{scale:1.1},transition:{duration:.1},className:p.modal,children:["delete"===t&&Object(i.jsx)(c.a,{className:p.delete}),"check"===t&&Object(i.jsx)(c.c,{className:p.check}),"fail"===t&&Object(i.jsx)(c.b,{className:p.delete}),Object(i.jsx)("p",{className:p.text,children:n}),Object(i.jsxs)("div",{className:p.buttonGroup,children:[s&&Object(i.jsx)("button",{className:p.agree,onClick:function(){s()},children:"Ti\u1ebfp t\u1ee5c"}),l&&Object(i.jsx)("button",{className:p.disagree,onClick:function(){l()},children:"H\u1ee7y"})]})]})})}},151:function(e,t,n){"use strict";n.d(t,"f",(function(){return i})),n.d(t,"d",(function(){return o})),n.d(t,"h",(function(){return s})),n.d(t,"g",(function(){return u})),n.d(t,"e",(function(){return l})),n.d(t,"i",(function(){return p})),n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return f})),n.d(t,"c",(function(){return b}));var r=n(4),c=n.n(r),a=n(6),i=function(){var e=Object(a.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://provinces.open-api.vn/api/");case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n);case 10:e.prev=10,e.t0=e.catch(0),console.log("error to get province list: ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://provinces.open-api.vn/api/p/".concat(t,"?depth=2"));case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),console.log("error to get district list: ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://provinces.open-api.vn/api/d/".concat(t,"?depth=2"));case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),console.log("error to get ward list: ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://provinces.open-api.vn/api/");case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.next=9,r.find((function(e){return e.code===t}));case 9:return a=e.sent,e.abrupt("return",a.name);case 13:e.prev=13,e.t0=e.catch(0),console.log("Failed to get province name: ",e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a,i,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provinceCode,r=t.districtCode,e.prev=1,e.next=4,fetch("https://provinces.open-api.vn/api/p/".concat(n,"?depth=2"));case 4:return a=e.sent,e.next=7,a.json();case 7:return i=e.sent,e.next=10,i.districts.find((function(e){return e.code===r}));case 10:return o=e.sent,e.abrupt("return",o.name);case 14:e.prev=14,e.t0=e.catch(1),console.log("Failed to get district name: ",e.t0);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a,i,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.districtCode,r=t.wardCode,e.prev=1,e.next=4,fetch("https://provinces.open-api.vn/api/d/".concat(n,"?depth=2"));case 4:return a=e.sent,e.next=7,a.json();case 7:return i=e.sent,e.next=10,i.wards.find((function(e){return e.code===r}));case 10:return o=e.sent,e.abrupt("return",o.name);case 14:e.prev=14,e.t0=e.catch(1),console.log("Failed to get ward name: ",e.t0);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}(),d=function(e){return e?-1!==e.search("Th\xe0nh ph\u1ed1")?e.slice(10):-1!==e.search("T\u1ec9nh")?e.slice(5):e:""},f=function(e){return e?-1!==e.search("Qu\u1eadn")?e.replace("Qu\u1eadn","Q."):-1!==e.search("Huy\u1ec7n")?e.replace("Huy\u1ec7n","H."):-1!==e.search("Th\xe0nh ph\u1ed1")?e.replace("Th\xe0nh ph\u1ed1","TP."):-1!==e.search("Th\u1ecb x\xe3")?e.replace("Th\u1ecb x\xe3","TX."):e:""},b=function(e){return e?-1!==e.search("Ph\u01b0\u1eddng")?e.replace("Ph\u01b0\u1eddng","P."):e:""}},174:function(e,t,n){"use strict";var r=n(4),c=n.n(r),a=n(6),i=n(13),o=n(145),s=n(1),u=n(151),l=n(2),p=Object(o.a)({root:{display:"flex",flexDirection:"column","& select":{"&:focus-visible":{outline:"none"}}},field:{padding:"8px 8px",backgroundColor:"#fff",border:"1px solid #ccc",marginBottom:"2px",borderRadius:"8px",fontSize:14}});t.a=function(e){var t=e.onChange,n=void 0===t?null:t,r=p(),o=Object(s.useState)([]),d=Object(i.a)(o,2),f=d[0],b=d[1],h=Object(s.useState)(0),j=Object(i.a)(h,2),v=j[0],m=j[1],x=Object(s.useState)([]),O=Object(i.a)(x,2),g=O[0],_=O[1],k=Object(s.useState)(0),y=Object(i.a)(k,2),w=y[0],N=y[1],C=Object(s.useState)([]),S=Object(i.a)(C,2),T=S[0],A=S[1],I=Object(s.useRef)(),L=Object(s.useRef)(),F=Object(s.useRef)();return Object(s.useEffect)((function(){var e=function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.f)();case 2:t=e.sent,b(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),Object(s.useEffect)((function(){var e=function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.d)(v);case 2:t=e.sent,_(t.districts);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();0!==v&&e()}),[v]),Object(s.useEffect)((function(){var e=function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.h)(w);case 2:t=e.sent,A(t.wards);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();0!==w&&e()}),[w]),Object(l.jsxs)("div",{className:r.root,children:[Object(l.jsxs)("select",{className:r.field,name:"province",onChange:function(){I.current.value&&(n({province:I.current.value,district:0,ward:0}),m(I.current.value))},ref:I,children:[Object(l.jsx)("option",{value:0,children:"--T\u1ec9nh, th\xe0nh ph\u1ed1--"},0),null===f||void 0===f?void 0:f.map((function(e){return Object(l.jsx)("option",{value:e.code,children:e.name},e.code)}))]}),Object(l.jsxs)("select",{className:r.field,name:"district",onChange:function(){L.current.value&&(n({province:v,district:L.current.value,ward:0}),N(L.current.value))},ref:L,children:[Object(l.jsx)("option",{value:0,children:"--Qu\u1eadn, huy\u1ec7n--"},0),null===g||void 0===g?void 0:g.map((function(e){return Object(l.jsx)("option",{value:e.code,children:e.name},e.code)}))]}),Object(l.jsxs)("select",{className:r.field,name:"ward",onChange:function(){F.current.value&&(n({province:v,district:w,ward:F.current.value}),N(L.current.value))},ref:F,children:[Object(l.jsx)("option",{value:0,children:"--X\xe3 Ph\u01b0\u1eddng--"},0),null===T||void 0===T?void 0:T.map((function(e){return Object(l.jsx)("option",{value:e.code,children:e.name},e.code)}))]})]})}},195:function(e,t,n){"use strict";n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return p})),n.d(t,"a",(function(){return d}));var r=n(4),c=n.n(r),a=n(6),i=n(173),o=n.n(i),s=n(15),u=n(19),l=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.tutorInfor,r=t.dispatch,e.prev=1,e.next=4,fetch("".concat(u.server_name,"/findTutor/tutorList/"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"".concat(u.token_prefix," ").concat(localStorage.getItem("token"))},body:JSON.stringify(n)});case 4:return r(Object(s.l)()),e.abrupt("return",!0);case 8:return e.prev=8,e.t0=e.catch(1),console.log("Failed to resgister tutor",e.t0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.parentInfor,r=t.dispatch,e.prev=1,e.next=4,fetch("".concat(u.server_name,"/findTutor/parentList/"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"".concat(u.token_prefix," ").concat(localStorage.getItem("token"))},body:JSON.stringify(n)});case 4:return r(Object(s.k)()),e.abrupt("return",!0);case 8:return e.prev=8,e.t0=e.catch(1),console.log("Failed to resgister tutor",e.t0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.token,n=t.file,e.prev=1,r=n,o()({method:"POST",headers:{"Content-Type":"application/json",Authorization:"".concat(u.token_prefix," ").concat(localStorage.getItem("token"))},url:"".concat(u.server_name,"/findTutor/imagePrivateUserList/"),data:r}),e.abrupt("return",!0);case 7:return e.prev=7,e.t0=e.catch(1),console.log("Failed to register image ",e.t0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()},286:function(e,t,n){"use strict";n.r(t);var r=n(21),c=n(4),a=n.n(c),i=n(6),o=n(13),s=n(20),u=n(174),l=n(150),p=n(1),d=n(157),f=n(14),b=n(9),h=n(195),j=n(2);t.default=function(e){var t=Object(p.useState)(!1),n=Object(o.a)(t,2),c=n[0],v=n[1],m=Object(d.a)(),x=m.register,O=m.formState.errors,g=m.handleSubmit,_=m.watch;Object(p.useRef)({}).current=_("password","");var k=Object(f.b)(),y=Object(b.f)(),w=Object(p.useState)(!1),N=Object(o.a)(w,2),C=N[0],S=N[1],T=Object(p.useState)(!1),A=Object(o.a)(T,2),I=A[0],L=A[1],F=Object(p.useState)({province:0,district:0,ward:0}),P=Object(o.a)(F,2),z=P[0],R=P[1],D=function(e){return{first_name:e.slice(0,e.indexOf(" ")),last_name:e.slice(e.indexOf(" ")+1)}},H=function(){var e=Object(i.a)(a.a.mark((function e(t){var n,r,c,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),n={avatar:null,identity_card:null,number_phone:t.telephone||null,number_of_identity_card:t.identitycard||null,first_name:D(t.name).first_name||null,last_name:D(t.name).last_name||null,birthday:t.birthday||null,location:null,province_code:Number(z.province),district_code:Number(z.district),ward_code:Number(z.ward),detail_location:t.detailLocation||null,link:[{name:"facebook",url:t.facebook.replace(/^\s+|\s+$/g,"")?t.facebook:""},{name:"instagram",url:t.instagram.replace(/^\s+|\s+$/g,"")?t.instagram:""},{name:"linkedln",url:t.linkedln.replace(/^\s+|\s+$/g,"")?t.linkedln:""}]},e.next=4,Object(h.b)({parentInfor:n,dispatch:k});case 4:if(r=e.sent,(c=new FormData).append("avatar",t.avatar[0]),!r){e.next=13;break}return e.next=10,Object(h.a)({file:c});case 10:e.t0=e.sent,e.next=14;break;case 13:e.t0=!1;case 14:i=e.t0,v(!1),i?(S(!0),y.push("/")):L(!0);case 17:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(j.jsxs)("div",{className:"role",children:[Object(j.jsxs)("form",{className:"role__form",onSubmit:g(H),children:[Object(j.jsx)("p",{children:"\u0110\u0103ng k\xed l\xe0m ph\u1ee5 huynh"}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"H\u1ecd v\xe0 T\xean"}),Object(j.jsx)("input",Object(r.a)({name:"text",type:"name"},x("name",{required:!0}))),O.name&&Object(j.jsx)("span",{className:"role__form__error",children:"Nh\u1eadp \u0111\xfang t\xean c\u1ee7a b\u1ea1n"})]}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i"}),Object(j.jsx)("input",Object(r.a)({name:"telephone",type:"number"},x("telephone",{required:!0,minLength:8}))),O.telephone&&Object(j.jsx)("span",{className:"role__form__error",children:"C\u1ea7n nh\u1eadp \u0111\xfang s\u1ed1 \u0111i\u1ec7n tho\u1ea1i"})]}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"Ng\xe0y sinh"}),Object(j.jsx)("input",Object(r.a)({name:"birthday",type:"date"},x("birthday",{required:!0}))),O.birthday&&Object(j.jsx)("span",{className:"role__form__error",children:"C\u1ea7n nh\u1eadp ng\xe0y sinh"})]}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"\u1ea2nh \u0111\u1ea1i di\u1ec7n"}),Object(j.jsx)("input",Object(r.a)({type:"file",name:"avatar"},x("avatar")))]}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"\u0110\u1ecba ch\u1ec9"}),Object(j.jsx)(u.a,{onChange:function(e){R(e)}})]}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"Chi ti\u1ebft \u0111\u1ecba ch\u1ec9"}),Object(j.jsx)("input",Object(r.a)({name:"detailLocation",type:"text"},x("detailLocation")))]}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"S\u1ed1 CMND/CCCD (kh\xf4ng b\u1eaft bu\u1ed9c)"}),Object(j.jsx)("input",Object(r.a)({name:"identitycard",type:"number"},x("identitycard")))]}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"Link Facebook (n\u1ebfu c\xf3)"}),Object(j.jsx)("input",Object(r.a)({type:"text",name:"facebook"},x("facebook")))]}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"Link Instagram (n\u1ebfu c\xf3)"}),Object(j.jsx)("input",Object(r.a)({type:"text",name:"instagram"},x("instagram")))]}),Object(j.jsxs)("div",{className:"role__form__field",children:[Object(j.jsx)("label",{children:"Link Linkedln (n\u1ebfu c\xf3)"}),Object(j.jsx)("input",Object(r.a)({type:"text",name:"linkedln"},x("linkedln")))]}),Object(j.jsx)("div",{className:"role__form__field",children:Object(j.jsx)("button",{className:"role__form__submit",variant:"contained",color:"primary",type:"submit",children:"\u0110\u0103ng k\xed"})})]}),c&&Object(j.jsx)(s.a,{}),C&&Object(j.jsx)(l.a,{typeIcon:"check",text:"\u0110\u0103ng k\xed l\xe0m gia s\u01b0 th\xe0nh c\xf4ng",onAgree:function(){return y.push("/")}}),I&&Object(j.jsx)(l.a,{typeIcon:"fail",text:"\u0110\u0103ng k\xed l\xe0m gia s\u01b0 kh\xf4ng th\xe0nh c\xf4ng",onAgree:function(){return L(!1)}})]})}}}]);
//# sourceMappingURL=21.1efbea94.chunk.js.map