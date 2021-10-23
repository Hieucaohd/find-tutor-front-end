(this.webpackJsonpbaseapp=this.webpackJsonpbaseapp||[]).push([[19],{117:function(e,t,n){"use strict";var r=n(99),c=(n(1),n(121)),a=n(282),i=n(2);var o=Object(r.a)({root:{position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)","z-index":"899","& svg":{fontSize:80}},modal:{width:"308px",height:"172px",backgroundColor:"white",borderRadius:"4px",position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",padding:8},text:{fontSize:"16px",margin:0},buttonGroup:{"& button":{border:"none",fontSize:"16px",opacity:"0.6",margin:"0 8px",padding:"4px 8px",borderRadius:4,color:"white","&:hover":{cursor:"pointer",opacity:"1"}}},delete:{color:"red"},check:{color:"#00AA85"},agree:{backgroundColor:"#0061FF"},disagree:{backgroundColor:"#AAAAAA"}});t.a=function(e){var t=e.typeIcon,n=e.text,r=e.onAgree,s=void 0===r?null:r,u=e.onDisagree,l=void 0===u?null:u,p=o();return Object(i.jsx)("div",{className:p.root,children:Object(i.jsxs)(a.a.div,{animate:{scale:1.1},transition:{duration:.1},className:p.modal,children:["delete"===t&&Object(i.jsx)(c.a,{className:p.delete}),"check"===t&&Object(i.jsx)(c.c,{className:p.check}),"fail"===t&&Object(i.jsx)(c.b,{className:p.delete}),Object(i.jsx)("p",{className:p.text,children:n}),Object(i.jsxs)("div",{className:p.buttonGroup,children:[s&&Object(i.jsx)("button",{className:p.agree,onClick:function(){s()},children:"Ti\u1ebfp t\u1ee5c"}),l&&Object(i.jsx)("button",{className:p.disagree,onClick:function(){l()},children:"H\u1ee7y"})]})]})})}},118:function(e,t,n){"use strict";n.d(t,"f",(function(){return i})),n.d(t,"d",(function(){return o})),n.d(t,"h",(function(){return s})),n.d(t,"g",(function(){return u})),n.d(t,"e",(function(){return l})),n.d(t,"i",(function(){return p})),n.d(t,"b",(function(){return d})),n.d(t,"a",(function(){return b})),n.d(t,"c",(function(){return f}));var r=n(4),c=n.n(r),a=n(6),i=function(){var e=Object(a.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://provinces.open-api.vn/api/");case 3:return t=e.sent,e.next=6,t.json();case 6:return n=e.sent,e.abrupt("return",n);case 10:e.prev=10,e.t0=e.catch(0),console.log("error to get province list: ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://provinces.open-api.vn/api/p/".concat(t,"?depth=2"));case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),console.log("error to get district list: ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),s=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://provinces.open-api.vn/api/d/".concat(t,"?depth=2"));case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),console.log("error to get ward list: ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://provinces.open-api.vn/api/");case 3:return n=e.sent,e.next=6,n.json();case 6:return r=e.sent,e.next=9,r.find((function(e){return e.code===t}));case 9:return a=e.sent,e.abrupt("return",a.name);case 13:e.prev=13,e.t0=e.catch(0),console.log("Failed to get province name: ",e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a,i,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.provinceCode,r=t.districtCode,e.prev=1,e.next=4,fetch("https://provinces.open-api.vn/api/p/".concat(n,"?depth=2"));case 4:return a=e.sent,e.next=7,a.json();case 7:return i=e.sent,e.next=10,i.districts.find((function(e){return e.code===r}));case 10:return o=e.sent,e.abrupt("return",o.name);case 14:e.prev=14,e.t0=e.catch(1),console.log("Failed to get district name: ",e.t0);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a,i,o;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.districtCode,r=t.wardCode,e.prev=1,e.next=4,fetch("https://provinces.open-api.vn/api/d/".concat(n,"?depth=2"));case 4:return a=e.sent,e.next=7,a.json();case 7:return i=e.sent,e.next=10,i.wards.find((function(e){return e.code===r}));case 10:return o=e.sent,e.abrupt("return",o.name);case 14:e.prev=14,e.t0=e.catch(1),console.log("Failed to get ward name: ",e.t0);case 17:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}(),d=function(e){return e?-1!==e.search("Th\xe0nh ph\u1ed1")?e.slice(10):-1!==e.search("T\u1ec9nh")?e.slice(5):e:""},b=function(e){return e?-1!==e.search("Qu\u1eadn")?e.replace("Qu\u1eadn","Q."):-1!==e.search("Huy\u1ec7n")?e.replace("Huy\u1ec7n","H."):-1!==e.search("Th\xe0nh ph\u1ed1")?e.replace("Th\xe0nh ph\u1ed1","TP."):-1!==e.search("Th\u1ecb x\xe3")?e.replace("Th\u1ecb x\xe3","TX."):e:""},f=function(e){return e?-1!==e.search("Ph\u01b0\u1eddng")?e.replace("Ph\u01b0\u1eddng","P."):e:""}},141:function(e,t,n){"use strict";var r=n(4),c=n.n(r),a=n(6),i=n(19),o=n(99),s=n(1),u=n(118),l=n(2),p=Object(o.a)({root:{display:"flex",flexDirection:"column","& select":{"&:focus-visible":{outline:"none"}}},field:{padding:"8px 2px",backgroundColor:"#fff",border:"1px solid #ccc",marginBottom:"2px",borderRadius:"8px"}});t.a=function(e){var t=e.onChange,n=void 0===t?null:t,r=p(),o=Object(s.useState)([]),d=Object(i.a)(o,2),b=d[0],f=d[1],h=Object(s.useState)(0),j=Object(i.a)(h,2),x=j[0],v=j[1],m=Object(s.useState)([]),O=Object(i.a)(m,2),g=O[0],y=O[1],k=Object(s.useState)(0),w=Object(i.a)(k,2),C=w[0],N=w[1],_=Object(s.useState)([]),S=Object(i.a)(_,2),T=S[0],F=S[1],A=Object(s.useRef)(),R=Object(s.useRef)(),I=Object(s.useRef)();return Object(s.useEffect)((function(){var e=function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.f)();case 2:t=e.sent,f(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),Object(s.useEffect)((function(){var e=function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.d)(x);case 2:t=e.sent,y(t.districts);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();0!==x&&e()}),[x]),Object(s.useEffect)((function(){var e=function(){var e=Object(a.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(u.h)(C);case 2:t=e.sent,F(t.wards);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();0!==C&&e()}),[C]),Object(l.jsxs)("div",{className:r.root,children:[Object(l.jsxs)("select",{className:r.field,name:"province",onChange:function(){A.current.value&&(n({province:A.current.value,district:0,ward:0}),v(A.current.value))},ref:A,children:[Object(l.jsx)("option",{value:0,children:"--T\u1ec9nh, th\xe0nh ph\u1ed1--"},0),null===b||void 0===b?void 0:b.map((function(e){return Object(l.jsx)("option",{value:e.code,children:e.name},e.code)}))]}),Object(l.jsxs)("select",{className:r.field,name:"district",onChange:function(){R.current.value&&(n({province:x,district:R.current.value,ward:0}),N(R.current.value))},ref:R,children:[Object(l.jsx)("option",{value:0,children:"--Qu\u1eadn, huy\u1ec7n--"},0),null===g||void 0===g?void 0:g.map((function(e){return Object(l.jsx)("option",{value:e.code,children:e.name},e.code)}))]}),Object(l.jsxs)("select",{className:r.field,name:"ward",onChange:function(){I.current.value&&(n({province:x,district:C,ward:I.current.value}),N(R.current.value))},ref:I,children:[Object(l.jsx)("option",{value:0,children:"--X\xe3 Ph\u01b0\u1eddng--"},0),null===T||void 0===T?void 0:T.map((function(e){return Object(l.jsx)("option",{value:e.code,children:e.name},e.code)}))]})]})}},143:function(e,t){e.exports="object"==typeof self?self.FormData:window.FormData},160:function(e,t,n){"use strict";n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return p})),n.d(t,"a",(function(){return d}));var r=n(4),c=n.n(r),a=n(6),i=n(148),o=n.n(i),s=n(10),u=n(20),l=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.token,r=t.tutorInfor,a=t.dispatch,e.prev=1,e.next=4,fetch("".concat(u.server_name,"/findTutor/tutorList/"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"".concat(u.token_prefix," ").concat(n)},body:JSON.stringify(r)});case 4:return a(Object(s.n)()),e.abrupt("return",!0);case 8:return e.prev=8,e.t0=e.catch(1),console.log("Failed to resgister tutor",e.t0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.token,r=t.parentInfor,a=t.dispatch,e.prev=1,e.next=4,fetch("".concat(u.server_name,"/findTutor/parentList/"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"".concat(u.token_prefix," ").concat(n)},body:JSON.stringify(r)});case 4:return a(Object(s.m)()),e.abrupt("return",!0);case 8:return e.prev=8,e.t0=e.catch(1),console.log("Failed to resgister tutor",e.t0),e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(a.a)(c.a.mark((function e(t){var n,r,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.token,r=t.file,e.prev=1,a=r,o()({method:"POST",url:"".concat(u.server_name,"/findTutor/imagePrivateUserList/"),headers:{"Content-Type":"application/json",Authorization:"".concat(u.token_prefix," ").concat(n)},data:a}),e.abrupt("return",!0);case 7:return e.prev=7,e.t0=e.catch(1),console.log("Failed to register image ",e.t0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()},252:function(e,t,n){"use strict";n.r(t);var r=n(5),c=n(22),a=n(4),i=n.n(a),o=n(6),s=n(19),u=n(101),l=n(99),p=n(141),d=n(117),b=n(143),f=n.n(b),h=n(1),j=n(125),x=n(11),v=n(8),m=n(10),O=n(160),g=n(2);var y=Object(l.a)((function(e){var t;return{root:{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:0,marginTop:"56px",marginBottom:56},form:(t={},Object(r.a)(t,e.breakpoints.down("sm"),{backgroundColor:"transparent",padding:"0",width:"80%"}),Object(r.a)(t,e.breakpoints.up("md"),{width:"500px"}),Object(r.a)(t,"borderRadius","8px"),Object(r.a)(t,"display","flex"),Object(r.a)(t,"flexDirection","column"),Object(r.a)(t,"justifyContent","center"),Object(r.a)(t,"alignItems","center"),Object(r.a)(t,"& > p",{fontSize:"18px"}),t),formField:{width:"100%",marginBottom:"8px",display:"flex",flexDirection:"column","& input":{padding:"8px 16px",borderRadius:"8px",border:"0.5px solid #ccc",backgroundColor:"white"},"& textarea":{padding:"4px 8px",borderRadius:"8px",border:"0.5px solid #ccc",backgroundColor:"white"},"& button":{width:"100%"},"& label":{fontSize:"12px",fontWeight:500}},check:{display:"flex"},profession:{padding:"8px 8px",border:"1px solid #ccc",borderRadius:"8px",backgroundColor:"white",marginTop:"2px"},choose:{display:"flex",justifyContent:"space-between",border:"0.5px solid #ccc",backgroundColor:"white",padding:8,borderRadius:"8px",marginTop:"1px","& div":{display:"flex",alignItems:"center"}},error:{fontSize:"12px",color:"red"},submit:{backgroundColor:"#5037EC",color:"white",border:"none",borderRadius:"8px",padding:"10px 0px",opacity:.8,"&:hover":{cursor:"pointer",opacity:1}},loading:{display:"none",position:"fixed",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,0.5)","z-index":2}}}));t.default=function(e){var t=y(),n=Object(x.c)(m.i),r=Object(v.f)(),a=Object(j.a)(),l=a.register,b=a.formState.errors,k=a.handleSubmit,w=a.watch;Object(h.useRef)({}).current=w("password","");var C=Object(x.b)(),N=Object(h.useRef)(null),_=Object(h.useState)({province:0,district:0,ward:0}),S=Object(s.a)(_,2),T=S[0],F=S[1],A=Object(h.useState)(!1),R=Object(s.a)(A,2),I=R[0],z=R[1],D=Object(h.useState)(!1),P=Object(s.a)(D,2),L=P[0],H=P[1],E=function(e){return{first_name:e.slice(0,e.indexOf(" ")),last_name:e.slice(e.indexOf(" ")+1)}},J=function(e){var t=[];return e.cap1&&t.push(1),e.cap2&&t.push(2),e.cap3&&t.push(3),e.cap4&&t.push(4),t},Q=function(){var e=Object(o.a)(i.a.mark((function e(t){var c,a,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return N.current.style.display="flex",c={profession:t.profession||null,university:t.university||null,experience:t.experience||null,achievement:t.achievement||null,khu_vuc_day:t.teachLocation||null,number_phone:t.telephone||null,number_of_identity_card:t.identitycard||null,first_name:E(t.name).first_name||null,last_name:E(t.name).last_name||null,lop_day:[1],cap_day:J(t)||null,birthday:t.birthday||null,avatar:null,province_code:Number(T.province),district_code:Number(T.district),ward_code:Number(T.ward),detail_location:t.detailLocation||null,link:[{name:"facebook",url:t.facebook.replace(/^\s+|\s+$/g,"")?t.facebook:""},{name:"instagram",url:t.instagram.replace(/^\s+|\s+$/g,"")?t.instagram:""},{name:"linkedln",url:t.linkedln.replace(/^\s+|\s+$/g,"")?t.linkedln:""}]},e.next=4,Object(O.c)({token:n,tutorInfor:c,dispatch:C});case 4:if(a=e.sent,(o=new f.a).append("avatar",t.avatar[0]),o.append("identity_card",t.cccd[0]),o.append("student_card",t.thesv[0]),!a){e.next=15;break}return e.next=12,Object(O.a)({token:n,file:o});case 12:e.t0=e.sent,e.next=16;break;case 15:e.t0=!1;case 16:e.t0?(N.current.style.display="none",z(!0),r.push("/")):(N.current.style.display="none",H(!0));case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(g.jsxs)("div",{className:t.root,children:[Object(g.jsxs)("form",{className:t.form,onSubmit:k(Q),children:[Object(g.jsx)("p",{children:"\u0110\u0103ng k\xed l\xe0m gia s\u01b0"}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"H\u1ecd v\xe0 T\xean"}),Object(g.jsx)("input",Object(c.a)({name:"text",type:"name"},l("name",{required:!0}))),b.name&&Object(g.jsx)("span",{className:t.error,children:"Nh\u1eadp \u0111\xfang t\xean c\u1ee7a b\u1ea1n"})]}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"Ng\xe0y sinh"}),Object(g.jsx)("input",Object(c.a)({name:"birthday",type:"date"},l("birthday",{required:!0}))),b.birthday&&Object(g.jsx)("span",{className:t.error,children:"C\u1ea7n nh\u1eadp ng\xe0y sinh"})]}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i"}),Object(g.jsx)("input",Object(c.a)({name:"telephone",type:"number"},l("telephone",{required:!0,minLength:8}))),b.telephone&&Object(g.jsx)("span",{className:t.error,children:"C\u1ea7n nh\u1eadp \u0111\xfang s\u1ed1 \u0111i\u1ec7n tho\u1ea1i"})]}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"S\u1ed1 CMND/CCCD (kh\xf4ng b\u1eaft bu\u1ed9c)"}),Object(g.jsx)("input",Object(c.a)({name:"identitycard",type:"number"},l("identitycard")))]}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"\u0110\u1ecba ch\u1ec9"}),Object(g.jsx)(p.a,{onChange:function(e){F(e)}})]}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"Chi ti\u1ebft \u0111\u1ecba ch\u1ec9"}),Object(g.jsx)("input",Object(c.a)({name:"detailLocation",type:"text"},l("detailLocation")))]}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"\u1ea2nh \u0111\u1ea1i di\u1ec7n"}),Object(g.jsx)("input",Object(c.a)({type:"file",name:"avatar"},l("avatar")))]}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"\u1ea2nh CCCD"}),Object(g.jsx)("input",Object(c.a)({type:"file",name:"avatar"},l("cccd")))]}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"Ngh\u1ec1 nghi\u1ec7p hi\u1ec7n t\u1ea1i"}),Object(g.jsxs)("select",Object(c.a)(Object(c.a)({className:t.profession,name:"profession"},l("profession")),{},{children:[Object(g.jsx)("option",{value:"sv",children:"Sinh Vi\xean"}),Object(g.jsx)("option",{value:"gv",children:"Gi\xe1o Vi\xean"}),Object(g.jsx)("option",{value:"khac",children:"Kh\xe1c"})]}))]}),Object(g.jsxs)("div",{className:t.formField,children:[Object(g.jsx)("label",{children:"\u1ea2nh th\u1ebb sinh vi\xean"}),Object(g.jsx)("input",Object(c.a)({type:"file",name:"avatar"},l("thesv")))]}),Object(g.jsx)("div",{className:t.formField,children:Object(g.jsx)("button",{className:t.submit,variant:"contained",color:"primary",type:"submit",children:"\u0110\u0103ng k\xed"})})]}),Object(g.jsx)("div",{ref:N,className:t.loading,children:Object(g.jsx)(u.a,{})}),I&&Object(g.jsx)(d.a,{typeIcon:"check",text:"\u0110\u0103ng k\xed l\xe0m gia s\u01b0 th\xe0nh c\xf4ng",onAgree:function(){return r.push("/")}}),L&&Object(g.jsx)(d.a,{typeIcon:"fail",text:"\u0110\u0103ng k\xed l\xe0m gia s\u01b0 kh\xf4ng th\xe0nh c\xf4ng",onAgree:function(){return H(!1)}})]})}}}]);
//# sourceMappingURL=19.4d8ea84e.chunk.js.map