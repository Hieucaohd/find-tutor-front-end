(this.webpackJsonpbaseapp=this.webpackJsonpbaseapp||[]).push([[23],{118:function(e,t,n){"use strict";var o=n(100),c=(n(1),n(122)),a=n(282),i=n(2);var r=Object(o.a)({root:{position:"fixed",top:0,left:0,right:0,bottom:0,display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.5)","z-index":"899","& svg":{fontSize:80}},modal:{width:"308px",height:"172px",backgroundColor:"white",borderRadius:"4px",position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",padding:8},text:{fontSize:"16px",margin:0},buttonGroup:{"& button":{border:"none",fontSize:"16px",opacity:"0.6",margin:"0 8px",padding:"4px 8px",borderRadius:4,color:"white","&:hover":{cursor:"pointer",opacity:"1"}}},delete:{color:"red"},check:{color:"#00AA85"},agree:{backgroundColor:"#0061FF"},disagree:{backgroundColor:"#AAAAAA"}});t.a=function(e){var t=e.typeIcon,n=e.text,o=e.onAgree,s=void 0===o?null:o,l=e.onDisagree,d=void 0===l?null:l,u=r();return Object(i.jsx)("div",{className:u.root,children:Object(i.jsxs)(a.a.div,{animate:{scale:1.1},transition:{duration:.1},className:u.modal,children:["delete"===t&&Object(i.jsx)(c.a,{className:u.delete}),"check"===t&&Object(i.jsx)(c.c,{className:u.check}),"fail"===t&&Object(i.jsx)(c.b,{className:u.delete}),Object(i.jsx)("p",{className:u.text,children:n}),Object(i.jsxs)("div",{className:u.buttonGroup,children:[s&&Object(i.jsx)("button",{className:u.agree,onClick:function(){s()},children:"Ti\u1ebfp t\u1ee5c"}),d&&Object(i.jsx)("button",{className:u.disagree,onClick:function(){d()},children:"H\u1ee7y"})]})]})})}},142:function(e,t,n){},279:function(e,t,n){"use strict";n.r(t);var o=n(19),c=n(118),a=n(1),i=n(14),r=(n(142),n(2));t.default=function(e){var t=e.onDelete,n=e.roomAddress,s=(e.typeParent,Object(a.useState)(!1)),l=Object(o.a)(s,2),d=l[0],u=l[1];return Object(r.jsxs)("div",{className:"button",children:[Object(r.jsx)("button",{className:"button__delete",onClick:function(){return u(!0)},children:"X\xf3a"}),Object(r.jsx)("button",{style:{border:"none"},children:Object(r.jsx)(i.b,{to:n,className:"button__detail",children:"Xem chi ti\u1ebft"})}),d&&Object(r.jsx)(c.a,{typeIcon:"delete",text:"X\xf3a ph\xf2ng n\xe0y kh\u1ecfi danh s\xe1ch ?",onAgree:function(){t&&(t(),u(!1))},onDisagree:function(){return u(!1)}})]})}}}]);
//# sourceMappingURL=23.270fca31.chunk.js.map