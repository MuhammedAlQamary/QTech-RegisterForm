import './polyfills.server.mjs';
import{c as h}from"./chunk-6T4Y46MR.mjs";import{Ja as u,Ka as d,Pa as C,Qa as g,Ra as v,Va as A,W as m,X as a,Y as f,ba as s,ea as n,m as e,na as c,ua as l}from"./chunk-QDCV3AHQ.mjs";var p=class o{title="QTech-RegisterForm";static \u0275fac=function(t){return new(t||o)};static \u0275cmp=e({type:o,selectors:[["app-root"]],standalone:!0,features:[n],decls:1,vars:0,template:function(t,y){t&1&&f(0,"router-outlet")},dependencies:[v]})};var r=class o{static \u0275fac=function(t){return new(t||o)};static \u0275cmp=e({type:o,selectors:[["app-notfound"]],standalone:!0,features:[n],decls:2,vars:0,template:function(t,y){t&1&&(m(0,"p"),s(1,"notfound works!"),a())}})};var x=[{path:"",redirectTo:"/auth",pathMatch:"full"},{path:"auth",loadChildren:()=>import("./chunk-DR2ODKMZ.mjs").then(o=>o.authRoutes)},{path:"**",component:r}];var N={providers:[c({eventCoalescing:!0}),A(x),g(),u(d())]};var F={providers:[h()]},R=l(N,F);var M=()=>C(p,R),U=M;export{U as a};
