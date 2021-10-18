(this.webpackJsonpbaseapp=this.webpackJsonpbaseapp||[]).push([[30],{270:function(e,t,n){"use strict";n.r(t);var r=n(8),a=n(100),s=n(1),i=n(10),c=n(5),o=n.n(c),l=n(7),d=n(13),b=n(163),p=n(69),j=n(22),h=n(190),u=n(19),m=n(11),x=n(18),O=n(2);var f=Object(a.a)((function(e){var t;return{root:Object(r.a)({},e.breakpoints.down("sm"),{width:"80%"}),form:(t={},Object(r.a)(t,e.breakpoints.down("sm"),{width:"100%"}),Object(r.a)(t,e.breakpoints.up("md"),{width:"340px"}),Object(r.a)(t,"borderRadius","8px"),Object(r.a)(t,"display","flex"),Object(r.a)(t,"flexDirection","column"),Object(r.a)(t,"justifyContent","center"),Object(r.a)(t,"position","relative"),t),formField:{width:"100%",marginBottom:"16px",display:"flex",flexDirection:"column","& input":{padding:"12px 14px",borderRadius:"8px",border:"0.5px solid #ccc"},"& button":{width:"100%"}},error:{fontSize:"12px",color:"red"},submit:{backgroundColor:"#5472EA",color:"white",border:"none",borderRadius:"8px",padding:"10px 0px",opacity:.8,"&:hover":{opacity:1,cursor:"pointer"}},label:{fontSize:"14px",fontWeight:"600"},loading:{display:"none",position:"fixed",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,0.5)","z-index":2}}})),g=function(){var e=f(),t=Object(h.a)(),n=t.register,r=t.formState.errors,a=t.handleSubmit,c=t.watch,g=Object(s.useRef)({});g.current=c("password","");var w=Object(m.f)(),k=Object(u.b)(),y=Object(s.useRef)(null),v=Object(s.useState)(!1),N=Object(d.a)(v,2),C=N[0],S=N[1],F=Object(s.useState)(!1),I=Object(d.a)(F,2),R=I[0],q=I[1],z=function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(j.server_name,"/auth/register/"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(O.jsxs)("div",{className:e.root,children:[Object(O.jsxs)("form",{className:e.form,onSubmit:a((function(e){y.current.style.display="flex",z({email:e.email,username:e.username,password:e.password}).then((function(t){t.ok?(k(Object(x.b)({email:e.email,password:e.password})),S(!0)):(q(!0),y.current.style.display="none")}))})),children:[Object(O.jsx)("h2",{children:"\u0110\u0103ng k\xed t\xe0i kho\u1ea3n"}),Object(O.jsxs)("div",{className:e.formField,children:[Object(O.jsx)("label",{className:e.label,children:"T\xean t\xe0i kho\u1ea3n"}),Object(O.jsx)("input",Object(i.a)({name:"username",type:"text"},n("username",{required:!0,minLength:6}))),r.username&&"required"===r.username.type&&Object(O.jsx)("span",{className:e.error,children:"C\u1ea7n nh\u1eadp t\xean t\xe0i kho\u1ea3n"}),r.username&&"minLength"===r.username.type&&Object(O.jsx)("span",{className:e.error,children:"T\xean t\xe0i kho\u1ea3n c\u1ea7n \xedt nh\u1ea5t 6 k\xed t\u1ef1"})]}),Object(O.jsxs)("div",{className:e.formField,children:[Object(O.jsx)("label",{className:e.label,children:"Email"}),Object(O.jsx)("input",Object(i.a)({name:"email",type:"email"},n("email",{required:!0,pattern:{value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}}))),r.email&&Object(O.jsx)("span",{className:e.error,children:"Nh\u1eadp \u0111\xfang email c\u1ee7a b\u1ea1n"})]}),Object(O.jsxs)("div",{className:e.formField,children:[Object(O.jsx)("label",{className:e.label,children:"M\u1eadt kh\u1ea9u"}),Object(O.jsx)("input",Object(i.a)({name:"password",type:"password"},n("password",{required:!0,minLength:6}))),r.password&&"required"===r.password.type&&Object(O.jsx)("span",{className:e.error,children:"Nh\u1eadp m\u1eadt kh\u1ea9u"}),r.password&&"minLength"===r.password.type&&Object(O.jsx)("span",{className:e.error,children:"M\u1eadt kh\u1ea9u c\u1ea7n \xedt nh\u1ea5t 6 k\xed t\u1ef1"})]}),Object(O.jsxs)("div",{className:e.formField,children:[Object(O.jsx)("label",{className:e.label,children:"Nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u"}),Object(O.jsx)("input",Object(i.a)({name:"repassword",type:"password"},n("repassword",{validate:function(e){return e===g.current||"The passwords do not match"}}))),r.repassword&&Object(O.jsx)("span",{className:e.error,children:"M\u1eadt kh\u1ea9u kh\xf4ng tr\xf9ng kh\u1edbp"})]}),Object(O.jsx)("div",{className:e.formField,children:Object(O.jsx)("button",{className:e.submit,type:"submit",children:"\u0110\u0103ng k\xed t\xe0i kho\u1ea3n"})})]}),Object(O.jsx)("div",{ref:y,className:e.loading,children:Object(O.jsx)(b.a,{})}),C&&Object(O.jsx)(p.a,{typeIcon:"check",text:"\u0110\u0103ng k\xed t\xe0i kho\u1ea3n th\xe0nh c\xf4ng",onAgree:function(){return w.push("/")}}),R&&Object(O.jsx)(p.a,{typeIcon:"fail",text:"\u0110\u0103ng k\xed t\xe0i kho\u1ea3n th\u1ea5t b\u1ea1i",onAgree:function(){return q(!1)}})]})};var w=Object(a.a)((function(e){return{root:{display:"flex",alignItems:"center",height:"100vh","& img":{width:400,height:400}},banner:Object(r.a)({flex:2,backgroundColor:"#c9ddfd",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"},e.breakpoints.down("sm"),{display:"none"}),login:{flex:3,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",backgroundColor:"white","& h2":{}}}}));t.default=function(e){var t=w();return Object(O.jsxs)("div",{className:t.root,children:[Object(O.jsx)("div",{className:t.banner,children:Object(O.jsx)("img",{src:"https://i.ibb.co/R4cCHXL/Student-giving-test-to-teacher-2.webp",alt:"Student-giving-test-to-teacher-2",border:"0"})}),Object(O.jsx)("div",{className:t.login,children:Object(O.jsx)(g,{})})]})}}}]);
//# sourceMappingURL=30.1b7df8ff.chunk.js.map