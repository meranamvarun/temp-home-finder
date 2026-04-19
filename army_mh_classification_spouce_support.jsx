import { useState, useMemo } from "react";

// ── FLIGHT TEMPLATES ─────────────────────────────────────────────────────────
const mk=(v,fa,dy,av)=>({v,fa,dy,av});
const jmu=()=>({BLR:mk("Direct/DEL","₹7-12k",true,9500),MAA:mk("DEL","₹8-14k",true,11000),COK:mk("DEL","₹9-15k",true,12000),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("DEL","₹5-9k",true,7000),HYD:mk("DEL","₹7-13k",true,10000),BOM:mk("Direct/DEL","₹5-10k",true,7500),PNQ:mk("DEL","₹6-11k",true,8500)});
const sxr=()=>({BLR:mk("DEL","₹8-14k",true,11000),MAA:mk("DEL","₹9-15k",true,12000),COK:mk("DEL","₹10-16k",true,13000),DEL:mk("Direct","₹4-8k",true,6000),CCU:mk("DEL","₹6-10k",true,8000),HYD:mk("DEL","₹8-14k",true,11000),BOM:mk("Direct/DEL","₹6-12k",true,9000),PNQ:mk("DEL","₹7-13k",true,10000)});
const del=()=>({BLR:mk("Direct","₹4-8k",true,6000),MAA:mk("Direct","₹4-8k",true,6000),COK:mk("Direct","₹5-9k",true,7000),DEL:mk("—","—",true,0),CCU:mk("Direct","₹4-7k",true,5500),HYD:mk("Direct","₹4-7k",true,5500),BOM:mk("Direct","₹3-7k",true,5000),PNQ:mk("Direct","₹4-8k",true,6000)});
const pnq=()=>({BLR:mk("Direct","₹3-7k",true,5000),MAA:mk("Direct","₹4-8k",true,6000),COK:mk("Direct","₹4-8k",true,6000),DEL:mk("Direct","₹4-8k",true,6000),CCU:mk("Direct","₹5-9k",true,7000),HYD:mk("Direct","₹3-6k",true,4500),BOM:mk("Direct","₹2-4k",true,3000),PNQ:mk("—","—",true,0)});
const lko=()=>({BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("Direct/DEL","₹6-11k",true,8500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("Direct","₹4-7k",true,5500),HYD:mk("Direct","₹5-9k",true,7000),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("Direct","₹5-9k",true,7000)});
const ccu=()=>({BLR:mk("Direct","₹4-8k",true,6000),MAA:mk("Direct","₹4-8k",true,6000),COK:mk("Direct","₹5-10k",true,7500),DEL:mk("Direct","₹4-7k",true,5500),CCU:mk("—","—",true,0),HYD:mk("Direct","₹4-8k",true,6000),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("Direct","₹5-9k",true,7000)});
const gau=()=>({BLR:mk("Direct","₹5-10k",true,7500),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("Direct/CCU","₹6-12k",true,9000),DEL:mk("Direct","₹4-8k",true,6000),CCU:mk("Direct","₹3-5k",true,4000),HYD:mk("Direct","₹5-10k",true,7500),BOM:mk("Direct","₹5-10k",true,7500),PNQ:mk("DEL/CCU","₹6-11k",true,8500)});
const ixb=()=>({BLR:mk("Direct","₹6-12k",true,9000),MAA:mk("Direct/CCU","₹7-13k",true,10000),COK:mk("CCU","₹8-15k",true,11500),DEL:mk("Direct","₹4-8k",true,6000),CCU:mk("Direct","₹3-6k",true,4500),HYD:mk("Direct/CCU","₹6-12k",true,9000),BOM:mk("Direct","₹5-10k",true,7500),PNQ:mk("CCU","₹6-11k",true,8500)});
const ixc=()=>({BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("Direct/DEL","₹6-11k",true,8500),COK:mk("DEL","₹7-12k",true,9500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("Direct","₹5-8k",true,6500),HYD:mk("Direct/DEL","₹5-10k",true,7500),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("Direct/DEL","₹5-9k",true,7000)});
const amd=()=>({BLR:mk("Direct","₹4-8k",true,6000),MAA:mk("Direct","₹5-9k",true,7000),COK:mk("Direct","₹5-9k",true,7000),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("Direct","₹5-9k",true,7000),HYD:mk("Direct","₹4-7k",true,5500),BOM:mk("Direct","₹2-5k",true,3500),PNQ:mk("Direct","₹3-6k",true,4500)});
const jai=()=>({BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("Direct/DEL","₹6-11k",true,8500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("Direct","₹5-8k",true,6500),HYD:mk("Direct","₹4-8k",true,6000),BOM:mk("Direct","₹3-6k",true,4500),PNQ:mk("Direct","₹4-7k",true,5500)});
const pat=()=>({BLR:mk("Direct","₹5-10k",true,7500),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("DEL/CCU","₹7-12k",true,9500),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("Direct","₹3-5k",true,4000),HYD:mk("Direct","₹5-9k",true,7000),BOM:mk("Direct","₹5-9k",true,7000),PNQ:mk("Direct","₹5-9k",true,7000)});
const maa=()=>({BLR:mk("Direct","₹2-5k",true,3500),MAA:mk("—","—",true,0),COK:mk("Direct","₹2-5k",true,3500),DEL:mk("Direct","₹4-8k",true,6000),CCU:mk("Direct","₹4-8k",true,6000),HYD:mk("Direct","₹2-5k",true,3500),BOM:mk("Direct","₹3-7k",true,5000),PNQ:mk("Direct","₹4-8k",true,6000)});
const hyd=()=>({BLR:mk("Direct","₹2-5k",true,3500),MAA:mk("Direct","₹2-5k",true,3500),COK:mk("Direct","₹3-6k",true,4500),DEL:mk("Direct","₹4-7k",true,5500),CCU:mk("Direct","₹4-8k",true,6000),HYD:mk("—","—",true,0),BOM:mk("Direct","₹3-6k",true,4500),PNQ:mk("Direct","₹3-6k",true,4500)});
const nag=()=>({BLR:mk("Direct","₹4-8k",true,6000),MAA:mk("Direct","₹5-9k",true,7000),COK:mk("DEL/BOM","₹6-11k",true,8500),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("Direct","₹4-7k",true,5500),HYD:mk("Direct","₹3-6k",true,4500),BOM:mk("Direct","₹3-6k",true,4500),PNQ:mk("Direct","₹4-7k",true,5500)});
const deh=()=>({BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("DEL","₹6-11k",true,8500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("Direct","₹5-8k",true,6500),HYD:mk("Direct","₹5-9k",true,7000),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("DEL","₹5-9k",true,7000)});
const bho=()=>({BLR:mk("Direct","₹4-8k",true,6000),MAA:mk("Direct","₹5-9k",true,7000),COK:mk("DEL/BOM","₹6-11k",true,8500),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("Direct","₹5-8k",true,6500),HYD:mk("Direct","₹4-7k",true,5500),BOM:mk("Direct","₹3-6k",true,4500),PNQ:mk("Direct","₹4-7k",true,5500)});
const gwl=()=>({BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("DEL","₹6-11k",true,8500),COK:mk("DEL","₹7-12k",true,9500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("DEL","₹5-8k",true,6500),HYD:mk("Direct","₹4-8k",true,6000),BOM:mk("Direct","₹4-7k",true,5500),PNQ:mk("DEL","₹5-9k",true,7000)});
const jab=()=>({BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("DEL/BOM","₹7-12k",true,9500),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("Direct","₹5-8k",true,6500),HYD:mk("Direct","₹4-8k",true,6000),BOM:mk("Direct","₹4-7k",true,5500),PNQ:mk("Direct","₹5-8k",true,6500)});
const vns=()=>({BLR:mk("Direct","₹5-10k",true,7500),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("DEL","₹6-12k",true,9000),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("Direct","₹4-6k",true,5000),HYD:mk("Direct","₹5-9k",true,7000),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("Direct","₹5-9k",true,7000)});
const blg=()=>({BLR:mk("Direct","₹3-6k",true,4500),MAA:mk("Direct","₹4-7k",true,5500),COK:mk("Direct","₹4-7k",true,5500),DEL:mk("Direct","₹5-9k",true,7000),CCU:mk("Direct","₹5-9k",true,7000),HYD:mk("Direct","₹3-6k",true,4500),BOM:mk("Direct","₹3-6k",true,4500),PNQ:mk("Direct","₹3-6k",true,4500)});
const jdh=()=>({BLR:mk("Direct","₹5-10k",true,7500),MAA:mk("Direct","₹6-11k",true,8500),COK:mk("DEL","₹7-12k",true,9500),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("DEL","₹5-9k",true,7000),HYD:mk("Direct","₹5-9k",true,7000),BOM:mk("Direct","₹4-7k",true,5500),PNQ:mk("Direct","₹5-8k",true,6500)});
const ran=()=>({BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("Direct","₹5-9k",true,7000),COK:mk("DEL/CCU","₹7-12k",true,9500),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("Direct","₹3-5k",true,4000),HYD:mk("Direct","₹5-9k",true,7000),BOM:mk("Direct","₹5-9k",true,7000),PNQ:mk("Direct","₹5-9k",true,7000)});
const imf=()=>({BLR:mk("Direct/CCU","₹10-16k",true,13000),MAA:mk("CCU","₹9-15k",true,12000),COK:mk("CCU/DEL","₹11-18k",false,14500),DEL:mk("Direct","₹6-11k",true,8500),CCU:mk("Direct","₹4-7k",true,5500),HYD:mk("DEL/CCU","₹8-15k",true,11500),BOM:mk("DEL/CCU","₹8-15k",true,11500),PNQ:mk("DEL","₹9-16k",true,12500)});
const dib=()=>({BLR:mk("Direct/DEL","₹8-13k",true,10500),MAA:mk("CCU","₹8-14k",true,11000),COK:mk("DEL/CCU","₹10-16k",false,13000),DEL:mk("Direct","₹5-9k",true,7000),CCU:mk("Direct","₹4-7k",true,5500),HYD:mk("DEL/CCU","₹8-14k",true,11000),BOM:mk("DEL","₹7-13k",true,10000),PNQ:mk("DEL","₹8-14k",true,11000)});
const dmu=()=>({BLR:mk("CCU/GAU","₹9-15k",true,12000),MAA:mk("CCU","₹8-14k",true,11000),COK:mk("CCU","₹10-17k",false,13500),DEL:mk("Direct/GAU","₹5-10k",true,7500),CCU:mk("Direct","₹3-6k",true,4500),HYD:mk("CCU","₹8-14k",true,11000),BOM:mk("CCU/DEL","₹7-13k",true,10000),PNQ:mk("CCU","₹9-15k",true,12000)});
const ixa=()=>({BLR:mk("CCU","₹8-14k",true,11000),MAA:mk("CCU","₹8-13k",true,10500),COK:mk("CCU","₹10-16k",false,13000),DEL:mk("Direct","₹5-9k",true,7000),CCU:mk("Direct","₹3-5k",true,4000),HYD:mk("CCU","₹7-13k",true,10000),BOM:mk("CCU","₹7-13k",true,10000),PNQ:mk("CCU","₹8-14k",true,11000)});
const ixs=()=>({BLR:mk("CCU/GAU","₹9-15k",true,12000),MAA:mk("CCU","₹8-14k",true,11000),COK:mk("CCU","₹10-16k",false,13000),DEL:mk("Direct/CCU","₹5-10k",true,7500),CCU:mk("Direct","₹3-6k",true,4500),HYD:mk("CCU","₹8-14k",true,11000),BOM:mk("CCU","₹8-14k",true,11000),PNQ:mk("CCU","₹9-15k",true,12000)});
const atq=()=>({BLR:mk("Direct","₹6-11k",true,8500),MAA:mk("DEL","₹7-13k",true,10000),COK:mk("DEL","₹8-14k",true,11000),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("Direct","₹5-8k",true,6500),HYD:mk("DEL","₹6-11k",true,8500),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("DEL","₹6-10k",true,8000)});
const dhm=()=>({BLR:mk("DEL","₹7-12k",false,9500),MAA:mk("DEL","₹8-13k",false,10500),COK:mk("DEL","₹9-14k",false,11500),DEL:mk("Direct","₹4-7k",true,5500),CCU:mk("DEL","₹6-9k",false,7500),HYD:mk("DEL","₹7-12k",false,9500),BOM:mk("DEL","₹6-10k",false,8000),PNQ:mk("DEL","₹7-11k",false,9000)});
const jsa=()=>({BLR:mk("DEL/JAI","₹7-13k",true,10000),MAA:mk("DEL","₹8-14k",true,11000),COK:mk("DEL","₹9-15k",false,12000),DEL:mk("Direct","₹4-8k",true,6000),CCU:mk("DEL","₹6-10k",true,8000),HYD:mk("DEL","₹7-13k",true,10000),BOM:mk("Direct/DEL","₹5-10k",true,7500),PNQ:mk("DEL","₹7-12k",true,9500)});
const bkb=()=>({BLR:mk("DEL/JAI","₹8-14k",false,11000),MAA:mk("DEL","₹9-15k",false,12000),COK:mk("DEL","₹10-16k",false,13000),DEL:mk("JAI","₹4-8k",true,6000),CCU:mk("DEL","₹6-10k",false,8000),HYD:mk("DEL","₹7-13k",false,10000),BOM:mk("DEL/JAI","₹5-10k",true,7500),PNQ:mk("DEL","₹7-12k",false,9500)});
const tez=()=>({BLR:mk("CCU","₹9-14k",false,11500),MAA:mk("CCU","₹8-13k",false,10500),COK:mk("CCU","₹10-16k",false,13000),DEL:mk("GAU","₹6-10k",false,8000),CCU:mk("GAU","₹5-8k",false,6500),HYD:mk("CCU","₹8-14k",false,11000),BOM:mk("CCU","₹8-14k",false,11000),PNQ:mk("CCU","₹9-15k",false,12000)});
const bup=()=>({BLR:mk("DEL","₹8-14k",false,11000),MAA:mk("DEL","₹9-15k",false,12000),COK:mk("DEL","₹10-16k",false,13000),DEL:mk("Direct","₹4-8k",true,6000),CCU:mk("DEL","₹6-10k",false,8000),HYD:mk("DEL","₹8-14k",false,11000),BOM:mk("DEL","₹6-12k",false,9000),PNQ:mk("DEL","₹7-13k",false,10000)});

// Command abbreviations: NC=Northern, WC=Western, EC=Eastern, SC=Southern, CC=Central, SWC=South Western, TC=Training
// ── ALL HOSPITALS ────────────────────────────────────────────────────────────
const H=[
// FIELD (28)
{n:"181 MH Tenga",s:"Arunachal Pradesh",cat:"field",cmd:"EC",r:"Forward near China",ap:"Donyi Polo",cd:"HGI",d:"~200 km",tm:"7-9h",tr:"mountain",net:"4G patchy",g5:false,bb:false,tM:480,cab:4500,f:{BLR:mk("DEL/GAU","₹8-15k",true,11500),MAA:mk("CCU/GAU","₹9-16k",true,12500),COK:mk("DEL/CCU","₹10-18k",false,14000),DEL:mk("Direct/GAU","₹6-12k",true,9000),CCU:mk("GAU","₹5-9k",true,7000),HYD:mk("DEL/CCU","₹9-16k",true,12500),BOM:mk("DEL/GAU","₹8-15k",true,11500),PNQ:mk("DEL","₹9-16k",true,12500)}},
{n:"188 MH Likabali",s:"Arunachal Pradesh",cat:"field",cmd:"EC",r:"Forward area",ap:"Lilabari",cd:"IXI",d:"~60 km",tm:"2-3h",tr:"mountain",net:"4G weak",g5:false,bb:false,tM:150,cab:1500,f:{BLR:mk("CCU","₹9-15k",false,12000),MAA:mk("CCU","₹9-14k",false,11500),COK:mk("CCU","₹11-17k",false,14000),DEL:mk("CCU","₹6-10k",false,8000),CCU:mk("Direct","₹4-7k",false,5500),HYD:mk("CCU","₹8-14k",false,11000),BOM:mk("CCU","₹8-14k",false,11000),PNQ:mk("CCU","₹9-15k",false,12000)}},
{n:"180 MH Missamari",s:"Assam",cat:"field",cmd:"EC",r:"Forward deployment",ap:"Tezpur",cd:"TEZ",d:"~40 km",tm:"1-1.5h",tr:"plains",net:"4G",g5:false,bb:false,tM:70,cab:800,f:tez()},
{n:"162 MH Dinjan",s:"Assam",cat:"field",cmd:"EC",r:"Near Myanmar/China",ap:"Dibrugarh",cd:"DIB",d:"~35 km",tm:"1-1.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:75,cab:800,f:dib()},
{n:"160 MH Silchar",s:"Assam",cat:"field",cmd:"EC",r:"Operational area NE",ap:"Silchar",cd:"IXS",d:"~20 km",tm:"40-60m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:50,cab:500,f:ixs()},
{n:"171 MH Samba",s:"J&K",cat:"field",cmd:"NC",r:"Forward near LoC",ap:"Jammu",cd:"IXJ",d:"~50 km",tm:"1.5-2h",tr:"plains",net:"4G",g5:"partial",bb:"BSNL/Jio",tM:100,cab:1200,f:jmu()},
{n:"170 MH Akhnoor",s:"J&K",cat:"field",cmd:"NC",r:"Forward near LoC",ap:"Jammu",cd:"IXJ",d:"~30 km",tm:"45-75m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:55,cab:700,f:jmu()},
{n:"168 MH Drugmulla",s:"J&K",cat:"field",cmd:"NC",r:"LoC (Kupwara)",ap:"Srinagar",cd:"SXR",d:"~90 km",tm:"3-4h",tr:"mountain",net:"4G weak",g5:false,bb:false,tM:200,cab:2500,f:sxr()},
{n:"169 MH Surankot",s:"J&K",cat:"field",cmd:"NC",r:"LoC (Poonch)",ap:"Jammu",cd:"IXJ",d:"~150 km",tm:"5-7h",tr:"mountain",net:"2G/4G",g5:false,bb:false,tM:330,cab:3500,f:jmu()},
{n:"MH Doda",s:"J&K",cat:"field",cmd:"NC",r:"Counter-insurgency",ap:"Jammu",cd:"IXJ",d:"~160 km",tm:"5-7h",tr:"mountain",net:"2G/4G",g5:false,bb:false,tM:330,cab:3800,f:jmu()},
{n:"MH Kargil",s:"Ladakh",cat:"field",cmd:"NC",r:"High-alt near LoC",ap:"Leh",cd:"IXL",d:"~230 km",tm:"5h",tr:"mountain",net:"4G weak",g5:false,bb:false,tM:300,cab:6000,f:{BLR:mk("DEL","₹10-20k",true,15000),MAA:mk("DEL","₹11-20k",true,15500),COK:mk("DEL","₹12-22k",false,17000),DEL:mk("Direct","₹5-12k",true,8500),CCU:mk("DEL","₹7-14k",true,10500),HYD:mk("DEL","₹9-18k",true,13500),BOM:mk("DEL","₹8-16k",true,12000),PNQ:mk("DEL","₹9-17k",true,13000)}},
{n:"183 MH Leimakong",s:"Manipur",cat:"field",cmd:"EC",r:"Forward/CI area",ap:"Imphal",cd:"IMF",d:"~20 km",tm:"40-60m",tr:"hills",net:"4G",g5:false,bb:"BSNL",tM:50,cab:500,f:imf()},
{n:"165 MH Dimapur",s:"Nagaland",cat:"field",cmd:"EC",r:"Counter-insurgency",ap:"Dimapur",cd:"DMU",d:"~5 km",tm:"15-20m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:18,cab:250,f:dmu()},
{n:"167 MH Pathankot",s:"Punjab",cat:"field",cmd:"WC",r:"Near border",ap:"Amritsar",cd:"ATQ",d:"~100 km",tm:"2.5h",tr:"plains",net:"4G/5G",g5:"partial",bb:"Jio/Airtel",tM:150,cab:2500,f:atq()},
{n:"172 MH Gurdaspur",s:"Punjab",cat:"field",cmd:"WC",r:"Near border",ap:"Amritsar",cd:"ATQ",d:"~75 km",tm:"2-2.5h",tr:"plains",net:"4G",g5:"partial",bb:"Jio/Airtel",tM:130,cab:1800,f:atq()},
{n:"173 MH Faridkot",s:"Punjab",cat:"field",cmd:"WC",r:"Near border",ap:"Bathinda",cd:"BUP",d:"~90 km",tm:"2-2.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:130,cab:2200,f:bup()},
{n:"174 MH Bathinda",s:"Punjab",cat:"field",cmd:"WC",r:"Strike corps",ap:"Bathinda",cd:"BUP",d:"~20 km",tm:"30-45m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:35,cab:400,f:bup()},
{n:"175 MH Abohar",s:"Punjab",cat:"field",cmd:"SWC",r:"Near border",ap:"Amritsar",cd:"ATQ",d:"~200 km",tm:"4-5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:260,cab:4500,f:atq()},
{n:"177 MH Jalipa",s:"Rajasthan",cat:"field",cmd:"SWC",r:"Desert near border",ap:"Jaisalmer",cd:"JSA",d:"~100 km",tm:"2-3h",tr:"desert",net:"2G/4G",g5:false,bb:false,tM:150,cab:2500,f:jsa()},
{n:"186 MH Jaisalmer",s:"Rajasthan",cat:"field",cmd:"SWC",r:"Desert near Pak",ap:"Jaisalmer",cd:"JSA",d:"~15 km",tm:"20-30m",tr:"desert",net:"4G",g5:false,bb:"BSNL",tM:25,cab:350,f:jsa()},
{n:"176 MH Sri Ganganagar",s:"Rajasthan",cat:"field",cmd:"SWC",r:"Near border",ap:"Sri Ganganagar",cd:"—",d:"~10 km",tm:"15-25m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:20,cab:200,f:{BLR:mk("DEL/JAI","₹9-16k",false,12500),MAA:mk("DEL","₹10-17k",false,13500),COK:mk("DEL","₹11-18k",false,14500),DEL:mk("JAI","₹5-9k",false,7000),CCU:mk("DEL","₹7-11k",false,9000),HYD:mk("DEL","₹8-15k",false,11500),BOM:mk("DEL","₹7-13k",false,10000),PNQ:mk("DEL","₹8-14k",false,11000)}},
{n:"184 MH Suratgarh",s:"Rajasthan",cat:"field",cmd:"SWC",r:"Desert near border",ap:"Bikaner",cd:"BKB",d:"~80 km",tm:"1.5-2.5h",tr:"desert",net:"4G patchy",g5:false,bb:false,tM:120,cab:1800,f:bkb()},
{n:"187 MH Bikaner",s:"Rajasthan",cat:"field",cmd:"SWC",r:"Desert sector",ap:"Bikaner (Nal)",cd:"BKB",d:"~30 km",tm:"40-60m",tr:"desert",net:"4G",g5:false,bb:"BSNL",tM:50,cab:600,f:bkb()},
{n:"178 MH Gangtok",s:"Sikkim",cat:"field",cmd:"EC",r:"High-alt near China",ap:"Pakyong",cd:"PYG",d:"~35 km",tm:"1.5-2.5h",tr:"mountain",net:"4G weak",g5:false,bb:false,tM:120,cab:1800,f:{BLR:mk("CCU","₹9-15k",false,12000),MAA:mk("CCU","₹9-14k",false,11500),COK:mk("CCU","₹11-17k",false,14000),DEL:mk("CCU","₹6-10k",false,8000),CCU:mk("Direct","₹4-6k",false,5000),HYD:mk("CCU","₹8-14k",false,11000),BOM:mk("CCU","₹7-13k",false,10000),PNQ:mk("CCU","₹8-14k",false,11000)}},
{n:"182 MH Agartala",s:"Tripura",cat:"field",cmd:"EC",r:"NE border",ap:"Agartala",cd:"IXA",d:"~15 km",tm:"30-45m",tr:"plains",net:"4G/5G",g5:"Jio",bb:"Jio/BSNL",tM:35,cab:350,f:ixa()},
{n:"161 MH Pithoragarh",s:"Uttarakhand",cat:"field",cmd:"CC",r:"High-alt near China",ap:"Naini Saini",cd:"NNS",d:"~5 km",tm:"10-15m",tr:"mountain",net:"4G weak",g5:false,bb:false,tM:12,cab:200,f:{BLR:mk("DEL","₹9-16k",false,12500),MAA:mk("DEL","₹10-17k",false,13500),COK:mk("DEL","₹11-18k",false,14500),DEL:mk("Direct","₹4-8k",false,6000),CCU:mk("DEL","₹6-11k",false,8500),HYD:mk("DEL","₹8-15k",false,11500),BOM:mk("DEL","₹7-14k",false,10500),PNQ:mk("DEL","₹8-15k",false,11500)}},
{n:"164 MH Binaguri",s:"West Bengal",cat:"field",cmd:"EC",r:"Siliguri Corridor",ap:"Bagdogra",cd:"IXB",d:"~40 km",tm:"1-1.5h",tr:"plains",net:"4G/5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:60,cab:900,f:ixb()},
{n:"179 MH Kalimpong",s:"West Bengal",cat:"field",cmd:"EC",r:"Near Sikkim/China",ap:"Bagdogra",cd:"IXB",d:"~75 km",tm:"2.5-3.5h",tr:"mountain",net:"4G weak",g5:false,bb:false,tM:170,cab:2200,f:ixb()},
// NON-FIELD (85)
{n:"Cmd Hosp Chandimandir",s:"Haryana",cat:"nf",cmd:"WC",type:"Command",ap:"Chandigarh",cd:"IXC",d:"~25 km",tm:"40-60m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel/BSNL",tM:50,cab:600,f:ixc()},
{n:"Cmd Hosp Udhampur",s:"J&K",cat:"nf",cmd:"NC",type:"Command",ap:"Jammu",cd:"IXJ",d:"~65 km",tm:"2-3h",tr:"mountain",net:"4G",g5:false,bb:"BSNL",tM:140,cab:1800,f:jmu()},
{n:"Cmd Hosp Pune",s:"Maharashtra",cat:"nf",cmd:"SC",type:"Command",ap:"Pune",cd:"PNQ",d:"~15 km",tm:"30-50m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel/ACT",tM:35,cab:400,f:pnq()},
{n:"Cmd Hosp Lucknow",s:"UP",cat:"nf",cmd:"CC",type:"Command",ap:"Lucknow",cd:"LKO",d:"~15 km",tm:"30-50m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel/BSNL",tM:35,cab:400,f:lko()},
{n:"Cmd Hosp Kolkata",s:"West Bengal",cat:"nf",cmd:"EC",type:"Command",ap:"Kolkata",cd:"CCU",d:"~20 km",tm:"45-75m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel/ACT",tM:55,cab:600,f:ccu()},
{n:"Army Hosp R&R Delhi",s:"Delhi",cat:"nf",cmd:"WC",type:"Referral",ap:"IGI Delhi",cd:"DEL",d:"~15 km",tm:"30-60m",tr:"urban",net:"5G",g5:"Jio/Airtel/Vi",bb:"Jio/Airtel/ACT",tM:40,cab:500,f:del()},
{n:"Base Hosp Delhi Cantt",s:"Delhi",cat:"nf",cmd:"WC",type:"Base",ap:"IGI Delhi",cd:"DEL",d:"~15 km",tm:"30-60m",tr:"urban",net:"5G",g5:"Jio/Airtel/Vi",bb:"Jio/Airtel/ACT",tM:40,cab:500,f:del()},
{n:"151 Base Hosp Guwahati",s:"Assam",cat:"nf",cmd:"EC",type:"Base",ap:"Guwahati",cd:"GAU",d:"~25 km",tm:"45-75m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel/BSNL",tM:55,cab:700,f:gau()},
{n:"155 Base Hosp Tezpur",s:"Assam",cat:"nf",cmd:"EC",type:"Base",ap:"Tezpur",cd:"TEZ",d:"~10 km",tm:"20-30m",tr:"plains",net:"4G",g5:false,bb:false,tM:25,cab:300,f:tez()},
{n:"92 Base Hosp Srinagar",s:"J&K",cat:"nf",cmd:"NC",type:"Base",ap:"Srinagar",cd:"SXR",d:"~15 km",tm:"30-50m",tr:"urban",net:"4G/5G",g5:"partial",bb:"BSNL/Jio",tM:40,cab:500,f:sxr()},
{n:"Base Hosp Lucknow",s:"UP",cat:"nf",cmd:"CC",type:"Base",ap:"Lucknow",cd:"LKO",d:"~12 km",tm:"25-45m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel/BSNL",tM:30,cab:350,f:lko()},
{n:"Base Hosp Barrackpore",s:"West Bengal",cat:"nf",cmd:"EC",type:"Base",ap:"Kolkata",cd:"CCU",d:"~15 km",tm:"30-60m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:40,cab:450,f:ccu()},
{n:"158 Base Hosp Bengdubi",s:"West Bengal",cat:"nf",cmd:"EC",type:"Base",ap:"Bagdogra",cd:"IXB",d:"~25 km",tm:"40-60m",tr:"plains",net:"4G/5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:50,cab:600,f:ixb()},
{n:"150 GH Rajouri",s:"J&K",cat:"nf",cmd:"NC",type:"General",ap:"Rajouri(Def)",cd:"—",d:"~5 km",tm:"10-15m",tr:"mountain",net:"4G",g5:false,bb:false,tM:12,cab:150,f:jmu()},
{n:"153 GH Leh",s:"Ladakh",cat:"nf",cmd:"NC",type:"General",ap:"Leh",cd:"IXL",d:"~5 km",tm:"10-15m",tr:"mountain",net:"4G weak",g5:false,bb:"BSNL/sat",tM:12,cab:200,f:{BLR:mk("DEL","₹10-20k",true,15000),MAA:mk("DEL","₹11-20k",true,15500),COK:mk("DEL","₹12-22k",false,17000),DEL:mk("Direct","₹5-12k",true,8500),CCU:mk("DEL","₹7-14k",true,10500),HYD:mk("DEL","₹9-18k",true,13500),BOM:mk("DEL","₹8-16k",true,12000),PNQ:mk("DEL","₹9-17k",true,13000)}},
{n:"154 GH Zakhama",s:"Nagaland",cat:"nf",cmd:"EC",type:"General",ap:"Dimapur",cd:"DMU",d:"~70 km",tm:"2.5-3.5h",tr:"mountain",net:"4G",g5:false,bb:false,tM:180,cab:2000,f:dmu()},
{n:"159 GH Ferozpur",s:"Punjab",cat:"nf",cmd:"WC",type:"General",ap:"Amritsar",cd:"ATQ",d:"~130 km",tm:"3-4h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:210,cab:3000,f:atq()},
// Garrison MH (67)
{n:"166 MH Jammu",s:"J&K",cat:"nf",cmd:"NC",type:"Garrison",ap:"Jammu",cd:"IXJ",d:"~8 km",tm:"15-30m",tr:"urban",net:"4G/5G",g5:"partial",bb:"BSNL/Jio",tM:22,cab:250,f:jmu()},
{n:"MH Danapur",s:"Bihar",cat:"nf",cmd:"CC",type:"Garrison",ap:"Patna",cd:"PAT",d:"~15 km",tm:"30-50m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:40,cab:400,f:pat()},
{n:"MH Gaya",s:"Bihar",cat:"nf",cmd:"CC",type:"Garrison",ap:"Gaya",cd:"GAY",d:"~10 km",tm:"20-35m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:28,cab:300,f:{BLR:mk("Direct","₹5-10k",true,7500),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("DEL","₹7-13k",false,10000),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("Direct","₹3-5k",true,4000),HYD:mk("Direct","₹5-10k",true,7500),BOM:mk("Direct","₹5-9k",true,7000),PNQ:mk("DEL","₹6-10k",true,8000)}},
{n:"MH Panaji",s:"Goa",cat:"nf",cmd:"SC",type:"Garrison",ap:"Goa Dabolim",cd:"GOI",d:"~30 km",tm:"45-75m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:55,cab:700,f:{BLR:mk("Direct","₹3-7k",true,5000),MAA:mk("Direct","₹4-8k",true,6000),COK:mk("Direct","₹4-8k",true,6000),DEL:mk("Direct","₹5-9k",true,7000),CCU:mk("Direct","₹6-10k",true,8000),HYD:mk("Direct","₹3-6k",true,4500),BOM:mk("Direct","₹2-5k",true,3500),PNQ:mk("Direct","₹2-5k",true,3500)}},
{n:"MH Ahmedabad",s:"Gujarat",cat:"nf",cmd:"SC",type:"Garrison",ap:"Ahmedabad",cd:"AMD",d:"~10 km",tm:"20-40m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:30,cab:350,f:amd()},
{n:"MH Vadodara",s:"Gujarat",cat:"nf",cmd:"SC",type:"Garrison",ap:"Vadodara",cd:"BDQ",d:"~8 km",tm:"15-30m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:22,cab:250,f:{BLR:mk("Direct","₹4-8k",true,6000),MAA:mk("Direct","₹5-9k",true,7000),COK:mk("Direct","₹5-9k",true,7000),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("Direct","₹5-9k",true,7000),HYD:mk("Direct","₹4-7k",true,5500),BOM:mk("Direct","₹2-5k",true,3500),PNQ:mk("Direct","₹3-6k",true,4500)}},
{n:"MH Bhuj",s:"Gujarat",cat:"nf",cmd:"SC",type:"Garrison",ap:"Bhuj",cd:"BHJ",d:"~5 km",tm:"10-15m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:12,cab:150,f:{BLR:mk("BOM","₹6-11k",true,8500),MAA:mk("BOM","₹7-12k",true,9500),COK:mk("BOM","₹7-12k",false,9500),DEL:mk("Direct","₹4-8k",true,6000),CCU:mk("DEL/BOM","₹6-10k",false,8000),HYD:mk("BOM","₹5-9k",true,7000),BOM:mk("Direct","₹3-6k",true,4500),PNQ:mk("BOM","₹4-7k",true,5500)}},
{n:"MH Dharangadhara",s:"Gujarat",cat:"nf",cmd:"SC",type:"Garrison",ap:"Ahmedabad",cd:"AMD",d:"~130 km",tm:"2.5-3.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:180,cab:3000,f:amd()},
{n:"MH Jamnagar",s:"Gujarat",cat:"nf",cmd:"SC",type:"Garrison",ap:"Jamnagar",cd:"JGA",d:"~8 km",tm:"15-25m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:20,cab:250,f:{BLR:mk("BOM","₹5-10k",true,7500),MAA:mk("BOM","₹6-11k",true,8500),COK:mk("BOM","₹6-11k",false,8500),DEL:mk("Direct","₹4-8k",true,6000),CCU:mk("DEL/BOM","₹6-10k",false,8000),HYD:mk("BOM","₹5-9k",true,7000),BOM:mk("Direct","₹3-5k",true,4000),PNQ:mk("BOM","₹3-6k",true,4500)}},
{n:"MH Ambala",s:"Haryana",cat:"nf",cmd:"WC",type:"Garrison",ap:"Chandigarh",cd:"IXC",d:"~50 km",tm:"1-1.5h",tr:"plains",net:"4G/5G",g5:"partial",bb:"Jio/Airtel",tM:70,cab:1000,f:ixc()},
{n:"MH Hisar",s:"Haryana",cat:"nf",cmd:"SWC",type:"Garrison",ap:"Hisar",cd:"HSR",d:"~5 km",tm:"10-15m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:12,cab:150,f:{BLR:mk("DEL","₹6-11k",false,8500),MAA:mk("DEL","₹6-11k",false,8500),COK:mk("DEL","₹7-12k",false,9500),DEL:mk("Direct","₹3-5k",false,4000),CCU:mk("DEL","₹5-8k",false,6500),HYD:mk("DEL","₹5-10k",false,7500),BOM:mk("DEL","₹4-8k",false,6000),PNQ:mk("DEL","₹5-9k",false,7000)}},
{n:"MH Kasauli",s:"HP",cat:"nf",cmd:"WC",type:"Garrison",ap:"Chandigarh",cd:"IXC",d:"~60 km",tm:"2-3h",tr:"mountain",net:"4G",g5:false,bb:"BSNL",tM:150,cab:1800,f:ixc()},
{n:"MH Shimla",s:"HP",cat:"nf",cmd:"TC",type:"Garrison",ap:"Shimla",cd:"SLV",d:"~20 km",tm:"45-75m",tr:"mountain",net:"4G",g5:false,bb:"BSNL",tM:55,cab:800,f:{BLR:mk("DEL","₹6-11k",false,8500),MAA:mk("DEL","₹7-12k",false,9500),COK:mk("DEL","₹8-13k",false,10500),DEL:mk("Direct","₹4-7k",false,5500),CCU:mk("DEL","₹5-9k",false,7000),HYD:mk("DEL","₹6-11k",false,8500),BOM:mk("DEL","₹5-9k",false,7000),PNQ:mk("DEL","₹6-10k",false,8000)}},
{n:"MH Bakloh",s:"HP",cat:"nf",cmd:"WC",type:"Garrison",ap:"Kangra",cd:"DHM",d:"~80 km",tm:"3-4h",tr:"mountain",net:"4G",g5:false,bb:false,tM:200,cab:2500,f:dhm()},
{n:"MH Dalhousie",s:"HP",cat:"nf",cmd:"WC",type:"Garrison",ap:"Kangra",cd:"DHM",d:"~90 km",tm:"3-4.5h",tr:"mountain",net:"4G",g5:false,bb:false,tM:230,cab:2800,f:dhm()},
{n:"MH Palampur",s:"HP",cat:"nf",cmd:"WC",type:"Garrison",ap:"Kangra",cd:"DHM",d:"~40 km",tm:"1-1.5h",tr:"mountain",net:"4G",g5:false,bb:"BSNL",tM:75,cab:1000,f:dhm()},
{n:"MH Yol",s:"HP",cat:"nf",cmd:"WC",type:"Garrison",ap:"Kangra",cd:"DHM",d:"~25 km",tm:"40-60m",tr:"mountain",net:"4G",g5:false,bb:"BSNL",tM:50,cab:700,f:dhm()},
{n:"MH Namkum",s:"Jharkhand",cat:"nf",cmd:"CC",type:"Garrison",ap:"Ranchi",cd:"IXR",d:"~12 km",tm:"25-40m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:32,cab:350,f:ran()},
{n:"MH Ramgarh",s:"Jharkhand",cat:"nf",cmd:"CC",type:"Garrison",ap:"Ranchi",cd:"IXR",d:"~50 km",tm:"1-1.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:75,cab:1200,f:ran()},
{n:"MH Belgavi",s:"Karnataka",cat:"nf",cmd:"SC",type:"Garrison",ap:"Belagavi",cd:"IXG",d:"~12 km",tm:"20-35m",tr:"plains",net:"4G/5G",g5:"partial",bb:"Jio/Airtel",tM:28,cab:350,f:blg()},
{n:"MH Kannur",s:"Kerala",cat:"nf",cmd:"SC",type:"Garrison",ap:"Kannur",cd:"CNN",d:"~25 km",tm:"40-60m",tr:"plains",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:50,cab:600,f:{BLR:mk("Direct","₹3-6k",true,4500),MAA:mk("Direct","₹4-7k",true,5500),COK:mk("Direct","₹2-4k",true,3000),DEL:mk("Direct","₹5-10k",true,7500),CCU:mk("Direct","₹6-10k",true,8000),HYD:mk("Direct","₹4-7k",true,5500),BOM:mk("Direct","₹4-7k",true,5500),PNQ:mk("Direct","₹4-7k",true,5500)}},
{n:"MH Trivandrum",s:"Kerala",cat:"nf",cmd:"SC",type:"Garrison",ap:"Trivandrum",cd:"TRV",d:"~5 km",tm:"10-20m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:15,cab:200,f:{BLR:mk("Direct","₹3-6k",true,4500),MAA:mk("Direct","₹3-6k",true,4500),COK:mk("Direct","₹2-4k",true,3000),DEL:mk("Direct","₹5-10k",true,7500),CCU:mk("Direct","₹6-10k",true,8000),HYD:mk("Direct","₹4-7k",true,5500),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("Direct","₹5-8k",true,6500)}},
{n:"MH Bhopal",s:"MP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Bhopal",cd:"BHO",d:"~12 km",tm:"25-40m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:32,cab:350,f:bho()},
{n:"MH Gwalior",s:"MP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Gwalior",cd:"GWL",d:"~10 km",tm:"20-35m",tr:"urban",net:"4G/5G",g5:"partial",bb:"BSNL/Jio",tM:28,cab:300,f:gwl()},
{n:"MH Sagar",s:"MP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Jabalpur",cd:"JLR",d:"~170 km",tm:"3.5-4.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:240,cab:3500,f:jab()},
{n:"MH Jabalpur",s:"MP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Jabalpur",cd:"JLR",d:"~20 km",tm:"30-50m",tr:"urban",net:"4G/5G",g5:"partial",bb:"Jio/BSNL",tM:40,cab:400,f:jab()},
{n:"MH Ambedkar Nagar",s:"MP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Bhopal",cd:"BHO",d:"~15 km",tm:"25-45m",tr:"urban",net:"4G/5G",g5:"partial",bb:"Jio/BSNL",tM:35,cab:400,f:bho()},
{n:"MH Pachmarhi",s:"MP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Bhopal",cd:"BHO",d:"~200 km",tm:"5-6h",tr:"mountain",net:"4G weak",g5:false,bb:false,tM:330,cab:4500,f:bho()},
{n:"MH Ahilyanagar",s:"Maharashtra",cat:"nf",cmd:"SC",type:"Garrison",ap:"Pune",cd:"PNQ",d:"~120 km",tm:"2.5-3.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:190,cab:2800,f:pnq()},
{n:"MH Sambhajinagar",s:"Maharashtra",cat:"nf",cmd:"SC",type:"Garrison",ap:"Aurangabad",cd:"IXU",d:"~10 km",tm:"20-35m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:28,cab:300,f:{BLR:mk("Direct","₹4-8k",true,6000),MAA:mk("Direct","₹5-9k",true,7000),COK:mk("BOM","₹6-10k",true,8000),DEL:mk("Direct","₹4-7k",true,5500),CCU:mk("Direct","₹5-9k",true,7000),HYD:mk("Direct","₹3-6k",true,4500),BOM:mk("Direct","₹3-5k",true,4000),PNQ:mk("Direct","₹3-5k",true,4000)}},
{n:"MH Devlali",s:"Maharashtra",cat:"nf",cmd:"SC",type:"Garrison",ap:"Nashik",cd:"ISK",d:"~20 km",tm:"30-50m",tr:"plains",net:"4G/5G",g5:"partial",bb:"Jio",tM:40,cab:450,f:{BLR:mk("Direct","₹4-8k",true,6000),MAA:mk("Direct","₹5-9k",true,7000),COK:mk("BOM","₹5-9k",true,7000),DEL:mk("Direct","₹4-7k",true,5500),CCU:mk("Direct","₹5-9k",true,7000),HYD:mk("Direct","₹4-7k",true,5500),BOM:mk("Direct","₹2-4k",true,3000),PNQ:mk("Direct","₹3-5k",true,4000)}},
{n:"MH Kamptee",s:"Maharashtra",cat:"nf",cmd:"SC",type:"Garrison",ap:"Nagpur",cd:"NAG",d:"~20 km",tm:"35-55m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:45,cab:500,f:nag()},
{n:"MH Khadakvasla",s:"Maharashtra",cat:"nf",cmd:"SC",type:"Garrison",ap:"Pune",cd:"PNQ",d:"~25 km",tm:"45-75m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:55,cab:650,f:pnq()},
{n:"MH Kirkee",s:"Maharashtra",cat:"nf",cmd:"SC",type:"Garrison",ap:"Pune",cd:"PNQ",d:"~15 km",tm:"30-50m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:40,cab:400,f:pnq()},
{n:"MH CTC Pune",s:"Maharashtra",cat:"nf",cmd:"SC",type:"Garrison",ap:"Pune",cd:"PNQ",d:"~10 km",tm:"20-40m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:30,cab:300,f:pnq()},
{n:"MH Pulgaon",s:"Maharashtra",cat:"nf",cmd:"SC",type:"Garrison",ap:"Nagpur",cd:"NAG",d:"~100 km",tm:"2-2.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:140,cab:2200,f:nag()},
{n:"MH Shillong",s:"Meghalaya",cat:"nf",cmd:"EC",type:"Garrison",ap:"Shillong",cd:"SHL",d:"~30 km",tm:"1-1.5h",tr:"mountain",net:"4G",g5:false,bb:"BSNL",tM:75,cab:800,f:{BLR:mk("GAU/CCU","₹6-12k",false,9000),MAA:mk("CCU","₹6-12k",false,9000),COK:mk("CCU","₹8-14k",false,11000),DEL:mk("GAU","₹5-9k",false,7000),CCU:mk("Direct/GAU","₹4-6k",false,5000),HYD:mk("CCU","₹6-12k",false,9000),BOM:mk("CCU","₹6-12k",false,9000),PNQ:mk("CCU","₹7-13k",false,10000)}},
{n:"MH Gopalpur",s:"Odisha",cat:"nf",cmd:"CC",type:"Garrison",ap:"Bhubaneswar",cd:"BBI",d:"~180 km",tm:"3.5-4.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:250,cab:3500,f:{BLR:mk("Direct","₹4-8k",true,6000),MAA:mk("Direct","₹4-8k",true,6000),COK:mk("Direct","₹5-10k",true,7500),DEL:mk("Direct","₹4-7k",true,5500),CCU:mk("Direct","₹3-5k",true,4000),HYD:mk("Direct","₹4-7k",true,5500),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("Direct","₹5-9k",true,7000)}},
{n:"MH Amritsar",s:"Punjab",cat:"nf",cmd:"WC",type:"Garrison",ap:"Amritsar",cd:"ATQ",d:"~12 km",tm:"20-35m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:28,cab:350,f:atq()},
{n:"MH Jalandhar",s:"Punjab",cat:"nf",cmd:"WC",type:"Garrison",ap:"Adampur",cd:"AIP",d:"~25 km",tm:"35-50m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:42,cab:500,f:{BLR:mk("DEL","₹6-11k",false,8500),MAA:mk("DEL","₹7-13k",false,10000),COK:mk("DEL","₹8-14k",false,11000),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("DEL","₹5-9k",false,7000),HYD:mk("DEL","₹6-11k",false,8500),BOM:mk("DEL","₹5-9k",false,7000),PNQ:mk("DEL","₹6-10k",false,8000)}},
{n:"MH Patiala",s:"Punjab",cat:"nf",cmd:"WC",type:"Garrison",ap:"Chandigarh",cd:"IXC",d:"~60 km",tm:"1.5-2h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:100,cab:1500,f:ixc()},
{n:"MH Jodhpur",s:"Rajasthan",cat:"nf",cmd:"SWC",type:"Garrison",ap:"Jodhpur",cd:"JDH",d:"~5 km",tm:"10-20m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:15,cab:200,f:jdh()},
{n:"MH Nasirabad",s:"Rajasthan",cat:"nf",cmd:"SWC",type:"Garrison",ap:"Kishangarh",cd:"KQH",d:"~30 km",tm:"35-50m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:42,cab:600,f:{BLR:mk("Direct","₹5-9k",false,7000),MAA:mk("DEL","₹6-11k",false,8500),COK:mk("DEL","₹7-12k",false,9500),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("DEL","₹5-9k",false,7000),HYD:mk("Direct","₹5-9k",false,7000),BOM:mk("Direct","₹4-7k",false,5500),PNQ:mk("Direct","₹4-7k",false,5500)}},
{n:"185 MH Udaipur",s:"Rajasthan",cat:"nf",cmd:"SC",type:"Garrison",ap:"Udaipur",cd:"UDR",d:"~22 km",tm:"35-50m",tr:"plains",net:"4G/5G",g5:"partial",bb:"Jio",tM:42,cab:500,f:{BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("DEL/BOM","₹6-11k",true,8500),DEL:mk("Direct","₹3-6k",true,4500),CCU:mk("Direct","₹5-9k",true,7000),HYD:mk("Direct","₹4-8k",true,6000),BOM:mk("Direct","₹3-6k",true,4500),PNQ:mk("Direct","₹4-7k",true,5500)}},
{n:"MH Alwar",s:"Rajasthan",cat:"nf",cmd:"SWC",type:"Garrison",ap:"Jaipur",cd:"JAI",d:"~150 km",tm:"3-4h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:210,cab:3000,f:jai()},
{n:"MH Jaipur",s:"Rajasthan",cat:"nf",cmd:"SWC",type:"Garrison",ap:"Jaipur",cd:"JAI",d:"~12 km",tm:"20-40m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:30,cab:350,f:jai()},
{n:"MH Kota",s:"Rajasthan",cat:"nf",cmd:"SWC",type:"Garrison",ap:"Kota",cd:"KTU",d:"~8 km",tm:"15-25m",tr:"urban",net:"4G",g5:false,bb:"BSNL",tM:20,cab:250,f:{BLR:mk("DEL/JAI","₹6-11k",false,8500),MAA:mk("DEL","₹7-12k",false,9500),COK:mk("DEL","₹8-13k",false,10500),DEL:mk("Direct","₹3-6k",false,4500),CCU:mk("DEL","₹5-9k",false,7000),HYD:mk("DEL","₹6-11k",false,8500),BOM:mk("DEL","₹5-9k",false,7000),PNQ:mk("DEL","₹6-10k",false,8000)}},
{n:"MH Avadi",s:"Tamil Nadu",cat:"nf",cmd:"SC",type:"Garrison",ap:"Chennai",cd:"MAA",d:"~35 km",tm:"1-2h",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel/ACT",tM:80,cab:900,f:maa()},
{n:"MH Chennai",s:"Tamil Nadu",cat:"nf",cmd:"SC",type:"Garrison",ap:"Chennai",cd:"MAA",d:"~15 km",tm:"30-60m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel/ACT",tM:45,cab:450,f:maa()},
{n:"MH Wellington",s:"Tamil Nadu",cat:"nf",cmd:"SC",type:"Garrison",ap:"Coimbatore",cd:"CJB",d:"~60 km",tm:"2-3h",tr:"mountain",net:"4G",g5:false,bb:"BSNL",tM:150,cab:1800,f:{BLR:mk("Direct","₹3-6k",true,4500),MAA:mk("Direct","₹3-6k",true,4500),COK:mk("Direct","₹2-5k",true,3500),DEL:mk("Direct","₹5-9k",true,7000),CCU:mk("Direct","₹6-10k",true,8000),HYD:mk("Direct","₹3-6k",true,4500),BOM:mk("Direct","₹3-7k",true,5000),PNQ:mk("Direct","₹4-7k",true,5500)}},
{n:"MH Golconda",s:"Telangana",cat:"nf",cmd:"SC",type:"Garrison",ap:"Hyderabad",cd:"HYD",d:"~30 km",tm:"45-75m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:55,cab:650,f:hyd()},
{n:"MH Secunderabad",s:"Telangana",cat:"nf",cmd:"SC",type:"Garrison",ap:"Hyderabad",cd:"HYD",d:"~35 km",tm:"50-90m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:65,cab:750,f:hyd()},
{n:"MH Dehradun",s:"Uttarakhand",cat:"nf",cmd:"CC",type:"Garrison",ap:"Jolly Grant",cd:"DED",d:"~25 km",tm:"40-60m",tr:"plains",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:50,cab:600,f:deh()},
{n:"MH Lansdowne",s:"Uttarakhand",cat:"nf",cmd:"CC",type:"Garrison",ap:"Jolly Grant",cd:"DED",d:"~110 km",tm:"3.5-4.5h",tr:"mountain",net:"4G weak",g5:false,bb:false,tM:250,cab:3000,f:deh()},
{n:"MH Ranikhet",s:"Uttarakhand",cat:"nf",cmd:"CC",type:"Garrison",ap:"Pantnagar",cd:"PGH",d:"~110 km",tm:"3.5-4.5h",tr:"mountain",net:"4G",g5:false,bb:"BSNL",tM:250,cab:3000,f:{BLR:mk("DEL","₹6-11k",false,8500),MAA:mk("DEL","₹7-12k",false,9500),COK:mk("DEL","₹8-13k",false,10500),DEL:mk("Direct","₹4-7k",false,5500),CCU:mk("DEL","₹5-9k",false,7000),HYD:mk("DEL","₹6-11k",false,8500),BOM:mk("DEL","₹5-10k",false,7500),PNQ:mk("DEL","₹6-10k",false,8000)}},
{n:"MH Roorkee",s:"Uttarakhand",cat:"nf",cmd:"CC",type:"Garrison",ap:"Jolly Grant",cd:"DED",d:"~60 km",tm:"1.5-2h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:100,cab:1500,f:deh()},
{n:"MH Babina",s:"UP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Gwalior",cd:"GWL",d:"~100 km",tm:"2-2.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:140,cab:2200,f:gwl()},
{n:"MH Jhansi",s:"UP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Gwalior",cd:"GWL",d:"~100 km",tm:"2-2.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:140,cab:2200,f:gwl()},
{n:"MH Agra",s:"UP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Agra",cd:"AGR",d:"~10 km",tm:"20-35m",tr:"urban",net:"4G/5G",g5:"partial",bb:"Jio/BSNL",tM:28,cab:300,f:{BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("DEL","₹5-10k",true,7500),COK:mk("DEL","₹6-11k",true,8500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("DEL","₹4-7k",true,5500),HYD:mk("DEL","₹5-9k",true,7000),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("DEL","₹5-9k",true,7000)}},
{n:"MH Bareilly",s:"UP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Bareilly",cd:"BEK",d:"~10 km",tm:"20-30m",tr:"urban",net:"4G",g5:false,bb:"BSNL",tM:25,cab:300,f:{BLR:mk("DEL","₹6-11k",false,8500),MAA:mk("DEL","₹7-12k",false,9500),COK:mk("DEL","₹8-13k",false,10500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("DEL","₹5-8k",false,6500),HYD:mk("DEL","₹6-11k",false,8500),BOM:mk("DEL","₹5-9k",false,7000),PNQ:mk("DEL","₹6-10k",false,8000)}},
{n:"MH Prayagraj",s:"UP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Prayagraj",cd:"IXD",d:"~12 km",tm:"25-40m",tr:"urban",net:"4G/5G",g5:"partial",bb:"Jio/BSNL",tM:32,cab:350,f:{BLR:mk("Direct","₹5-10k",true,7500),MAA:mk("Direct","₹5-10k",true,7500),COK:mk("DEL","₹7-12k",true,9500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("Direct","₹4-6k",true,5000),HYD:mk("Direct","₹5-9k",true,7000),BOM:mk("Direct","₹5-9k",true,7000),PNQ:mk("Direct","₹5-9k",true,7000)}},
{n:"MH Faizabad",s:"UP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Ayodhya",cd:"AYJ",d:"~20 km",tm:"30-50m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:40,cab:450,f:{BLR:mk("Direct","₹5-10k",true,7500),MAA:mk("Direct","₹6-11k",true,8500),COK:mk("DEL","₹7-12k",true,9500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("Direct","₹4-7k",true,5500),HYD:mk("Direct","₹5-10k",true,7500),BOM:mk("Direct","₹5-9k",true,7000),PNQ:mk("Direct","₹5-10k",true,7500)}},
{n:"MH Fatehgarh",s:"UP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Lucknow",cd:"LKO",d:"~180 km",tm:"4-5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:270,cab:4000,f:lko()},
{n:"MH Mathura",s:"UP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Agra",cd:"AGR",d:"~55 km",tm:"1-1.5h",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:75,cab:1200,f:{BLR:mk("Direct","₹5-9k",true,7000),MAA:mk("DEL","₹5-10k",true,7500),COK:mk("DEL","₹6-11k",true,8500),DEL:mk("Direct","₹3-5k",true,4000),CCU:mk("DEL","₹4-7k",true,5500),HYD:mk("DEL","₹5-9k",true,7000),BOM:mk("Direct","₹4-8k",true,6000),PNQ:mk("DEL","₹5-9k",true,7000)}},
{n:"MH Meerut",s:"UP",cat:"nf",cmd:"WC",type:"Garrison",ap:"IGI Delhi",cd:"DEL",d:"~70 km",tm:"2-3h",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:150,cab:2000,f:del()},
{n:"MH Varanasi",s:"UP",cat:"nf",cmd:"CC",type:"Garrison",ap:"Varanasi",cd:"VNS",d:"~25 km",tm:"45-75m",tr:"urban",net:"5G",g5:"Jio/Airtel",bb:"Jio/Airtel",tM:55,cab:600,f:vns()},
{n:"MH Panagarh",s:"West Bengal",cat:"nf",cmd:"EC",type:"Garrison",ap:"Durgapur",cd:"RDP",d:"~30 km",tm:"40-60m",tr:"plains",net:"4G",g5:false,bb:"BSNL",tM:50,cab:600,f:{BLR:mk("CCU","₹5-9k",true,7000),MAA:mk("CCU","₹5-9k",true,7000),COK:mk("CCU","₹6-11k",true,8500),DEL:mk("Direct","₹4-7k",true,5500),CCU:mk("Direct","₹2-4k",true,3000),HYD:mk("CCU","₹5-9k",true,7000),BOM:mk("CCU","₹5-9k",true,7000),PNQ:mk("CCU","₹6-10k",true,8000)}},
{n:"MH Lebong",s:"West Bengal",cat:"nf",cmd:"EC",type:"Garrison",ap:"Bagdogra",cd:"IXB",d:"~70 km",tm:"2.5-3.5h",tr:"mountain",net:"4G weak",g5:false,bb:false,tM:180,cab:2200,f:ixb()},
];

// ── COMMANDS ─────────────────────────────────────────────────────────────────
const CMD={NC:{l:"Northern Command",hq:"Udhampur",c:"#e94560"},WC:{l:"Western Command",hq:"Chandimandir",c:"#f5a623"},EC:{l:"Eastern Command",hq:"Kolkata",c:"#00d2ff"},SC:{l:"Southern Command",hq:"Pune",c:"#7bed9f"},CC:{l:"Central Command",hq:"Lucknow",c:"#a29bfe"},SWC:{l:"South Western Command",hq:"Jaipur",c:"#ffd93d"},TC:{l:"Training Command",hq:"Shimla",c:"#ff6b9d"}};

const CITIES=[{id:"BLR",l:"Bengaluru"},{id:"MAA",l:"Chennai"},{id:"COK",l:"Kochi"},{id:"DEL",l:"Delhi"},{id:"CCU",l:"Kolkata"},{id:"HYD",l:"Hyderabad"},{id:"BOM",l:"Mumbai"},{id:"PNQ",l:"Pune"}];
const DEF_W={travel:25,fare:20,conn:20,freq:15,cab:20};

function score(h,cities,w){
  const ts=Math.max(0,100-(h.tM/5));
  const fares=cities.map(c=>h.f[c]?.av||20000);
  const af=fares.reduce((a,b)=>a+b,0)/fares.length;
  const fs=Math.max(0,100-(af/200));
  let cs=0;if(h.g5)cs+=50;if(h.bb)cs+=50;else if(!h.g5)cs=h.net?.includes("4G")?20:5;
  const dc=cities.filter(c=>h.f[c]?.dy).length;
  const fq=(dc/cities.length)*100;
  const cbs=Math.max(0,100-(h.tM/4));
  const tot=(ts*w.travel+fs*w.fare+cs*w.conn+fq*w.freq+cbs*w.cab)/(w.travel+w.fare+w.conn+w.freq+w.cab);
  return{t:Math.round(tot),ts:Math.round(ts),fs:Math.round(fs),cs:Math.round(cs),fq:Math.round(fq),cbs:Math.round(cbs),af:Math.round(af)};
}
function sweet(h,cfg,cities){
  if(h.tM>cfg.mt)return false;
  if(cfg.rc&&!h.bb&&!h.g5)return false;
  if(cfg.rd&&!cities.every(c=>h.f[c]?.dy))return false;
  const av=cities.map(c=>h.f[c]?.av||99999).reduce((a,b)=>a+b,0)/cities.length;
  return av<=cfg.mf;
}

// ── APP ──────────────────────────────────────────────────────────────────────
export default function App(){
  const[tab,sTab]=useState("sweet");
  const[sub,sSub]=useState("all");
  const[q,sQ]=useState("");
  const[exp,sExp]=useState(null);
  const[cfgOpen,sCfgOpen]=useState(false);
  const[ci,sCi]=useState(["BLR","MAA","COK"]);
  const[cfg,sCfg]=useState({mt:60,rc:true,rd:true,mf:10000});
  const[w,sW]=useState({...DEF_W});
  const togC=c=>sCi(p=>p.includes(c)?(p.length>1?p.filter(x=>x!==c):p):[...p,c]);

  const data=useMemo(()=>H.map(h=>({...h,sc:score(h,ci,w),sw:sweet(h,cfg,ci)})),[ci,w,cfg]);

  const list=useMemo(()=>{
    let l=data;
    if(tab==="sweet"){l=l.filter(h=>h.sw);if(sub==="field")l=l.filter(h=>h.cat==="field");if(sub==="nf")l=l.filter(h=>h.cat==="nf");}
    else if(tab==="field")l=l.filter(h=>h.cat==="field");
    else if(tab==="nf")l=l.filter(h=>h.cat==="nf");
    // "all" tab shows everything
    if(q)l=l.filter(h=>h.n.toLowerCase().includes(q.toLowerCase())||h.s.toLowerCase().includes(q.toLowerCase())||h.ap.toLowerCase().includes(q.toLowerCase())||(h.cmd&&CMD[h.cmd]?.l.toLowerCase().includes(q.toLowerCase())));
    return[...l].sort((a,b)=>b.sc.t-a.sc.t);
  },[data,tab,sub,q]);

  const swC=data.filter(h=>h.sw).length;
  const swF=data.filter(h=>h.sw&&h.cat==="field").length;
  const swN=data.filter(h=>h.sw&&h.cat==="nf").length;
  const fC=H.filter(h=>h.cat==="field").length;
  const nC=H.filter(h=>h.cat==="nf").length;
  const tc=v=>v<=30?"#7bed9f":v<=60?"#ffd93d":v<=180?"#ff8c42":"#e94560";
  const sc2=v=>v>=70?"#7bed9f":v>=50?"#ffd93d":v>=30?"#ff8c42":"#e94560";
  const Sl=({l,v,fn,mn,mx,st,u})=>(<div style={{marginBottom:5}}><div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#9aa",marginBottom:1}}><span>{l}</span><span style={{color:"#7bed9f",fontWeight:600}}>{v}{u}</span></div><input type="range" min={mn} max={mx} step={st} value={v} onChange={e=>fn(+e.target.value)} style={{width:"100%",accentColor:"#7bed9f",height:3}}/></div>);

  return(
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:"linear-gradient(160deg,#060a18,#0e1a38 40%,#080e20)",minHeight:"100vh",color:"#dde",padding:"16px 10px"}}>
      <div style={{textAlign:"center",marginBottom:14}}>
        <h1 style={{fontSize:18,fontWeight:700,margin:"0 0 3px",background:"linear-gradient(90deg,#e94560,#7bed9f,#00d2ff)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Army MH Sweet Spot Finder</h1>
        <p style={{color:"#556",fontSize:10,margin:0}}>All {H.length} hospitals · 7 Commands · Configurable scoring · 8 origin cities</p>
      </div>
      <div style={{textAlign:"center",marginBottom:8}}>
        <button onClick={()=>sCfgOpen(!cfgOpen)} style={{padding:"5px 12px",borderRadius:5,border:"1px solid rgba(123,237,159,0.3)",background:cfgOpen?"rgba(123,237,159,0.06)":"transparent",color:"#7bed9f",cursor:"pointer",fontSize:10,fontWeight:600}}>{cfgOpen?"▲ Hide Config":"⚙ Configure"}</button>
      </div>
      {cfgOpen&&(<div style={{maxWidth:540,margin:"0 auto 12px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,padding:12}}>
        <div style={{fontSize:9,fontWeight:700,color:"#7bed9f",marginBottom:4,textTransform:"uppercase",letterSpacing:1}}>Origin Cities</div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:8}}>{CITIES.map(c=><button key={c.id} onClick={()=>togC(c.id)} style={{padding:"3px 7px",borderRadius:4,fontSize:9,fontWeight:600,cursor:"pointer",border:ci.includes(c.id)?"1px solid #7bed9f":"1px solid rgba(255,255,255,0.07)",background:ci.includes(c.id)?"rgba(123,237,159,0.1)":"transparent",color:ci.includes(c.id)?"#7bed9f":"#556"}}>{c.l}</button>)}</div>
        <div style={{fontSize:9,fontWeight:700,color:"#00d2ff",marginBottom:3,textTransform:"uppercase",letterSpacing:1}}>Sweet Spot Criteria</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}><Sl l="Max travel" v={cfg.mt} fn={v=>sCfg({...cfg,mt:v})} mn={15} mx={480} st={15} u=" min"/><Sl l="Max avg fare" v={cfg.mf} fn={v=>sCfg({...cfg,mf:v})} mn={3000} mx={25000} st={500} u=""/></div>
        <div style={{display:"flex",gap:12,marginBottom:8}}><label style={{fontSize:9,color:"#9aa",display:"flex",alignItems:"center",gap:3,cursor:"pointer"}}><input type="checkbox" checked={cfg.rc} onChange={e=>sCfg({...cfg,rc:e.target.checked})} style={{accentColor:"#7bed9f"}}/>Require BB/5G</label><label style={{fontSize:9,color:"#9aa",display:"flex",alignItems:"center",gap:3,cursor:"pointer"}}><input type="checkbox" checked={cfg.rd} onChange={e=>sCfg({...cfg,rd:e.target.checked})} style={{accentColor:"#7bed9f"}}/>Daily flights</label></div>
        <div style={{fontSize:9,fontWeight:700,color:"#ffd93d",marginBottom:3,textTransform:"uppercase",letterSpacing:1}}>Scoring Weights</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 12px"}}><Sl l="Flight travel" v={w.travel} fn={v=>sW({...w,travel:v})} mn={0} mx={100} st={5} u="%"/><Sl l="Fare" v={w.fare} fn={v=>sW({...w,fare:v})} mn={0} mx={100} st={5} u="%"/><Sl l="Connectivity" v={w.conn} fn={v=>sW({...w,conn:v})} mn={0} mx={100} st={5} u="%"/><Sl l="Flight freq" v={w.freq} fn={v=>sW({...w,freq:v})} mn={0} mx={100} st={5} u="%"/><Sl l="Airport→Hospital" v={w.cab} fn={v=>sW({...w,cab:v})} mn={0} mx={100} st={5} u="%"/></div>
        <button onClick={()=>{sW({...DEF_W});sCfg({mt:60,rc:true,rd:true,mf:10000});sCi(["BLR","MAA","COK"]);}} style={{fontSize:8,padding:"2px 8px",borderRadius:3,border:"1px solid rgba(255,255,255,0.06)",background:"transparent",color:"#556",cursor:"pointer",marginTop:2}}>Reset</button>
      </div>)}
      <div style={{maxWidth:440,margin:"0 auto 6px"}}><input type="text" placeholder="Search hospital, state, airport, command..." value={q} onChange={e=>sQ(e.target.value)} style={{width:"100%",padding:"7px 10px",borderRadius:5,border:"1px solid rgba(255,255,255,0.06)",background:"rgba(255,255,255,0.02)",color:"#dde",fontSize:11,outline:"none",boxSizing:"border-box"}}/></div>
      <div style={{display:"flex",justifyContent:"center",gap:3,marginBottom:5,flexWrap:"wrap"}}>
        {[{id:"sweet",l:`★ Sweet (${swC})`,c:"#7bed9f"},{id:"all",l:`All (${H.length})`,c:"#a29bfe"},{id:"field",l:`Field (${fC})`,c:"#e94560"},{id:"nf",l:`Non-Field (${nC})`,c:"#00d2ff"}].map(t=>(
          <button key={t.id} onClick={()=>{sTab(t.id);sSub("all");sExp(null);}} style={{padding:"5px 10px",borderRadius:5,border:tab===t.id?`2px solid ${t.c}`:"2px solid rgba(255,255,255,0.04)",background:tab===t.id?`${t.c}10`:"transparent",color:tab===t.id?t.c:"#445",cursor:"pointer",fontSize:10,fontWeight:600}}>{t.l}</button>
        ))}
      </div>
      {tab==="sweet"&&<div style={{display:"flex",justifyContent:"center",gap:3,marginBottom:8}}>
        {[{id:"all",l:`All (${swC})`},{id:"field",l:`Field (${swF})`},{id:"nf",l:`Non-Field (${swN})`}].map(t=>(
          <button key={t.id} onClick={()=>sSub(t.id)} style={{padding:"3px 8px",borderRadius:4,fontSize:9,fontWeight:600,cursor:"pointer",border:sub===t.id?"1px solid #7bed9f":"1px solid rgba(255,255,255,0.04)",background:sub===t.id?"rgba(123,237,159,0.05)":"transparent",color:sub===t.id?"#7bed9f":"#445"}}>{t.l}</button>
        ))}
      </div>}
      <div style={{maxWidth:680,margin:"0 auto"}}>
        <div style={{fontSize:9,color:"#445",marginBottom:4,textAlign:"right"}}>{list.length} hospitals · sorted by score</div>
        {list.map((h,i)=>{
          const isO=exp===`${tab}-${sub}-${i}`;
          const bc=h.sw?"#7bed9f":h.cat==="field"?"#e94560":"#00d2ff";
          const s=h.sc;const cm=CMD[h.cmd];
          return(<div key={i} onClick={()=>sExp(isO?null:`${tab}-${sub}-${i}`)} style={{background:h.sw?"rgba(123,237,159,0.02)":"rgba(255,255,255,0.012)",border:`1px solid ${bc}10`,borderLeft:`3px solid ${bc}`,borderRadius:7,padding:"8px 11px",marginBottom:4,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:12,color:"#eef"}}>{h.sw&&<span style={{color:"#7bed9f",marginRight:2}}>★</span>}{h.n}</div>
                <div style={{fontSize:9,color:"#556",marginTop:1,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                  <span>{h.s}</span>
                  <span style={{color:cm?.c||"#667",fontWeight:600,fontSize:8,padding:"1px 4px",borderRadius:3,background:`${cm?.c||"#667"}12`,border:`1px solid ${cm?.c||"#667"}25`}}>{cm?.l||h.cmd}</span>
                  <span style={{color:"#556"}}>{h.cat==="field"?"Field":h.type||"Garrison"}</span>
                </div>
              </div>
              <div style={{textAlign:"center",minWidth:36}}>
                <div style={{fontSize:15,fontWeight:800,color:sc2(s.t),lineHeight:1}}>{s.t}</div>
                <div style={{fontSize:7,color:"#445"}}>SCORE</div>
              </div>
            </div>
            <div style={{marginTop:4,display:"flex",alignItems:"center",gap:4,background:"rgba(255,255,255,0.012)",borderRadius:4,padding:"3px 6px",fontSize:9}}>
              <span>✈</span><span style={{color:"#a0d0e0",fontWeight:500,flex:1}}>{h.ap} ({h.cd})</span>
              <span style={{color:tc(h.tM),fontWeight:600,background:`${tc(h.tM)}10`,padding:"1px 4px",borderRadius:3}}>🕐{h.tm}</span>
              <span style={{color:"#a29bfe"}}>🚕₹{h.cab}</span>
            </div>
            <div style={{marginTop:2,display:"flex",alignItems:"center",gap:3,flexWrap:"wrap",fontSize:8}}>
              <span style={{padding:"1px 4px",borderRadius:3,background:h.g5?"#7bed9f10":"#e9456008",color:h.g5?"#7bed9f":"#e94560",fontWeight:600}}>5G:{h.g5||"No"}</span>
              <span style={{padding:"1px 4px",borderRadius:3,background:h.bb?"#00d2ff10":"#ff8c4208",color:h.bb?"#00d2ff":"#ff8c42",fontWeight:600}}>BB:{h.bb||"No"}</span>
              <span style={{padding:"1px 4px",borderRadius:3,background:"rgba(255,255,255,0.02)",color:"#556"}}>{h.net}</span>
              <span style={{marginLeft:"auto",color:s.af<=10000?"#7bed9f":"#ff8c42",fontWeight:600,fontSize:9}}>Avg ₹{(s.af/1000).toFixed(1)}k</span>
            </div>
            {isO&&(<div style={{marginTop:6,paddingTop:6,borderTop:"1px solid rgba(255,255,255,0.04)"}}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:2,marginBottom:5}}>
                {[{l:"Flight",v:s.ts},{l:"Fare",v:s.fs},{l:"Connect",v:s.cs},{l:"Freq",v:s.fq},{l:"Cab",v:s.cbs}].map(x=>(<div key={x.l} style={{textAlign:"center",background:"rgba(255,255,255,0.015)",borderRadius:3,padding:"2px 1px"}}><div style={{fontSize:12,fontWeight:700,color:sc2(x.v)}}>{x.v}</div><div style={{fontSize:7,color:"#445"}}>{x.l}</div></div>))}
              </div>
              {h.r&&<div style={{fontSize:9,color:"#556",marginBottom:3,fontStyle:"italic"}}>{h.r}</div>}
              <div style={{fontSize:8,fontWeight:700,color:"#a0d0e0",textTransform:"uppercase",letterSpacing:1,marginBottom:2}}>Flights from selected cities</div>
              {ci.map(c=>{const fl=h.f[c];if(!fl)return null;return(<div key={c} style={{display:"flex",alignItems:"center",gap:3,fontSize:9,padding:"2px 5px",background:"rgba(255,255,255,0.008)",borderRadius:3,marginTop:1}}><span style={{fontWeight:700,color:"#7bed9f",minWidth:22}}>{c}</span><span style={{color:"#8aa",flex:1}}>{fl.v}</span><span style={{color:"#ffd93d",fontWeight:600,minWidth:50,textAlign:"right"}}>{fl.fa}</span><span style={{color:fl.dy?"#7bed9f":"#ff8c42",minWidth:36,textAlign:"right",fontSize:8}}>{fl.dy?"Daily":"Few/wk"}</span></div>);})}
              <div style={{marginTop:4,fontSize:8,color:"#445",display:"flex",gap:8}}><span>🚕 ₹{h.cab}</span><span>📍 {h.d}</span><span style={{color:cm?.c}}>{cm?.l} ({cm?.hq})</span></div>
            </div>)}
          </div>);
        })}
        {list.length===0&&<div style={{textAlign:"center",color:"#556",padding:30,fontSize:12}}>No hospitals match. Adjust config.</div>}
      </div>
      <div style={{textAlign:"center",marginTop:16,fontSize:7,color:"#223",lineHeight:1.5}}>Sources: Wikipedia, MakeMyTrip, Yatra, IndiGo, Air India, Jio/Airtel maps · Fares, cab costs & schedules approximate</div>
    </div>
  );
}
