(this.webpackJsonpbaseapp=this.webpackJsonpbaseapp||[]).push([[24],{117:function(e,t,n){"use strict";var r=n(99),s=(n(1),n(121)),a=n(282),c=n(2);var o=Object(r.a)({root:{position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)","z-index":"899","& svg":{fontSize:80}},modal:{width:"308px",height:"172px",backgroundColor:"white",borderRadius:"4px",position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",padding:8},text:{fontSize:"16px",margin:0},buttonGroup:{"& button":{border:"none",fontSize:"16px",opacity:"0.6",margin:"0 8px",padding:"4px 8px",borderRadius:4,color:"white","&:hover":{cursor:"pointer",opacity:"1"}}},delete:{color:"red"},check:{color:"#00AA85"},agree:{backgroundColor:"#0061FF"},disagree:{backgroundColor:"#AAAAAA"}});t.a=function(e){var t=e.typeIcon,n=e.text,r=e.onAgree,i=void 0===r?null:r,u=e.onDisagree,l=void 0===u?null:u,d=o();return Object(c.jsx)("div",{className:d.root,children:Object(c.jsxs)(a.a.div,{animate:{scale:1.1},transition:{duration:.1},className:d.modal,children:["delete"===t&&Object(c.jsx)(s.a,{className:d.delete}),"check"===t&&Object(c.jsx)(s.c,{className:d.check}),"fail"===t&&Object(c.jsx)(s.b,{className:d.delete}),Object(c.jsx)("p",{className:d.text,children:n}),Object(c.jsxs)("div",{className:d.buttonGroup,children:[i&&Object(c.jsx)("button",{className:d.agree,onClick:function(){i()},children:"Ti\u1ebfp t\u1ee5c"}),l&&Object(c.jsx)("button",{className:d.disagree,onClick:function(){l()},children:"H\u1ee7y"})]})]})})}},144:function(e,t,n){"use strict";n.d(t,"e",(function(){return u})),n.d(t,"d",(function(){return l})),n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return p})),n.d(t,"a",(function(){return b}));var r=n(4),s=n.n(r),a=n(6),c=n(20),o=c.server_name,i=c.token_prefix,u=function(){var e=Object(a.a)(s.a.mark((function e(t){var n,r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.newTutorInfo,r=t.token,a=t.id,e.prev=1,e.next=4,fetch("".concat(o,"/findTutor/tutorDetail/").concat(a),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"".concat(i," ").concat(r)},body:JSON.stringify(n)});case 4:return e.abrupt("return",!0);case 7:return e.prev=7,e.t0=e.catch(1),console.log("Failed to update tutor's profile: ",e.t0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(a.a)(s.a.mark((function e(t){var n,r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.newTutorInfo,r=t.token,a=t.id,e.prev=1,e.next=4,fetch("".concat(o,"/findTutor/parentDetail/").concat(a),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"".concat(i," ").concat(r)},body:JSON.stringify(n)});case 4:return e.abrupt("return",!0);case 7:return e.prev=7,e.t0=e.catch(1),console.log("Failed to update parent's profile: ",e.t0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(a.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.token,r=t.newLink,e.prev=1,e.next=4,fetch("".concat(o,"/auth/updateMultipleLink/"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"".concat(i," ").concat(n)},body:JSON.stringify(r)});case 4:return e.abrupt("return",!0);case 7:return e.prev=7,e.t0=e.catch(1),console.log("Failed to update user's link: ",e.t0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}(),p=function(e){return{first_name:e.slice(0,e.indexOf(" ")),last_name:e.slice(e.indexOf(" ")+1)}},b=function(){var e=Object(a.a)(s.a.mark((function e(t){var n,r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.token,r=t.oldPassword,a=t.newPassword,e.prev=1,e.next=4,fetch("".concat(o,"/auth/changePassword/"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"".concat(i," ").concat(n)},body:JSON.stringify({old_password:r,new_password:a})});case 4:return e.abrupt("return",!0);case 7:return e.prev=7,e.t0=e.catch(1),console.log("Failed to change password: ",e.t0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t){return e.apply(this,arguments)}}()},258:function(e,t,n){"use strict";n.r(t);var r=n(4),s=n.n(r),a=n(6),c=n(19),o=n(21),i=n(117),u=n(10),l=n(1),d=n(11),p=n(144),b=n(22),j=n(125),h=n(53),f=n(151),x=n(2);var O=function(e){var t=e.onClose,n=e.onSubmit,r=Object(j.a)(),s=r.register,a=r.formState.errors,c=r.handleSubmit,o=r.watch,i=Object(l.useRef)({});return i.current=o("newpassword",""),Object(x.jsxs)("div",{className:"settings__password",children:[Object(x.jsx)("div",{className:"settings__overlay",onClick:function(){return t()}}),Object(x.jsxs)("form",{className:"settings__password__main",onSubmit:c((function(e){var t=e.oldpassword,r=e.newpassword;n&&n({oldPassword:t,newPassword:r})})),children:[Object(x.jsx)(h.b,{className:"settings__close",onClick:function(){return t()}}),Object(x.jsxs)("label",{style:{fontWeight:700},children:["\u0110\u1ed5i m\u1eadt kh\u1ea9u ",Object(x.jsx)(f.b,{})]}),Object(x.jsxs)("div",{style:{padding:"12px 16px"},children:[Object(x.jsxs)("div",{className:"settings__field",style:{width:240},children:[Object(x.jsx)("label",{children:"M\u1eadt kh\u1ea9u c\u0169"}),Object(x.jsx)("input",Object(b.a)({type:"password"},s("oldpassword",{required:!0,minLength:6}))),a.oldpassword&&Object(x.jsx)("span",{className:"settings__field__error",children:"M\u1eadt kh\u1ea9u c\u1ea7n \xedt nh\u1ea5t 6 k\xed t\u1ef1"})]}),Object(x.jsxs)("div",{className:"settings__field",children:[Object(x.jsx)("label",{children:"M\u1eadt kh\u1ea9u m\u1edbi"}),Object(x.jsx)("input",Object(b.a)({type:"password"},s("newpassword",{required:!0,minLength:6}))),a.newpassword&&Object(x.jsx)("span",{className:"settings__field__error",children:"M\u1eadt kh\u1ea9u m\u1edbi c\u1ea7n \xedt nh\u1ea5t 6 k\xed t\u1ef1"})]}),Object(x.jsxs)("div",{className:"settings__field",children:[Object(x.jsx)("label",{children:"Nh\u1eadp l\u1ea1i m\u1eadt kh\u1ea9u"}),Object(x.jsx)("input",Object(b.a)({type:"password"},s("renewpassword",{validate:function(e){return e===i.current||"The passwords do not match"}}))),a.renewpassword&&Object(x.jsx)("span",{className:"settings__field__error",children:"M\u1eadt kh\u1ea9u kh\xf4ng tr\xf9ng kh\u1edbp"})]}),Object(x.jsx)("button",{type:"submit",children:"L\u01b0u"})]})]})]})};t.default=function(e){var t=Object(d.c)(u.l),n=Object(d.c)(u.e),r=Object(l.useState)(!1),b=Object(c.a)(r,2),j=b[0],h=b[1],f=Object(l.useState)(!1),m=Object(c.a)(f,2),w=m[0],g=m[1],v=Object(d.c)(u.i),k=Object(l.useState)(!1),_=Object(c.a)(k,2),y=_[0],N=_[1],C=Object(l.useState)(!1),S=Object(c.a)(C,2),A=S[0],T=S[1],P=function(){var e=Object(a.a)(s.a.mark((function e(t){var n,r,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.oldPassword,r=t.newPassword,g(!0),e.next=4,Object(p.a)({token:v,oldPassword:n,newPassword:r});case 4:a=e.sent,g(!1),a?N(!0):T(!0);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{className:"settings__account",children:[Object(x.jsxs)("div",{className:"settings__field",children:[Object(x.jsx)("label",{children:"T\xean t\xe0i kho\u1ea3n"}),Object(x.jsx)("input",{type:"text",disabled:!0,defaultValue:t})]}),Object(x.jsxs)("div",{className:"settings__field",children:[Object(x.jsx)("label",{children:"Email"}),Object(x.jsx)("input",{type:"text",disabled:!0,defaultValue:n})]}),Object(x.jsxs)("div",{className:"settings__field",children:[Object(x.jsx)("label",{children:"M\u1eadt kh\u1ea9u"}),Object(x.jsx)("button",{onClick:function(){return h(!0)},children:"\u0110\u1ed5i m\u1eadt kh\u1ea9u"})]}),j&&Object(x.jsx)(O,{onClose:function(){return h(!1)},onSubmit:P}),w&&Object(x.jsx)(o.a,{}),y&&Object(x.jsx)(i.a,{typeIcon:"check",text:"\u0110\u1ed5i m\u1eadt kh\u1ea9u th\xe0nh c\xf4ng",onAgree:function(){h(!1),N(!1)}}),A&&Object(x.jsx)(i.a,{typeIcon:"fail",text:"\u0110\u1ed5i m\u1eadt kh\u1ea9u kh\xf4ng th\xe0nh c\xf4ng",onAgree:function(){return T(!1)}})]})}}}]);
//# sourceMappingURL=24.f516e60d.chunk.js.map