(this["webpackJsonpcalendar-app"]=this["webpackJsonpcalendar-app"]||[]).push([[0],{237:function(e,t,n){},648:function(e,t,n){},656:function(e,t,n){},657:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(0),c=n(13),o=n.n(c),s=n(12),i=n(57),l=n(14),u=n(11),d=n.n(u),b=n(21),j="https://mern-calendarcapsab.herokuapp.com/api",m=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",a="".concat(j,"/").concat(e);return"GET"==n?fetch(a):fetch(a,{method:n,headers:{"Content-type":"application/json"},body:JSON.stringify(t)})},p=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET",a="".concat(j,"/").concat(e),r=localStorage.getItem("token")||"";return console.log(j,r),"GET"===n?fetch(a,{method:n,headers:{"x-token":r}}):fetch(a,{method:n,headers:{"Content-type":"application/json","x-token":r},body:JSON.stringify(t)})},f="[ui] Open modal",O="[ui] Close modal",h="[event] Set Active",v="[event] Add new",x="[event] Clear active event",g="[event] Event updated",y="[event] Event deleted",E="[event] Events loaded",N="[auth] Finish checking login state",w="[auth] Login",k="[auth] Logout",C="[lab] Labs loaded",S="[lab] Add new",D="[lab] Set Active",_="[lab] Lab updated",P="[lab] Lab deleted",I="[lab] Clear active lab",T="[user] Users loaded",L="[element] Element loaded",A=n(15),U=n.n(A),R=function(e){return{type:w,payload:e}},G=function(){return{type:k}},M=n(23),F=n(47),V=n(7),H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(r.useState)(e),n=Object(M.a)(t,2),a=n[0],c=n[1],o=function(){c(e)},s=function(e){var t=e.target;c(Object(V.a)(Object(V.a)({},a),{},Object(F.a)({},t.name,t.value)))};return[a,s,o]},J=(n(237),n(43)),q=n.n(J),B=function(){var e=Object(s.b)(),t=H({lEmail:"jajajajaime@gmail.com",lPassword:"1234Ma#23"}),n=Object(M.a)(t,2),r=n[0],c=n[1],o=H({rId:"",rEmail:"",rPassword:"",rName:"",rPassword1:"",rPassword2:""}),i=Object(M.a)(o,2),l=i[0],u=i[1],j=l.rId,p=l.rName,f=l.rEmail,O=l.rPassword1,h=l.rPassword2,v=r.lEmail,x=r.lPassword;return Object(a.jsx)("div",{className:"container login-container",children:Object(a.jsxs)("div",{className:"row",children:[Object(a.jsxs)("div",{className:"col-md-6 login-form-1",children:[Object(a.jsx)("h3",{children:"Ingreso"}),Object(a.jsxs)("form",{onSubmit:function(t){var n,a;(t.preventDefault(),q.a.isEmail(v))?e((n=v,a=x,function(){var e=Object(b.a)(d.a.mark((function e(t){var r,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m("auth",{email:n,password:a},"POST");case 2:return r=e.sent,e.next=5,r.json();case 5:c=e.sent,console.log(c),c.ok?(localStorage.setItem("token",c.token),localStorage.setItem("token-init-date",(new Date).getTime()),t(R({uid:c.uid,name:c.name}))):U.a.fire("Error",c.msg,"error"),console.log(c),console.log(n,a);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())):U.a.fire("Error","Ingrese un correo v\xe1lido","error")},children:[Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("input",{type:"text",className:"form-control",placeholder:"Correo",name:"lEmail",value:v,onChange:c})}),Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("input",{type:"password",className:"form-control",placeholder:"Contrase\xf1a",name:"lPassword",value:x,onChange:c})}),Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("input",{type:"submit",className:"btnSubmit",value:"Login"})})]})]}),Object(a.jsxs)("div",{className:"col-md-6 login-form-2",children:[Object(a.jsx)("h3",{children:"Registro"}),Object(a.jsxs)("form",{onSubmit:function(t){var n,a,r,c;(t.preventDefault(),O==h)?q.a.isEmpty(j)?U.a.fire("Error","Ingrese un Id","error"):q.a.isEmail(f)?q.a.isNumeric(p)||q.a.isEmpty(p)?U.a.fire("Error","El nombre no debe estar vac\xedo ni contener n\xfameros ni car\xe1cteres especiales","error"):e((n=j,a=f,r=O,c=p,function(){var e=Object(b.a)(d.a.mark((function e(t){var o,s;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("hiniiun"),e.next=4,m("auth/new",{idU:n,email:a,password:r,name:c,tipo:""},"POST");case 4:return o=e.sent,e.next=7,o.json();case 7:s=e.sent,console.log(o,s),s.ok?(localStorage.setItem("token",s.token),localStorage.setItem("token-init-date",(new Date).getTime()),t(R({uid:s.uid,name:s.name}))):null!=s.errors?U.a.fire("Error",s.errors.password.msg,"error"):U.a.fire("Error",s.msg,"error");case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())):U.a.fire("Error","Ingrese un correo v\xe1lido","error"):U.a.fire("Error","Las contrase\xf1as deben ser iguales","error")},children:[Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("input",{type:"number",className:"form-control",placeholder:"Id",name:"rId",value:j,onChange:u})}),Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("input",{type:"text",className:"form-control",placeholder:"Nombre",name:"rName",value:p,onChange:u})}),Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("input",{type:"email",className:"form-control",placeholder:"Correo",name:"rEmail",value:f,onChange:u})}),Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("input",{type:"password",className:"form-control",placeholder:"Contrase\xf1a",name:"rPassword1",value:O,onChange:u})}),Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("input",{type:"password",className:"form-control",placeholder:"Repita la contrase\xf1a",name:"rPassword2",value:h,onChange:u})}),Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("input",{type:"submit",className:"btnSubmit",value:"Crear cuenta"})})]})]})]})})},X=function(){var e=Object(s.c)((function(e){return e.auth})).name,t=Object(s.b)();return Object(a.jsxs)("div",{className:"navbar navbar-dark bg-dark mb-4",children:[Object(a.jsx)("span",{className:"navbar-brand",children:e}),Object(a.jsx)("div",{children:Object(a.jsx)(i.b,{to:"/laboratorios",className:"btn btn-outline-primary",children:"Laboratorios"})}),Object(a.jsx)("div",{children:Object(a.jsx)(i.b,{to:"/",className:"btn btn-outline-primary",children:"Pr\xe9stamos"})}),Object(a.jsxs)("button",{className:"btn btn-outline-danger",onClick:function(){t((function(e){localStorage.clear(),e(G())}))},children:[Object(a.jsx)("i",{className:"fas fa-sign-out-atl"}),Object(a.jsx)("span",{children:" Salir"})]})]})},z=n(140),K=n(18),Q=n.n(K),W=(n(317),n(318),{allDay:"Todo el d\xeda",previous:"<",next:">",today:"Hoy",month:"Mes",week:"Semana",day:"D\xeda",agenda:"Agenda",date:"Fecha",time:"Hora",event:"Evento",noEventsInRange:"No hay eventos en este rango",showMore:function(e){return"+ Ver m\xe1s (".concat(e,")")}}),Y=(n(319),function(e){var t=e.event,n=t.idUsuario,r=t.observaciones;return Object(a.jsxs)("div",{children:[Object(a.jsx)("span",{children:n}),Object(a.jsxs)("strong",{children:["- ",r]})]})}),Z=n(137),$=n.n(Z),ee=n(138),te=n.n(ee),ne=function(){return{type:f}},ae=function(){return{type:O}},re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.map((function(e){return Object(V.a)(Object(V.a)({},e),{},{fechaDevolucion:Q()(e.fechaDevolucion).toDate(),fechaPrestamo:Q()(e.fechaPrestamo).toDate(),start:Q()(e.fechaPrestamo).toDate(),end:Q()(e.fechaDevolucion).toDate(),title:e.observaciones})}))},ce=function(e){return{type:v,payload:e}},oe=function(e){return{type:E,payload:e}},se=function(){return{type:x}},ie=function(e){return{type:g,payload:e}},le=function(){return{type:y}},ue=function(e){return{type:T,payload:e}},de=function(e){return{type:L,payload:e}},be={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}},je=Q()().minutes(0).seconds(0).add(1,"hours"),me=je.clone().add(1,"hours"),pe={title:"",start:Q()().toDate(),end:Q()().add(2,"hours").toDate(),cantidad:"",idUsuario:"",idElemento:"",observaciones:"",fechaPrestamo:Q()().toDate(),fechaDevolucion:Q()().add(2,"hours").toDate(),user:{_id:"123",name:"fernando"}};$.a.setAppElement("#root");var fe=function(){var e=Object(s.c)((function(e){return e.ui})).modalOpen,t=Object(r.useState)(je.toDate()),n=Object(M.a)(t,2),c=(n[0],n[1]),o=Object(r.useState)(me.toDate()),i=Object(M.a)(o,2),l=(i[0],i[1]),u=Object(s.c)((function(e){return e.calendar})).activeEvent,j=Object(s.b)(),m=Object(r.useState)(pe),f=Object(M.a)(m,2),O=f[0],h=f[1],v=O.observaciones,x=O.cantidad,g=O.idUsuario,y=O.idElemento,E=O.fechaPrestamo,N=O.fechaDevolucion,w=Object(r.useState)(!0),k=Object(M.a)(w,2),C=k[0],S=k[1],D=Object(s.c)((function(e){return e.user})).users,_=Object(s.c)((function(e){return e.element})).elements,P=Object(r.useState)(!0),I=Object(M.a)(P,2);I[0],I[1];Object(r.useEffect)((function(){j(function(){var e=Object(b.a)(d.a.mark((function e(t){var n,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p("usuarios");case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,r=a.usuarios,console.log(r),t(ue(r)),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}()),j(function(){var e=Object(b.a)(d.a.mark((function e(t){var n,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p("elementos");case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,r=a.elementos,console.log(r),t(de(r)),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}()),u?(h(u),c(E),l(N)):h(pe)}),[u,h]);var T=function(e){var t=e.target;h(Object(V.a)(Object(V.a)({},O),{},Object(F.a)({},t.name,t.value)))},L=function(){j(ae()),j(se()),h(pe)};return Object(a.jsxs)($.a,{isOpen:e,onRequestClose:L,style:be,className:"modal",overlayClassName:"modal-fondo",closeTimeoutMS:200,children:[Object(a.jsxs)("h1",{children:[" ",u?"Editar Pr\xe9stamo":"Nuevo pr\xe9stamo"," "]}),Object(a.jsx)("hr",{}),Object(a.jsxs)("form",{className:"container",onSubmit:function(e){e.preventDefault();var t,n=Q()(E),a=Q()(N);n.isSameOrAfter(a)?U.a.fire("Error","La fecha de devoluci\xf3n debe de ser mayor a la de pr\xe9stamo","error"):x?g.trim().length<1||y.trim().length<1?U.a.fire("Error","Debe seleccionar un usuario y un elemento","error"):(j(u?(t=O,function(){var e=Object(b.a)(d.a.mark((function e(n){var a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p("prestamos/".concat(t._id),t,"PUT");case 3:return a=e.sent,e.next=6,a.json();case 6:r=e.sent,t.start=r.prestamo.fechaPrestamo,t.end=r.prestamo.fechaDevolucion,console.log(r),r.ok?n(ie(t)):U.a.fire("Error",r.msg,"error"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}()):function(e){return function(){var t=Object(b.a)(d.a.mark((function t(n,a){var r,c,o,s,i;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=a().auth,c=r.uid,o=r.name,t.prev=1,t.next=4,p("prestamos",e,"POST");case 4:return s=t.sent,t.next=7,s.json();case 7:(i=t.sent).ok&&(e._id=i.prestamo._id,e.start=i.prestamo.fechaPrestamo,e.end=i.prestamo.fechaDevolucion,e.user={_id:c,name:o},console.log(e),n(ce(e))),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),U()("Error","Llene todas las casillas obligatorias","error"),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e,n){return t.apply(this,arguments)}}()}(O)),S(!0),L()):S(!1)},children:[Object(a.jsxs)("div",{className:"form-group",children:[Object(a.jsx)("label",{children:"Usuario"}),Object(a.jsxs)("select",{name:"idUsuario",id:"idUsuario",className:"form-control",value:g,onChange:T,children:[Object(a.jsx)("option",{value:"",children:"-Seleccionar usuario-"}),D.map((function(e){return Object(a.jsx)("option",{value:e._id,children:e.name})}))]}),Object(a.jsx)("label",{children:"Elemento"}),Object(a.jsxs)("select",{name:"idElemento",id:"idElemento",className:"form-control",value:y,onChange:T,children:[Object(a.jsx)("option",{value:"",children:"-Seleccionar elemento--"}),_.map((function(e){return Object(a.jsx)("option",{value:e._id,children:e.nombre})}))]})]}),Object(a.jsxs)("div",{className:"form-group",children:[Object(a.jsx)("label",{children:"Fecha y hora del pr\xe9stamo"}),Object(a.jsx)(te.a,{onChange:function(e){c(e),h(Object(V.a)(Object(V.a)({},O),{},{fechaPrestamo:e}))},value:E,className:"form-control"})]}),Object(a.jsxs)("div",{className:"form-group",children:[Object(a.jsx)("label",{children:"Fecha y hora devoluci\xf3n"}),Object(a.jsx)(te.a,{onChange:function(e){l(e),h(Object(V.a)(Object(V.a)({},O),{},{fechaDevolucion:e}))},value:N,className:"form-control"})]}),Object(a.jsxs)("div",{className:"form-group",children:[Object(a.jsx)("label",{children:"Cantidad"}),Object(a.jsx)("input",{type:"number",className:"form-control ".concat(!C&&"is-invalid"),placeholder:"Cantidad",name:"cantidad",value:x,autoComplete:"off",onChange:T}),Object(a.jsx)("small",{id:"emailHelp",className:"form-text text-muted",children:"Observaciones"})]}),Object(a.jsx)("div",{className:"form-group",children:Object(a.jsx)("textarea",{type:"text",className:"form-control",placeholder:"Observaciones",rows:"2",name:"observaciones",value:v,onChange:T})}),Object(a.jsxs)("button",{type:"submit",className:"btn btn-outline-primary btn-block",children:[Object(a.jsx)("i",{className:"far fa-save"}),Object(a.jsx)("span",{children:" Guardar"})]})]})]})},Oe=function(){var e=Object(s.b)();return Object(a.jsx)("button",{className:"btn btn-primary fab",onClick:function(){e(ne())},children:Object(a.jsx)("i",{className:"fas fa-plus"})})},he=function(){var e=Object(s.b)();return Object(a.jsxs)("button",{className:"btn btn-danger fab-danger",onClick:function(){e(function(){var e=Object(b.a)(d.a.mark((function e(t,n){var a,r,c;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n().calendar.activeEvent._id,e.prev=1,e.next=4,p("prestamos/".concat(a),{},"DELETE");case 4:return r=e.sent,e.next=7,r.json();case 7:c=e.sent,console.log(c),c.ok?t(le()):U.a.fire("Error",c.msg,"error"),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t,n){return e.apply(this,arguments)}}())},children:[Object(a.jsx)("i",{className:"fas fa-trash"}),Object(a.jsx)("span",{children:" Borrar pr\xe9stamo"})]})};Q.a.locale("es");var ve=Object(z.b)(Q.a),xe=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.calendar})),n=t.events,c=t.activeEvent,o=Object(r.useState)(localStorage.getItem("lastView")||"month"),i=Object(M.a)(o,2),l=i[0],u=i[1],j=Object(s.c)((function(e){return e.auth})).uid;Object(r.useEffect)((function(){e(function(){var e=Object(b.a)(d.a.mark((function e(t){var n,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p("prestamos");case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,r=re(a.prestamos),t(oe(r)),console.log(r),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}())}),[e]);return Object(a.jsxs)("div",{className:"calendar-screen",children:[Object(a.jsx)(X,{}),Object(a.jsx)(z.a,{localizer:ve,events:n,startAccessor:"start",endAccessor:"end",style:{height:500},messages:W,eventPropGetter:function(e,t,n,a){return{style:{backgroundColor:j===e.idUsuario?"#367CF7":"#465660",borderRadius:"0px",opacity:.8,display:"block",color:"white"}}},components:{event:Y},onDoubleClickEvent:function(t){e(ne())},onSelectEvent:function(t){e({type:h,payload:t})},onView:function(e){u(e),localStorage.setItem("lastView",e)},view:l,selectable:!0,onSelectSlot:function(t){e(se())}}),Object(a.jsx)(Oe,{}),c&&Object(a.jsx)(he,{}),Object(a.jsx)(fe,{})]})},ge=(n.p,n(648),n(668)),ye=n(667),Ee=n(669),Ne=n(670),we=n(663),ke=n(664),Ce=n(665),Se=n(666),De=function(e){return{type:S,payload:e}},_e=function(e){return{type:C,payload:e}},Pe=function(e){return{type:_,payload:e}},Ie=function(e){return{type:P,id:e}},Te={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}},Le={nombre:"",descripcion:""},Ae=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.ui})).modalOpen,n=Object(r.useState)(Le),c=Object(M.a)(n,2),o=c[0],i=c[1],l=o.nombre,u=o.descripcion,j=Object(s.c)((function(e){return e.lab})),m=j.activeLab,f=(j.labId,Object(r.useState)(!0)),O=Object(M.a)(f,2),h=O[0],v=O[1],x=Object(r.useState)(!0),g=Object(M.a)(x,2),y=g[0],E=g[1],N=function(e){var t=e.target;i(Object(V.a)(Object(V.a)({},o),{},Object(F.a)({},t.name,t.value)))};Object(r.useEffect)((function(){i(m||Le)}),[m,i]);var w=function(){e(ae()),i(Le)};return Object(a.jsxs)(Ne.a,{isOpen:t,onRequestClose:w,style:Te,className:"modal",overlayClassName:"modal-fondo",closeTimeoutMS:200,children:[Object(a.jsx)(we.a,{children:Object(a.jsx)("div",{children:Object(a.jsxs)("h3",{children:[m?"Editar laboratorio":"Nuevo laboratorio"," "]})})}),Object(a.jsxs)(ke.a,{children:[Object(a.jsxs)(Ce.a,{children:[Object(a.jsx)("label",{children:"Nombre:"}),Object(a.jsx)("input",{className:"form-control ".concat(!h&&"is-invalid"),name:"nombre",type:"text",value:l,onChange:N})]}),Object(a.jsxs)(Ce.a,{children:[Object(a.jsx)("label",{children:"Descripcion:"}),Object(a.jsx)("input",{className:"form-control ".concat(!y&&"is-invalid"),name:"descripcion",type:"text",value:u,onChange:N})]})]}),Object(a.jsxs)(Se.a,{children:[Object(a.jsx)(ye.a,{color:"primary",onClick:function(t){return t.preventDefault(),q.a.isEmpty(l)?(U.a.fire("Error","No pueden haber campos vac\xedos, ingrese el nombre","error"),v(!1),void E(!0)):q.a.isEmpty(u)?(U.a.fire("Error","No pueden haber campos vac\xedos, ingrese la descripci\xf3n","error"),E(!1),void v(!0)):(e(m?(n=o,function(){var e=Object(b.a)(d.a.mark((function e(t){var a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log(n),e.next=4,p("labs/".concat(n._id),n,"PUT");case 4:return a=e.sent,e.next=7,a.json();case 7:(r=e.sent).ok?t(Pe(n)):U.a.fire("Error",r.msg,"error"),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()):function(e){return function(){var t=Object(b.a)(d.a.mark((function t(n){var a,r;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p("labs",e,"POST");case 3:return a=t.sent,t.next=6,a.json();case 6:r=t.sent,console.log(r),r.ok?(e._id=r.laboratorio._id,e.nombre=r.laboratorio.nombre,e.descripcion=r.laboratorio.descripcion,n(De(e)),console.log(e)):U.a.fire("Error",r.msg,"error"),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()}(o)),E(!0),v(!0),void w());var n},children:"Insertar"}),Object(a.jsx)(ye.a,{className:"btn btn-danger",onClick:w,children:"Cancelar"})]})]})},Ue=function(){var e=Object(s.c)((function(e){return e.lab})).labs,t=Object(s.b)();Object(r.useEffect)((function(){t(function(){var e=Object(b.a)(d.a.mark((function e(t){var n,a,r;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p("labs");case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,r=a.laboratorios,console.log(r),t(_e(r)),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}())}),[t]);var n=function(e){t(ne()),t({type:D,payload:e})},c=function(e){t(function(e){return function(){var t=Object(b.a)(d.a.mark((function t(n){var a,r,c;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=e._id,t.prev=1,t.next=4,p("labs/".concat(a),{},"DELETE");case 4:return r=t.sent,t.next=7,r.json();case 7:c=t.sent,console.log(c),c.ok?n(Ie(a)):U.a.fire("Error",c.msg,"error"),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(1),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[1,12]])})));return function(e){return t.apply(this,arguments)}}()}(e))};return Object(a.jsxs)("div",{class:"Div",children:[Object(a.jsx)(X,{}),Object(a.jsxs)(ge.a,{children:[Object(a.jsx)("br",{}),Object(a.jsx)(ye.a,{color:"success",onClick:function(e){t(ne()),t({type:I})},children:"Crear"}),Object(a.jsx)("br",{}),Object(a.jsx)("br",{}),Object(a.jsxs)(Ee.a,{children:[Object(a.jsx)("thead",{children:Object(a.jsxs)("tr",{children:[Object(a.jsx)("th",{children:"ID"}),Object(a.jsx)("th",{children:"Nombre"}),Object(a.jsx)("th",{children:"Descripci\xf3n"}),Object(a.jsx)("th",{children:"Acci\xf3n"})]})}),Object(a.jsx)("tbody",{children:e.map((function(e){return Object(a.jsxs)("tr",{children:[Object(a.jsx)("td",{children:e._id}),Object(a.jsx)("td",{children:e.nombre}),Object(a.jsx)("td",{children:e.descripcion}),Object(a.jsxs)("td",{children:[Object(a.jsx)(ye.a,{color:"primary",onClick:function(){return n(e)},children:"Editar"})," ",Object(a.jsx)(ye.a,{color:"danger",onClick:function(){return c(e)},children:"Eliminar"})]})]},e._id)}))})]})]}),Object(a.jsx)(Ae,{})]})},Re=n(96),Ge=function(e){var t=e.isAuthenticated,n=e.component,r=Object(Re.a)(e,["isAuthenticated","component"]);return Object(a.jsx)(l.b,Object(V.a)(Object(V.a)({},r),{},{component:function(e){return t?Object(a.jsx)(l.a,{to:"/"}):Object(a.jsx)(n,Object(V.a)({},e))}}))},Me=function(e){var t=e.isAuthenticated,n=e.component,r=Object(Re.a)(e,["isAuthenticated","component"]);return Object(a.jsx)(l.b,Object(V.a)(Object(V.a)({},r),{},{component:function(e){return t?Object(a.jsx)(n,Object(V.a)({},e)):Object(a.jsx)(l.a,{to:"/login"})}}))},Fe=function(){var e=Object(s.b)(),t=Object(s.c)((function(e){return e.auth})),n=t.checking,c=t.uid;return Object(r.useEffect)((function(){e(function(){var e=Object(b.a)(d.a.mark((function e(t){var n,a;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p("auth/renew");case 2:return n=e.sent,e.next=5,n.json();case 5:(a=e.sent).ok?(localStorage.setItem("token",a.token),localStorage.setItem("token-init-date",(new Date).getTime()),t(R({uid:a.uid,name:a.name}))):t({type:N});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[e]),console.log(n),console.log(c),n?Object(a.jsx)("h5",{children:"Espere..."}):Object(a.jsx)("div",{children:Object(a.jsx)(i.a,{children:Object(a.jsx)("div",{children:Object(a.jsxs)(l.d,{children:[Object(a.jsx)(Ge,{exact:!0,path:"/login",component:B,isAuthenticated:!!c}),Object(a.jsx)(Me,{exact:!0,path:"/",component:xe,isAuthenticated:!!c}),Object(a.jsx)(Me,{exact:!0,path:"/laboratorios",component:Ue,isAuthenticated:!!c}),Object(a.jsx)(l.a,{to:"/"})]})})})})},Ve={checking:!0},He=n(221),Je=n(48),qe={modalOpen:!1},Be=n(35),Xe={events:[{title:"Hoola",start:Q()().toDate(),end:Q()().add(2,"hours").toDate(),cantidad:"4",idUsuario:"",idElemento:"",observaciones:"",fechaPrestamo:Q()().toDate(),fechaDevolucion:Q()().add(2,"hours").toDate(),user:{_id:"123",name:"fernando"}}],activeEvent:null},ze={labs:[{_id:"",nombre:"",descripcion:""}],labId:"",activeLab:null},Ke={users:[{_id:"",idU:"",name:"",email:""}]},Qe={elements:[{_id:"",idElemento_:"",nombre:"",descripcion:"",categoria:"",laboratorio:"",proyecto:""}],activeElement:null},We=Object(Je.c)({ui:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:qe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f:return Object(V.a)(Object(V.a)({},e),{},{modalOpen:!0});case O:return Object(V.a)(Object(V.a)({},e),{},{modalOpen:!1});default:return e}},calendar:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Xe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:return Object(V.a)(Object(V.a)({},e),{},{activeEvent:t.payload});case v:case v:return Object(V.a)(Object(V.a)({},e),{},{events:[].concat(Object(Be.a)(e.events),[t.payload])});case E:return Object(V.a)(Object(V.a)({},e),{},{events:Object(Be.a)(t.payload)});case x:return Object(V.a)(Object(V.a)({},e),{},{activeEvent:null});case g:return Object(V.a)(Object(V.a)({},e),{},{events:e.events.map((function(e){return e._id===t.payload._id?t.payload:e}))});case y:return Object(V.a)(Object(V.a)({},e),{},{events:e.events.filter((function(t){return t._id!==e.activeEvent._id})),activeEvent:null});default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case w:return Object(V.a)(Object(V.a)(Object(V.a)({},e),t.payload),{},{checking:!1});case N:return Object(V.a)(Object(V.a)({},e),{},{checking:!1});case k:return{checking:!1};default:return e}},lab:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case C:return Object(V.a)(Object(V.a)({},e),{},{labs:Object(Be.a)(t.payload)});case S:return Object(V.a)(Object(V.a)({},e),{},{labs:[].concat(Object(Be.a)(e.labs),[t.payload])});case D:return Object(V.a)(Object(V.a)({},e),{},{activeLab:t.payload,labId:t.payload._id});case I:return Object(V.a)(Object(V.a)({},e),{},{activeLab:null});case _:return Object(V.a)(Object(V.a)({},e),{},{labs:e.labs.map((function(e){return e._id===t.payload._id?t.payload:e}))});case P:return Object(V.a)(Object(V.a)({},e),{},{labs:e.labs.filter((function(e){return e._id!==t.id})),labId:null,activeLab:null});default:return e}},user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ke,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case T:return Object(V.a)(Object(V.a)({},e),{},{users:Object(Be.a)(t.payload)});default:return e}},element:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Qe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case L:return Object(V.a)(Object(V.a)({},e),{},{elements:Object(Be.a)(t.payload)});default:return e}}}),Ye="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Je.d,Ze=Object(Je.e)(We,Ye(Object(Je.a)(He.a))),$e=function(){return Object(a.jsx)(s.a,{store:Ze,children:Object(a.jsx)(Fe,{})})};n(656);o.a.render(Object(a.jsx)($e,{}),document.getElementById("root"))}},[[657,1,2]]]);
//# sourceMappingURL=main.f3abddfd.chunk.js.map