(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var r=t(14),c=t.n(r),o=t(3),u=t(1),a=t(4),i=t.n(a),s="/api/persons",d=function(){return i.a.get(s).then((function(e){if(200===e.status)return e.data}))},j=function(e){return i.a.post(s,e).then((function(e){return e.data}))},b=function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},l=function(e,n){return i.a.put("".concat(s,"/").concat(n),e).then((function(e){return e.data}))},f=t(0),h=function(e){var n=e.person,t=e.removeBtn;return Object(f.jsxs)("div",{children:[n.name," ",n.number,Object(f.jsx)("button",{onClick:function(){return t(n.id)},children:"delete"})]})},m=function(e){var n=e.personToShow,t=e.removeBtn;return Object(f.jsx)("div",{children:n.map((function(e,n){return Object(f.jsx)(h,{person:e,removeBtn:t},n)}))})},O=function(e){var n=e.newSearch,t=e.setSearch;return Object(f.jsxs)("div",{children:["filter shown with",Object(f.jsx)("input",{value:n,onChange:function(e){return t(e.target.value)}})]})},v=function(e){var n=e.addPerson,t=e.newName,r=e.newNumber,c=e.setNewName,o=e.setNewNumber;return Object(f.jsx)("div",{children:Object(f.jsxs)("form",{onSubmit:n,children:[Object(f.jsxs)("div",{children:["name: ",Object(f.jsx)("input",{value:t,onChange:function(e){return c(e.target.value)}})]}),Object(f.jsxs)("div",{children:["number: ",Object(f.jsx)("input",{value:r,onChange:function(e){return o(e.target.value)}})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})})},p=function(e){var n=e.message,t=e.className;return null===n?null:Object(f.jsx)("div",{className:t,children:n})},w=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1];Object(u.useEffect)((function(){d().then((function(e){r(e)}))}),[]);var c=Object(u.useState)(""),a=Object(o.a)(c,2),i=a[0],s=a[1],h=Object(u.useState)(""),w=Object(o.a)(h,2),x=w[0],N=w[1],g=Object(u.useState)(""),S=Object(o.a)(g,2),k=S[0],C=S[1],B=Object(u.useState)(null),T=Object(o.a)(B,2),y=T[0],E=T[1],P=Object(u.useState)("error green"),A=Object(o.a)(P,2),D=A[0],I=A[1],J=k?t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())})):t;return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(p,{message:y,className:D}),Object(f.jsx)(O,{search:k,setSearch:C}),Object(f.jsx)("h3",{children:"Add a new"}),Object(f.jsx)(v,{addPerson:function(e){e.preventDefault();var n=t.filter((function(e){return e.name===x})),c={name:x,number:i};n.length>0?window.confirm("".concat(x," is already added to phonebook, replace the old number with a new one?"))&&(l(c,n[0].id).then((function(e){r(t.map((function(n){return n.name===e.name?e:n})))})).catch((function(e){console.log(e)})),N(""),s("")):(j(c).then((function(e){E("Added ".concat(e.name)),r(t.concat(e)),setTimeout((function(){E(null)}),2e3)})).catch((function(e){console.log(e),E("Error"),setTimeout((function(){E(null)}),2e3)})),N(""),s(""))},newName:x,newNumber:i,setNewName:N,setNewNumber:s}),Object(f.jsx)("h3",{children:"Numbers"}),Object(f.jsx)(m,{personToShow:J,removeBtn:function(e){var n=t.find((function(n){return n.id===e}));n.id>0&&window.confirm("Delete ".concat(n.name,"?"))&&b(n.id).then((function(n){r(t.filter((function(n){return n.id!==e})))})).catch((function(c){I("error red"),E("Information of ".concat(n.name," has already been removed from server")),r(t.filter((function(n){return n.id!==e}))),setTimeout((function(){E(null),I("error green")}),2e3)}))}})]})};t(38);c.a.render(Object(f.jsx)(w,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.70032eef.chunk.js.map