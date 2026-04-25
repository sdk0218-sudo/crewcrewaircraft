// 완벽하게 Hoisting과 실행순서를 제어한 안전한 버전입니다.
document.addEventListener('DOMContentLoaded', initApp);

// =========================================
// 1. DATA & VARIABLES
// =========================================
const iconLibrary = [
    "alert-circle", "alert-triangle", "check-circle", "info", "help-circle",
    "plane", "plane-takeoff", "plane-landing", "wind", "compass", "map", "globe", "building-2", "factory",
    "cloud", "cloud-sun", "cloud-rain", "thermometer", "droplets", "sun", "moon",
    "coffee", "cup-soda", "utensils", "glass-water", "shopping-cart",
    "wrench", "settings", "tool", "shield-alert", "flame",
    "monitor-play", "smartphone", "tv", "wifi", "battery-charging",
    "book", "book-open", "file-text", "clipboard-list", "folder",
    "link", "external-link", "download", "camera", "glasses",
    "ruler", "maximize", "package", "briefcase", "first-aid", "calculator", "radar", "map-pin", "box", "star", "phone",
    "music", "umbrella", "heart", "key", "bell", "calendar", "clock", "credit-card", "gift", "mic"
];

const CALC_DATA = {
    "388S": { group: "A380", name: "A380 (388S)", cabins: ["F", "C", "Y"], configs: [ {id:"c1", label:"12/94/301"}, {id:"c2", label:"12/70/325"}, {id:"c3", label:"12/22/373"}, {id:"c4", label:"0/106/301"}, {id:"c5", label:"0/82/325"}, {id:"c6", label:"0/34/373"}, {id:"c7", label:"0/12/395"}, {id:"c8", label:"0/0/407"} ], formula: { F: { long:[0,4,12], crew:[2,3,4], short:[0,4,12], short_crew:[2,3,4] }, C: { long:[18,30,40,51,60,68,77,86,94,106], crew:[2,3,4,5,6,7,8,9,10,12], short:[18,24,29,34,42,54,66,78,80,96,101,106], short_crew:[2,3,4,5,6,7,8,9,10,11,12,13] }, Y: { long:[136,166,202,247,301,339,373,395,407], crew:[5,6,7,8,9,10,11,12,15], short:[136,162,193,229,273,325,339,373,395,407], short_crew:[5,6,7,8,9,10,11,12,13,15] } } },
    "74HI": { group: "B747", name: "B747 (74HI)", cabins: ["F", "C", "Y"], configs: [ {id:"c1", label:"6/48/314"}, {id:"c2", label:"6/22/340"}, {id:"c3", label:"6/26/336"}, {id:"c4", label:"0/54/314"}, {id:"c5", label:"0/28/340"}, {id:"c6", label:"0/32/336"}, {id:"c7", label:"0/6/362"}, {id:"c8", label:"0/0/368"} ], formula: { F: { long:[0,6], crew:[2,3], short:[0,6], short_crew:[2,3] }, C: { long:[16,26,34,43,48,54], crew:[2,3,4,5,6,7], short:[6,16,27,32,38,45,54], short_crew:[1,2,3,4,5,6,7] }, Y: { long:[86,117,162,226,314,340,368], crew:[4,5,6,7,8,9,10], short:[85,112,147,194,255,314,340,368], short_crew:[4,5,6,7,8,9,10,11] } } },
    "77WP": { group: "B777", name: "B777 (77WP)", cabins: ["C", "V", "Y"], configs: [ {id:"c1", label:"40/40/248"}, {id:"c2", label:"24/56/248"}, {id:"c3", label:"40/0/288"}, {id:"c4", label:"24/0/304"}, {id:"c5", label:"0/80/248"}, {id:"c6", label:"0/40/288"}, {id:"c7", label:"0/24/304"}, {id:"c8", label:"0/0/328"} ], formula: { C: { long:[16,24,32,40], crew:[2,3,4,5], short:[6,18,30,40], short_crew:[1,2,3,4] }, V: { long:[12,40,56,80], crew:[1,3,4,5], short:[12,40,56,80], short_crew:[1,2,3,4] }, Y: { long:[113,147,190,248,288,304,328], crew:[4,5,6,7,8,9,10], short:[87,113,147,190,248,288,304,328], short_crew:[2,3,4,5,6,7,8,9] } } },
    "773Q": { group: "B777", name: "B777 (773Q)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"41/297"}, {id:"c2", label:"27/311"}, {id:"c3", label:"6/332"}, {id:"c4", label:"0/338"} ], formula: { C: { long:[17,26,35,41], crew:[2,3,4,5], short:[6,18,30,41], short_crew:[1,2,3,4] }, Y: { long:[134,164,204,252,311,338], crew:[4,5,6,7,8,9], short:[134,165,204,252,311,338], short_crew:[3,4,5,6,7,8] } } },
    "77WS": { group: "B777", name: "B777 (77WS)", cabins: ["F", "C", "Y"], configs: [ {id:"c1", label:"8/56/227"}, {id:"c2", label:"8/14/269"}, {id:"c3", label:"0/64/227"}, {id:"c4", label:"0/22/269"}, {id:"c5", label:"0/8/283"}, {id:"c6", label:"0/0/291"} ], formula: { F: { long:[0,4,8], crew:[2,3,4], short:[0,4,8], short_crew:[2,3,4] }, C: { long:[16,24,32,41,49,56,64], crew:[2,3,4,5,6,7,8], short:[6,16,28,37,46,55,64], short_crew:[1,2,3,4,5,6,7] }, Y: { long:[128,154,185,227,269,291], crew:[4,5,6,7,8,9], short:[107,126,148,174,204,241,283,291], short_crew:[3,4,5,6,7,8,9,10] } } },
    "77WI": { group: "B777", name: "B777 (77WI)", cabins: ["F", "C", "Y"], configs: [ {id:"c1", label:"8/42/227"}, {id:"c2", label:"8/6/263"}, {id:"c3", label:"0/50/227"}, {id:"c4", label:"0/14/263"}, {id:"c5", label:"0/8/269"}, {id:"c6", label:"0/0/277"} ], formula: { F: { long:[0,4,8], crew:[2,3,4], short:[0,4,8], short_crew:[2,3,4] }, C: { long:[16,24,33,42,50], crew:[2,3,4,5,6], short:[6,16,28,37,46,50], short_crew:[1,2,3,4,5,6] }, Y: { long:[128,154,185,227,269,277], crew:[4,5,6,7,8,9], short:[103,134,150,181,218,263,277], short_crew:[3,4,5,6,7,8,9] } } },
    "772K": { group: "B777", name: "B777 (772K)", cabins: ["F", "C", "Y"], configs: [ {id:"c1", label:"8/28/225"}, {id:"c2", label:"8/14/239"}, {id:"c3", label:"0/36/225"}, {id:"c4", label:"0/22/239"}, {id:"c5", label:"0/8/253"}, {id:"c6", label:"0/0/261"} ], formula: { F: { long:[0,4,8], crew:[2,3,4], short:[0,4,8], short_crew:[2,3,4] }, C: { long:[16,24,28,36], crew:[2,3,4,5], short:[6,18,30,36], short_crew:[1,2,3,4] }, Y: { long:[133,174,225,239,261], crew:[4,5,6,7,8], short:[104,130,162,202,261], short_crew:[3,4,5,6,7] } } },
    "789E": { group: "B787", name: "B787-9 (789E)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"24/245"}, {id:"c2", label:"6/263"}, {id:"c3", label:"0/269"} ], formula: { C: { long:[16,24], crew:[2,3], short:[6,18,24], short_crew:[1,2,3] }, Y: { long:[127,176,245,269], crew:[4,5,6,7], short:[91,127,176,216,269], short_crew:[3,4,5,6,7] } } },
    "789P": { group: "B787", name: "B787-9 (789P)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"24/254"}, {id:"c2", label:"6/272"}, {id:"c3", label:"0/278"} ], formula: { C: { long:[16,24], crew:[2,3], short:[6,18,24], short_crew:[1,2,3] }, Y: { long:[107,142,190,254,278], crew:[4,5,6,7,8], short:[80,107,142,190,254,278], short_crew:[3,4,5,6,7,8] } } },
    "781P": { group: "B787", name: "B787-10 (781P)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"36/289"}, {id:"c2", label:"0/325"} ], formula: { C: { long:[16,24,32,36], crew:[2,3,4,5], short:[6,18,30,36], short_crew:[1,2,3,4] }, Y: { long:[112,142,180,228,289,325], crew:[4,5,6,7,8,9], short:[88,112,142,180,228,289,325], short_crew:[3,4,5,6,7,8,9] } } },
    "359P": { group: "A350", name: "A350 (359P)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"28/283"}, {id:"c2", label:"0/311"} ], formula: { C: { long:[16,24,28], crew:[2,3,4], short:[6,18,28], short_crew:[1,2,3] }, Y: { long:[111,140,177,224,283,311], crew:[4,5,6,7,8,9], short:[88,111,140,177,224,283,311], short_crew:[3,4,5,6,7,8,9] } } },
    "333Q": { group: "A330", name: "A330 (333Q)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"24/252"}, {id:"c2", label:"6/270"}, {id:"c3", label:"0/276"} ], formula: { C: { long:[16,24], crew:[2,3], short:[6,18,24], short_crew:[1,2,3] }, Y: { long:[110,145,191,252,276], crew:[4,5,6,7,8], short:[84,110,145,191,252,276], short_crew:[3,4,5,6,7,8] } } },
    "333R": { group: "A330", name: "A330 (333R)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"24/260"}, {id:"c2", label:"6/278"}, {id:"c3", label:"0/284"} ], formula: { C: { long:[16,24], crew:[2,3], short:[6,18,24], short_crew:[1,2,3] }, Y: { long:[105,142,192,260,284], crew:[4,5,6,7,8], short:[77,105,142,192,260,284], short_crew:[3,4,5,6,7,8] } } },
    "333E": { group: "A330", name: "A330 (333E)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"24/248"}, {id:"c2", label:"6/266"}, {id:"c3", label:"0/272"} ], formula: { C: { long:[16,24], crew:[2,3], short:[6,18,24], short_crew:[1,2,3] }, Y: { long:[113,147,190,248,272], crew:[4,5,6,7,8], short:[87,113,147,190,248,272], short_crew:[3,4,5,6,7,8] } } },
    "332Q": { group: "A330", name: "A330 (332Q)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"30/188"}, {id:"c2", label:"18/200"}, {id:"c3", label:"6/212"}, {id:"c4", label:"0/218"} ], formula: { C: { long:[16,24,30], crew:[2,3,4], short:[6,18,30], short_crew:[1,2,3] }, Y: { long:[126,188,218], crew:[4,5,6], short:[84,126,188,218], short_crew:[3,4,5,6] } } },
    "73HT": { group: "B737", name: "B737 (73HT)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"12/126"}, {id:"c2", label:"0/138"} ], formula: { C: { long:[12], crew:[2], short:[12], short_crew:[2] }, Y: { long:[74,97,126,138], crew:[3,4,5,6], short:[74,97,126,138], short_crew:[3,4,5,6] } } },
    "7M8Q": { group: "B737", name: "B737-8 (7M8Q)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"8/138"}, {id:"c2", label:"0/146"} ], formula: { C: { long:[8], crew:[1], short:[8], short_crew:[1] }, Y: { long:[72,99,138,146], crew:[3,4,5,6], short:[72,99,138,146], short_crew:[3,4,5,6] } } },
    "739P": { group: "B737", name: "B737-9 (739P)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"8/180"}, {id:"c2", label:"0/188"} ], formula: { C: { long:[8], crew:[1], short:[8], short_crew:[1] }, Y: { long:[73,99,133,180,188], crew:[3,4,5,6,7], short:[73,99,133,180,188], short_crew:[3,4,5,6,7] } } },
    "320P": { group: "A321/A220", name: "A321 (320P)", cabins: ["C", "Y"], configs: [ {id:"c1", label:"8/174"}, {id:"c2", label:"0/182"} ], formula: { C: { long:[8], crew:[1], short:[8], short_crew:[1] }, Y: { long:[70,95,128,174,182], crew:[3,4,5,6,7], short:[70,95,128,174,182], short_crew:[3,4,5,6,7] } } },
    "223Q": { group: "A321/A220", name: "A220 (223Q)", cabins: ["Y"], configs: [ {id:"c1", label:"140"} ], formula: { Y: { long:[71,99,140], crew:[3,4,5], short:[71,99,140], short_crew:[3,4,5] } } }
};

let customData = {};
let currentRouteKey = null;
let isLocked = true;
let isEditingNew = false;
let currentZoom = 100;
let calcState = { haul:'long', parentGroup:'', acId:'', configId:'', pax:{} };
let liveSections = [];
let currentIconCallback = null;
let openFolderIds = new Set(); // 사이드바 펼침 상태 유지용

// =========================================
// 2. INITIALIZATION
// =========================================
function initApp() {
    console.log("initApp [v2] started");
    // 1. Zoom 초기화
    let z = localStorage.getItem('crewAppZoom');
    if (z) currentZoom = parseInt(z, 10) || 100;

    // 2. Lock 상태 초기화
    let locked = localStorage.getItem('crewDeckLocked');
    isLocked = (locked !== 'false');

    // 3. 데이터 로드 및 마이그레이션
    loadData();

    // 4. 이벤트 바인딩
    bindEvents();

    // 5. 렌더링
    applyZoom();
    updateLockUI();
    renderNavigation();
    renderWelcome();
    console.log("initApp [v2] finished");
}

const STAFFING_SEED = [
    { id:"388S", cat:"wide", maker:"Airbus", pm:"A380", badge:"A380", name:"A380 (388S)", so:10,
      min:16, seats:"DP/L2R/L3/L4R/L5/UL1F/UL2/UL3/R1L/R2L/R3/R4L/R5/UR1A/UR2/UR3",
      cfg:"3cls(23명) F/C/Y: 12/94/301\n2cls(22명) C/Y: 106/301" },
    { id:"74HI", cat:"wide", maker:"Boeing", pm:"B747", badge:"B747", name:"B747 (74HI)", so:20,
      min:9, seats:"DP/L2L/L3L/L4L/UL/R1R/R3R/R4R/R5",
      cfg:"3cls(17명) F/C/Y: 6/48/314\n2cls(16명) C/Y: 54/314" },
    { id:"773Q", cat:"wide", maker:"Boeing", pm:"B777", badge:"B777", name:"B777 (773Q)", so:30,
      min:8, seats:"DP/L2F/L3/L4/R2F/R3/R4/R5A",
      cfg:"2cls(14명) C/Y: 41/297" },
    { id:"77WS", cat:"wide", maker:"Boeing", pm:"B777", badge:"B777", name:"B777 (77WS)", so:31,
      min:6, seats:"DP/L2F/L4/R2F/R3/R5R",
      cfg:"3cls(17명) F/C/Y: 8/56/227\n2cls(16명) C/Y: 64/227" },
    { id:"77WI", cat:"wide", maker:"Boeing", pm:"B777", badge:"B777", name:"B777 (77WI)", so:32,
      min:6, seats:"DP/L2F/L4/R2F/R3/R5R",
      cfg:"3cls(16명) F/C/Y: 8/42/227\n2cls(14명) C/Y: 50/227" },
    { id:"77WP", cat:"wide", maker:"Boeing", pm:"B777", badge:"B777", name:"B777 (77WP)", so:33,
      min:9, seats:"DP/L2F/L2A/L3/L4/R1/R2A/R3/R5R",
      cfg:"3cls(15명) C/V/Y: 40/40/248" },
    { id:"772K", cat:"wide", maker:"Boeing", pm:"B777", badge:"B777", name:"B777 (772K)", so:34,
      min:6, seats:"DP/L2F/L3/R2F/R3/R4A",
      cfg:"2cls(12명) C/Y: 36/225" },
    { id:"789E", cat:"wide", maker:"Boeing", pm:"B787", badge:"B787", name:"B787-9 (789E)", so:40,
      min:7, seats:"DP/L2F/L2A/R2F/L3/R3/R4",
      cfg:"2cls(10명) C/Y: 24/245" },
    { id:"789P", cat:"wide", maker:"Boeing", pm:"B787", badge:"B787", name:"B787-9 (789P)", so:41,
      min:7, seats:"DP/L2F/L2A/R2F/L3/R3/R4",
      cfg:"2cls(11명) C/Y: 24/254" },
    { id:"781P", cat:"wide", maker:"Boeing", pm:"B787", badge:"B787", name:"B787-10 (781P)", so:42,
      min:7, seats:"DP/L2F/R2F/R2A/L3/R3F/R4",
      cfg:"2cls(14명) C/Y: 36/289" },
    { id:"359P", cat:"wide", maker:"Airbus", pm:"A350", badge:"A350", name:"A350 (359P)", so:50,
      min:8, seats:"DP/R1/L2/R2F/L3/R3F/L4/R4",
      cfg:"2cls(13명) C/Y: 28/283" },
    { id:"333Q", cat:"wide", maker:"Airbus", pm:"A330", badge:"A330", name:"A330 (333Q)", so:60,
      min:6, seats:"DP/L2/L3/L4L/R2/R3",
      cfg:"2cls(10명) C/Y: 24/252" },
    { id:"333R", cat:"wide", maker:"Airbus", pm:"A330", badge:"A330", name:"A330 (333R)", so:61,
      min:6, seats:"DP/L2/L3/L4L/R2/R3",
      cfg:"2cls(10명) C/Y: 24/260" },
    { id:"333E", cat:"wide", maker:"Airbus", pm:"A330", badge:"A330", name:"A330 (333E)", so:62,
      min:6, seats:"DP/L2/L3/L4L/R2/R3",
      cfg:"2cls(10명) C/Y: 24/248" },
    { id:"332Q", cat:"wide", maker:"Airbus", pm:"A330", badge:"A330", name:"A330 (332Q)", so:63,
      min:5, seats:"DP/L2/L3/L4/R3",
      cfg:"2cls(9명) C/Y: 30/188" },
    { id:"73HT", cat:"narrow", maker:"Boeing", pm:"B737", badge:"B737", name:"B737 (73HT)", so:70,
      min:3, seats:"DP/L1R/L2L",
      cfg:"2cls(6명) C/Y: 12/126" },
    { id:"7M8Q", cat:"narrow", maker:"Boeing", pm:"B737", badge:"B737", name:"B737-8 (7M8Q)", so:71,
      min:3, seats:"DP/L1R/L2L",
      cfg:"2cls(6명) C/Y: 8/138" },
    { id:"7M8R", cat:"narrow", maker:"Boeing", pm:"B737", badge:"B737", name:"B737-8 (7M8R)", so:72,
      min:4, seats:"DP/L1R/L2L/R2L",
      cfg:"2cls(6명) C/Y: 8/150" },
    { id:"739P", cat:"narrow", maker:"Boeing", pm:"B737", badge:"B737", name:"B737-9 (739P)", so:73,
      min:4, seats:"DP/L1R/L2L/R2L",
      cfg:"2cls(7명) C/Y: 8/180" },
    { id:"320P", cat:"narrow", maker:"Airbus", pm:"A321", badge:"A321", name:"A321 (320P)", so:80,
      min:4, seats:"DP/L1R/L2L/C2",
      cfg:"2cls(7명) C/Y: 8/174" },
    { id:"223Q", cat:"narrow", maker:"Airbus", pm:"A220", badge:"A220", name:"A220 (223Q)", so:81,
      min:3, seats:"DP/L1R/C2",
      cfg:"Mono(5명) Y: 140" }
];

function loadData() {
    console.log("loadData started");
    let saved = localStorage.getItem('aeroDocsData');
    if (saved) {
        try { customData = JSON.parse(saved); } catch(e) { }
    }
    
    // 포터블 모드: 로컬 저장소가 비어있을 때 내장된 데이터 로드
    if ((!customData || Object.keys(customData).length === 0) && window.__PORTABLE_DATA__) {
        customData = window.__PORTABLE_DATA__;
    }
    
    if(!customData) customData = {};
    
    let needsSave = false;
    
    STAFFING_SEED.forEach(s => {
        if(!customData[s.id]) {
            customData[s.id] = { id: s.id, typeCode: s.id, name: s.name, sortOrder: s.so, sections: [ { id:"staff_"+s.id, type:"grid", title:"Duty Code / Minimum Staffing", icon:"users", items: [{ key:"최소 탑승 승무원 (Min Staff)", val: s.min+"명" }, { key:"좌석 위치 (Seat Position)", val: s.seats }, { key:"운영 편성 (Configuration)", val: s.cfg.replace(/\n/g, " / ") } ] } ] };
            needsSave = true;
        }
        if(!customData[s.id].category) customData[s.id].category = s.cat;
        if(!customData[s.id].maker) customData[s.id].maker = s.maker;
        if(!customData[s.id].parentModel) customData[s.id].parentModel = s.pm;
        if(customData[s.id].sortOrder === undefined) customData[s.id].sortOrder = s.so;
    });

    if(!customData.navTree) {
        customData.navTree = [];
        const categories = { 'narrow': '소형기 (Narrow-body)', 'wide': '대형기 (Wide-body)', 'general': '일반 페이지 (General)' };
        const orderMaker = ['Boeing', 'Airbus', 'Common'];
        Object.keys(categories).forEach(cat => {
            const items = Object.values(customData).filter(d => d.category === cat && !d.type && d.id !== 'navTree' && d.id !== 'homeContent');
            if(items.length === 0) return;
            const catNode = { id: 'cat_' + cat, type: 'folder', title: categories[cat], icon: 'plane', style:'depth-0', children: [] };
            customData.navTree.push(catNode);
            orderMaker.forEach(maker => {
                const makerItems = items.filter(d => d.maker === maker);
                if(makerItems.length === 0) return;
                makerItems.sort((a,b) => (a.sortOrder||0) - (b.sortOrder||0));
                const makerNode = { id: 'maker_' + cat + '_' + maker, type: 'folder', title: maker, icon: 'building', style:'depth-1', children: [] };
                catNode.children.push(makerNode);
                const pmMap = {}; const pmArr = [];
                makerItems.forEach(item => {
                    let pm = item.parentModel || "기타";
                    if(!pmMap[pm]) { pmMap[pm] = []; pmArr.push(pm); }
                    pmMap[pm].push(item.id);
                });
                pmArr.forEach(pm => {
                    if(pmMap[pm].length === 1) makerNode.children.push({ id: pmMap[pm][0], type: 'page', icon:'file-text' });
                    else makerNode.children.push({ id: 'pm_' + cat + '_' + maker + '_' + pm, type: 'folder', title: pm, icon: 'folder', style:'depth-2', children: pmMap[pm].map(acId => ({ id: acId, type: 'page', icon:'file-text' })) });
                });
            });
        });
        needsSave = true;
    }

    if(!customData.homeContent) {
        customData.homeContent = [ { id: 'h1', type: 'text', isHeader: true, icon: 'radar', title: '비행 준비 대시보드', content: '왼쪽 메뉴에서 기종 매뉴얼을 보거나, 홈페이지 등을 위젯으로 자유롭게 편집해보세요.' }, { id: 'h_calc', type: 'calc', title: '승무원 기종별 작동기' }, { id: 'h_gate', type: 'gate', title: 'T2 빠른 보안/출국장 찾기' }, { id: 'h_flight', type: 'flight', title: '실시간 항공기 추적 (FlightAware)' }, { id: 'h_sync', type: 'sync', title: '기기 간 동기화 (폰으로 복제)' } ];
        needsSave = true;
    }
    if(customData.homeContent && !customData.homeContent.find(x => x.id === 'h_link_commute_web')) {
        customData.homeContent.splice(1, 0,  { id: 'h_link_commute_local', type: 'link', isHalfWidth: true, icon: 'briefcase', title: '출근도우미 (오프라인)', content: '내장된 오프라인 도우미', url: 'CrewSyncApp/index.html' }, { id: 'h_link_commute_web', type: 'link', isHalfWidth: true, icon: 'external-link', title: '출근도우미 (웹)', content: 'CrewGoWork 외부 웹 접속', url: 'https://crewgowork.netlify.app/' } );
        needsSave = true;
    }
    // 사용방법 위젯 강제 업데이트 (동기화 및 포터블 안내 포함)
    const syncHelp = '🔄 데이터 동기화 및 백업:\n1. [데이터 내보내기/불러오기]: 텍스트 코드로 기기 간 데이터를 이동합니다.\n2. [나만의 매뉴얼 전용 파일로 저장]: 현재 데이터와 사진이 모두 포함된 단일 HTML 파일을 생성합니다. 이 파일만 있으면 어디서든 오프라인으로 나만의 앱을 실행할 수 있습니다.';
    const usageGuide = { id: 'h_usage_guide', type: 'text', icon: 'help-circle', isFullWidth: true, title: '💡 사용 방법 안내', content: '1. 우측 상단의 자물쇠 아이콘을 클릭하여 비밀번호(0201)를 입력하면 편집 모드가 활성화됩니다.\n2. 왼쪽 사이드바에서 [+] 버튼을 눌러 폴더를 만들거나 새 기종 문서를 추가할 수 있습니다.\n3. 각 위젯과 섹션 우측 상단의 아이콘들을 통해 순서를 바꾸거나 크기를 조절할 수 있습니다.\n4. 기종별 페이지에서는 [섹션 추가]를 통해 사진, 체크리스트, 링크 등을 자유롭게 구성하세요.\n\n' + syncHelp };
    
    if(customData.homeContent) {
        let helpIdx = customData.homeContent.findIndex(x => x.id === 'h_usage_guide');
        if(helpIdx === -1) {
            customData.homeContent.push(usageGuide);
            needsSave = true;
        } else if (!customData.homeContent[helpIdx].content.includes('동기화')) {
            customData.homeContent[helpIdx].content = usageGuide.content;
            needsSave = true;
        }
    }
    if(customData.navTree) {
        console.log("Cleaning navTree...");
        const cleanTree = (tree, depth = 0) => {
            if (depth > 20) {
                console.error("Circular reference or too deep tree detected in cleanTree!");
                return;
            }
            tree.forEach(node => {
                if(!node.fontSize) node.fontSize = (node.depth === 0 ? '1.1rem' : (node.depth === 1 ? '1rem' : '0.85rem'));
                if(!node.fontWeight) node.fontWeight = (node.depth === 0 ? '600' : (node.depth === 1 ? '600' : '400'));
                if(!node.color) node.color = '#ffffff';
                if(node.children) cleanTree(node.children, depth + 1);
            });
        };
        cleanTree(customData.navTree);
    }
    
    if(needsSave) saveData();
    console.log("loadData finished");
}

function saveData() {
    localStorage.setItem('aeroDocsData', JSON.stringify(customData));
}

// =========================================
// 3. UI EVENTS
// =========================================
function bindEvents() {
    const el = (id) => document.getElementById(id);
    
    if(el('lock-toggle-btn')) {
        el('lock-toggle-btn').addEventListener('click', () => {
            isLocked = !isLocked;
            localStorage.setItem('crewDeckLocked', isLocked);
            updateLockUI();
            renderNavigation();
            if(currentRouteKey) {
                const data = customData[currentRouteKey];
                if(data) renderDetail(data);
            }
        });
    }

    if(el('home-logo-btn')) {
        el('home-logo-btn').addEventListener('click', () => {
            currentRouteKey = null;
            document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active'));
            el('detail-screen').style.display = 'none';
            el('edit-screen').style.display = 'none';
            el('edit-home-screen').style.display = 'none';
            el('welcome-screen').style.display = 'block';
            renderWelcome();
        });
    }
    
    if(el('add-aircraft-btn')) el('add-aircraft-btn').addEventListener('click', handleAddAircraft);
    if(el('edit-btn')) el('edit-btn').addEventListener('click', handleEditAircraft);
    if(el('cancel-edit-btn')) el('cancel-edit-btn').addEventListener('click', handleCancelEdit);
    if(el('save-edit-btn')) el('save-edit-btn').addEventListener('click', handleSaveEdit);
    if(el('delete-aircraft-btn')) el('delete-aircraft-btn').addEventListener('click', handleDeleteAircraft);
    
    if(el('cancel-home-edit-btn')) {
        el('cancel-home-edit-btn').addEventListener('click', () => {
            loadData(); // 원상 복구
            el('edit-home-screen').style.display = 'none';
            el('welcome-screen').style.display = 'block';
            renderWelcome();
        });
    }
    if(el('save-home-edit-btn')) {
        el('save-home-edit-btn').addEventListener('click', () => {
            saveData();
            el('edit-home-screen').style.display = 'none';
            el('welcome-screen').style.display = 'block';
            renderWelcome();
        });
    }

    document.querySelectorAll('.add-section-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            let newSec;
            if(type === 'staffing') {
                newSec = { id: `s_${Date.now()}`, type: "grid", title: "Duty Code / Minimum Staffing", icon: "users", items: [
                    { key: "최소 탑승 승무원 (Min Staff)", val: "" },
                    { key: "좌석 위치 (Seat Position)", val: "" },
                    { key: "운영 편성 (Configuration)", val: "" }
                ]};
            } else if (type === 'image') {
                newSec = { id: `s_${Date.now()}`, type: "image", title: "사진 자료", icon: "camera", base64: "" };
            } else if (type === 'file') {
                newSec = { id: `s_${Date.now()}`, type: "file", title: "첨부 파일", icon: "file-text", fileData: null, fileName: "", fileType: "", fileSize: 0 };
            } else if (type === 'memo') {
                newSec = { id: `s_${Date.now()}`, type: "memo", title: "자유 메모", icon: "file-edit", content: "" };
            } else {
                newSec = { id: `s_${Date.now()}`, type, title: "새로운 블록", items: [] };
                if(type==='list') newSec.icon = 'alert-circle';
                if(type==='grid') newSec.icon = 'ruler';
                if(type==='links') newSec.icon = 'external-link';
            }
            liveSections.push(newSec);
            renderBuilder();
        });
    });

    if(el('close-modal-btn')) {
        el('close-modal-btn').addEventListener('click', () => el('icon-picker-modal').style.display = 'none');
    }
    
    buildIconPicker();
}

window.submitPwd = function() {
    const pwd = document.getElementById('pwd-input').value;
    if(pwd === "0201") {
        isLocked = false;
        localStorage.setItem('crewDeckLocked', 'false');
        updateLockUI();
        document.getElementById('pwd-modal').style.display = 'none';
        renderWelcome(); // refresh hovers
    } else {
        alert("비밀번호가 틀렸습니다.");
    }
};
window.submitPwdFallback = function() {
    isLocked = false;
    localStorage.setItem('crewDeckLocked', 'false');
    updateLockUI();
    renderWelcome();
};
document.addEventListener('keypress', (e) => {
    if(e.key === 'Enter' && document.getElementById('pwd-modal')?.style.display === 'flex') {
        window.submitPwd();
    }
});

window.appZoom = function(delta) {
    currentZoom += delta;
    if(currentZoom < 50) currentZoom = 50;
    if(currentZoom > 200) currentZoom = 200;
    localStorage.setItem('crewAppZoom', currentZoom);
    applyZoom();
}

function applyZoom() {
    document.documentElement.style.fontSize = `${currentZoom}%`;
    const zoomTextEl = document.getElementById('zoom-level-text');
    if (zoomTextEl) zoomTextEl.innerText = `${currentZoom}%`;
}

function updateLockUI() {
    const lockBtn = document.getElementById('lock-toggle-btn');
    const viewActionContainer = document.getElementById('view-action-container');
    const deleteActionContainer = document.getElementById('delete-action-container');
    
    if(lockBtn) {
        if(isLocked) {
            lockBtn.innerHTML = '<i data-lucide="lock"></i> <span>편집 모드 잠김</span>';
            lockBtn.className = 'btn';
            lockBtn.style.background = 'rgba(255,255,255,0.1)';
            lockBtn.style.color = 'var(--text-main)';
            lockBtn.style.borderColor = 'rgba(255,255,255,0.2)';
            if(viewActionContainer) viewActionContainer.style.display = 'none';
            if(deleteActionContainer) deleteActionContainer.style.display = 'none';
        } else {
            lockBtn.innerHTML = '<i data-lucide="unlock"></i> <span>편집 해제됨</span>';
            lockBtn.className = 'btn warning-btn';
            lockBtn.style.background = ''; lockBtn.style.color = ''; lockBtn.style.borderColor = '';
            if(viewActionContainer) viewActionContainer.style.display = 'flex';
            if(deleteActionContainer) deleteActionContainer.style.display = 'block';
            
            const copyBtn = document.getElementById('copy-all-btn');
            if(copyBtn) copyBtn.style.display = 'flex';
        }
    }

    renderNavigation();

    if(currentRouteKey) {
        renderDetail(customData[currentRouteKey]);
    } else {
        renderWelcome();
    }
}

// =========================================
// 4. RENDERERS
// =========================================
function renderNavigation() {
    console.log("renderNavigation started");
    const navContainer = document.getElementById('nav-container');
    if(!navContainer) return;

    // 현재 열려있는 폴더들 기억
    navContainer.querySelectorAll('.open').forEach(el => {
        // nav-folder-toggle의 부모(titleRow), nav-nested 둘다 class에 open이 붙음
        // 트리구조 식별을 위해 parentNode의 ID등을 찾을수 있으나, 
        // 간단히 'data-folder-id'를 사용하도록 렌더링 시점에 추가하겠음
    });
    
    navContainer.innerHTML = '';
    
    if(!isLocked) {
        const rootAdd = document.createElement('div');
        rootAdd.style.cssText = 'text-align:right; margin-bottom:1rem; width:100%;';
        rootAdd.innerHTML = `
            <div class="nav-root-actions">
                <button class="btn secondary-btn" style="flex:1;" onclick="window.addTreeNode(null, 'folder')"><i data-lucide="folder-plus"></i> 새 그룹</button>
                <button class="btn warning-btn" style="width:auto; padding:0.4rem 0.8rem; background:rgba(245,158,11,0.1); border-color:rgba(245,158,11,0.3); color:#f59e0b;" onclick="window.pasteTreeNode(null)" title="복사한 항목 붙여넣기"><i data-lucide="clipboard-paste" style="width:16px;"></i> 붙여넣기</button>
            </div>`;
        navContainer.appendChild(rootAdd);
    }
    
    function renderNode(node, container, parentArr, idx, depth = 0) {
        if (depth > 20) {
            console.error("renderNode recursion depth exceeded! (Circular reference?)");
            return;
        }
        if(node.type === 'folder') {
            const wrap = document.createElement('div');
            wrap.style.marginBottom = node.depth === 0 ? '2rem' : '0.5rem';
            
            const titleRow = document.createElement('div');
            titleRow.className = 'sidebar-item ' + (node.depth === 0 ? 'nav-group-title' : (node.depth === 1 ? 'nav-maker-title' : 'nav-parent'));

            let fontClass = '';
            if(node.style === 'depth-0') fontClass = 'font-size:1.15rem; font-weight:600;';
            else if(node.style === 'depth-1') fontClass = 'font-size:1rem; font-weight:550; color:#cbd5e1;';
            else if(node.style === 'depth-2') fontClass = 'font-size:0.95rem; font-weight:400; color:#94a3b8;';
            
            if(!node.style) {
                if(node.depth === 0) fontClass = 'font-size:1.15rem; font-weight:600;';
                else if(node.depth === 1) fontClass = 'font-size:1rem; font-weight:550; color:#cbd5e1;';
                else fontClass = 'font-size:0.9rem; font-weight:500; color:white;';
            }
            
            // Calculate CSS
            let dynamicStyle = `font-size:${node.fontSize || '0.9rem'}; font-weight:${node.fontWeight || '400'}; color:${node.color || 'white'};`;
            
            let itemInnerHtml = `
                    ${(!node.hideIcon && (node.depth <= 1 || (node.icon && node.icon !== 'folder'))) ? `<i data-lucide="${node.icon || 'folder'}" style="grid-column:1;"></i>` : '<span></span>'}
                    <span style="${dynamicStyle} pointer-events:none; grid-column:2;">${node.title}</span>
                    ${node.children && node.children.length > 0 ? `<i data-lucide="chevron-right" class="folder-arrow"></i>` : '<span></span>'}
            `;
            titleRow.innerHTML = itemInnerHtml;
            
            if(!isLocked) {
                const ctrls = document.createElement('div');
                ctrls.className = 'sidebar-node-ctrls';
                ctrls.innerHTML = `
                    <button onclick="event.stopPropagation();window.moveTreeNode('${node.id}', -1)" ${idx === 0 ? 'style="opacity:0.3"' : ''} title="위로"><i data-lucide="arrow-up"></i></button>
                    <button onclick="event.stopPropagation();window.moveTreeNode('${node.id}', 1)" ${idx === parentArr.length - 1 ? 'style="opacity:0.3"' : ''} title="아래로"><i data-lucide="arrow-down"></i></button>
                    <button onclick="event.stopPropagation();window.copyTreeNode('${node.id}')" title="복사"><i data-lucide="copy"></i></button>
                    <button onclick="event.stopPropagation();window.pasteTreeNode('${node.id}')" title="이 폴더에 붙여넣기"><i data-lucide="clipboard-paste"></i></button>
                    <button onclick="event.stopPropagation();window.addTreeNode('${node.id}', 'page')" title="문서 추가"><i data-lucide="file-plus"></i></button>
                    <button onclick="event.stopPropagation();window.addTreeNode('${node.id}', 'folder')" title="폴더 추가"><i data-lucide="folder-plus"></i></button>
                    <button onclick="event.stopPropagation();window.openTreeSettings('${node.id}')" title="설정"><i data-lucide="settings"></i></button>
                    <button onclick="event.stopPropagation();window.deleteTreeNode('${node.id}')" class="ctrl-del" title="삭제"><i data-lucide="trash"></i></button>
                `;
                titleRow.appendChild(ctrls);
            }
            
            wrap.appendChild(titleRow);
            
            const nested = document.createElement('ul');
            const isManuallyOpen = openFolderIds.has(node.id);
            if(node.isAlwaysOpen || isManuallyOpen) {
                nested.className = 'nav-nested open';
                titleRow.classList.add('open');
            } else {
                nested.className = 'nav-nested';
            }
            
            titleRow.addEventListener('click', (e) => {
                if(e.target.closest('.sidebar-node-ctrls')) return;
                if(node.isAlwaysOpen) return;
                const isOpen = titleRow.classList.toggle('open');
                nested.classList.toggle('open');
                if(isOpen) openFolderIds.add(node.id);
                else openFolderIds.delete(node.id);
            });
            
            if(node.children) {
                node.children.forEach((child, cIdx) => renderNode(child, nested, node.children, cIdx, depth + 1));
            }
            
            wrap.appendChild(nested);
            container.appendChild(wrap);
            
        } else if (node.type === 'page') {
            const pageData = customData[node.id];
            if(!pageData) return;
            
            const li = document.createElement('li');
            li.className = 'sidebar-item nav-item ' + (currentRouteKey === node.id ? 'active' : '');
            li.dataset.key = node.id;
            li.addEventListener('click', (e) => { 
                if(e.target.closest('.sidebar-node-ctrls')) return;
                e.stopPropagation(); 
                selectNode(li, node.id); 
                closeMobileSidebar(); 
            });
            
            let dynamicStyle = `font-size:${node.fontSize || '0.85rem'}; font-weight:${node.fontWeight || '700'}; color:${node.color || 'white'};`;
            
            li.innerHTML = `
                ${(!node.hideIcon && node.icon && node.icon !== 'file-text') ? `<i data-lucide="${node.icon}"></i>` : '<span></span>'}
                <span style="${dynamicStyle}">${pageData.name || pageData.typeCode || '-'}</span>
            `;
            
            if(!isLocked) {
                const ctrls = document.createElement('span');
                ctrls.className = 'sidebar-node-ctrls';
                ctrls.style.flexShrink = '0';
                ctrls.innerHTML = `
                    <button onclick="event.stopPropagation();window.moveTreeNode('${node.id}', -1)" ${idx === 0 ? 'style="opacity:0.3"' : ''} title="위로"><i data-lucide="arrow-up"></i></button>
                    <button onclick="event.stopPropagation();window.moveTreeNode('${node.id}', 1)" ${idx === parentArr.length - 1 ? 'style="opacity:0.3"' : ''} title="아래로"><i data-lucide="arrow-down"></i></button>
                    <button onclick="event.stopPropagation();window.copyTreeNode('${node.id}')" title="복사"><i data-lucide="copy"></i></button>
                    <button onclick="event.stopPropagation();window.openTreeSettings('${node.id}')" title="설정"><i data-lucide="settings"></i></button>
                    <button onclick="event.stopPropagation();window.deleteTreeNode('${node.id}')" class="ctrl-del" title="삭제"><i data-lucide="trash"></i></button>
                `;
                li.appendChild(ctrls);
            }
            container.appendChild(li);
        }
    }
    
    if(customData.navTree) {
        customData.navTree.forEach((rootNode, i) => renderNode(rootNode, navContainer, customData.navTree, i));
    }
    lucide.createIcons();
}

function findNodeAndParent(tree, id, parentArr = null) {
    if(!tree) return null;
    for(let i=0; i<tree.length; i++) {
        if(tree[i].id === id) return { node: tree[i], parentArr: tree, index: i };
        if(tree[i].children) {
            const found = findNodeAndParent(tree[i].children, id, tree[i].children);
            if(found) return found;
        }
    }
    return null;
}

window.moveTreeNode = function(id, dir) {
    const loc = findNodeAndParent(customData.navTree, id);
    if(!loc) return;
    const { parentArr, index } = loc;
    const swapIdx = index + dir;
    if(swapIdx < 0 || swapIdx >= parentArr.length) return;
    
    const tmp = parentArr[index];
    parentArr[index] = parentArr[swapIdx];
    parentArr[swapIdx] = tmp;
    
    saveData(); renderNavigation();
};

window.deleteTreeNode = function(id) {
    if(!confirm("해당 항목을 정말 삭제하시겠습니까? (폴더일 경우 하위 트리가 전부 소실됩니다)")) return;
    const loc = findNodeAndParent(customData.navTree, id);
    if(!loc) return;
    loc.parentArr.splice(loc.index, 1);
    
    if(customData[id] && id !== 'navTree' && id !== 'homeContent') delete customData[id];
    
    saveData(); renderNavigation();
    
    if(currentRouteKey === id) {
        currentRouteKey = null;
        document.getElementById('detail-screen').style.display='none';
        document.getElementById('welcome-screen').style.display='flex';
    }
};

window.addTreeNode = function(parentId, type) {
    let targetArr = customData.navTree;
    let depth = 0;
    if(parentId) {
        const loc = findNodeAndParent(customData.navTree, parentId);
        if(!loc) return;
        if(loc.node.type !== 'folder') return alert("폴더 안에만 추가할 수 있습니다.");
        if(!loc.node.children) loc.node.children = [];
        targetArr = loc.node.children;
        depth = (loc.node.depth || 0) + 1;
    }
    
    if(type === 'folder') {
        const name = prompt("새 그룹(폴더) 이름을 입력하세요");
        if(!name) return;
        targetArr.push({
            id: 'folder_' + Date.now() + Math.random().toString(36).substr(2, 5),
            type: 'folder',
            title: name,
            icon: depth === 0 ? 'plane' : (depth === 1 ? 'building' : 'folder'),
            depth: depth,
            children: []
        });
        saveData(); renderNavigation();
    } else if (type === 'page') {
        const newKey = "ac_" + Date.now() + Math.random().toString(36).substr(2, 5);
        currentRouteKey = newKey;
        targetArr.push({ id: newKey, type: 'page', icon: 'file-text' });
        
        customData[newKey] = {
            id: newKey,
            name: "새 문서",
            sections: []
        };
        saveData();
        openEditScreen(customData[newKey]);
    }
};

window.copyTreeNode = function(id) {
    const loc = findNodeAndParent(customData.navTree, id);
    if(!loc) return alert("항목을 찾을 수 없습니다.");
    
    const nodeToCopy = loc.node;
    const copiedPages = {};
    
    // Recursive data gatherer
    function collectData(node) {
        if(node.type === 'page') {
            if(customData[node.id]) {
                copiedPages[node.id] = customData[node.id];
            }
        } else if(node.type === 'folder' && node.children) {
            node.children.forEach(collectData);
        }
    }
    
    collectData(nodeToCopy);
    
    const clipboardData = {
        nodeStructure: nodeToCopy,
        pages: copiedPages
    };
    
    localStorage.setItem('crewClipboardTree', JSON.stringify(clipboardData));
    alert(`${nodeToCopy.type === 'folder' ? '그룹(폴더)' : '문서'}가 복사되었습니다. 다른 곳에서 붙여넣기 하세요.`);
};

window.pasteTreeNode = function(parentId) {
    const raw = localStorage.getItem('crewClipboardTree');
    if(!raw) return alert("복사된 항목이 없습니다.");
    
    let data;
    try { data = JSON.parse(raw); } catch(e) { return alert("데이터가 올바르지 않습니다."); }
    
    let targetArr = customData.navTree;
    let depth = 0;
    
    if(parentId) {
        const loc = findNodeAndParent(customData.navTree, parentId);
        if(!loc) return;
        
        // If target is a page, paste into its parent folder
        if(loc.node.type === 'page') {
            if(loc.parent) {
                targetArr = loc.parent.children;
                depth = loc.node.depth;
            } else {
                targetArr = customData.navTree;
                depth = 0;
            }
        } else {
            // Target is a folder
            if(!loc.node.children) loc.node.children = [];
            targetArr = loc.node.children;
            depth = (loc.node.depth || 0) + 1;
        }
    }
    
    // Recursive ID re-mapper and cloner
    function cloneStructure(node, newDepth) {
        const newNode = JSON.parse(JSON.stringify(node));
        const oldId = node.id;
        const suffix = "_" + Math.random().toString(36).substr(2, 4);
        
        if(node.type === 'folder') {
            newNode.id = 'folder_' + Date.now() + suffix;
            newNode.title = newNode.title + " (복사)";
            newNode.depth = newDepth;
            if(newNode.children) {
                newNode.children = newNode.children.map(c => cloneStructure(c, newDepth + 1));
            }
        } else {
            newNode.id = 'ac_' + Date.now() + suffix;
            newNode.depth = newDepth;
            // Original data clone
            if(data.pages[oldId]) {
                const newPageData = JSON.parse(JSON.stringify(data.pages[oldId]));
                newPageData.id = newNode.id;
                newPageData.name = (newPageData.name || "복사된 문서") + " (복사)";
                customData[newNode.id] = newPageData;
            } else {
                // Fallback for missing data
                customData[newNode.id] = { id: newNode.id, name: "복사된 문서", sections: [] };
            }
        }
        return newNode;
    }
    
    const pastedNode = cloneStructure(data.nodeStructure, depth);
    targetArr.push(pastedNode);
    
    saveData();
    renderNavigation();
    alert("성공적으로 붙여넣기 되었습니다.");
};

window.openTreeSettings = function(id) {
    const loc = findNodeAndParent(customData.navTree, id);
    if(!loc) return;
    const node = loc.node;
    
    document.getElementById('tree-node-id').value = id;
    if(node.type === 'page') document.getElementById('tree-node-title').value = customData[id].name || '';
    else document.getElementById('tree-node-title').value = node.title || '';
    
    document.getElementById('tree-node-icon').value = node.icon || (node.type==='page'? 'file-text' : 'folder');
    document.getElementById('tree-node-icon-btn').innerHTML = `<i data-lucide="${node.icon || (node.type==='page'? 'file-text' : 'folder')}"></i>`;
    
    document.getElementById('tree-node-size').value = node.fontSize || '0.85rem';
    document.getElementById('tree-node-weight').value = node.fontWeight || '400';
    document.getElementById('tree-node-color').value = node.color || '#ffffff';
    document.getElementById('tree-node-color-text').value = node.color || '#ffffff';
    document.getElementById('tree-node-always-open').checked = !!node.isAlwaysOpen;
    document.getElementById('tree-node-hide-icon').checked = !!node.hideIcon;

    const colorPicker = document.getElementById('tree-node-color');
    const colorText = document.getElementById('tree-node-color-text');
    colorPicker.oninput = () => { colorText.value = colorPicker.value.toUpperCase(); };
    colorText.oninput = () => { if(/^#[0-9A-F]{6}$/i.test(colorText.value)) colorPicker.value = colorText.value; };

    // 부모 폴더 목록 채우기...
    const parentSelect = document.getElementById('tree-node-parent');
    parentSelect.innerHTML = '<option value="">(최상위 루트)</option>';
    
    function addFolders(tree, depthStr = '') {
        tree.forEach(n => {
            if(n.type === 'folder' && n.id !== id) {
                const opt = document.createElement('option');
                opt.value = n.id;
                opt.textContent = depthStr + n.title;
                parentSelect.appendChild(opt);
                if(n.children) addFolders(n.children, depthStr + '　');
            }
        });
    }
    addFolders(customData.navTree);

    // [BUG FIX] Get correct parent ID from navTree, not customData flat keys
    function getParentFolderId(nodeId) {
        function findParent(tree, targetId, parentId = '') {
            for (let node of tree) {
                if (node.id === targetId) return parentId;
                if (node.children) {
                    let res = findParent(node.children, targetId, node.id);
                    if (res !== null) return res;
                }
            }
            return null;
        }
        return findParent(customData.navTree, nodeId) || '';
    }
    parentSelect.value = getParentFolderId(id);

    document.getElementById('tree-node-modal').style.display='flex';
    lucide.createIcons();
};

window.saveTreeNodeSettings = function() {
    const id = document.getElementById('tree-node-id').value;
    const loc = findNodeAndParent(customData.navTree, id);
    if(!loc) return;
    const node = loc.node;
    
    node.icon = document.getElementById('tree-node-icon').value;
    node.fontSize = document.getElementById('tree-node-size').value;
    node.fontWeight = document.getElementById('tree-node-weight').value;
    node.color = document.getElementById('tree-node-color-text').value;
    node.isAlwaysOpen = document.getElementById('tree-node-always-open').checked;
    node.hideIcon = document.getElementById('tree-node-hide-icon').checked;
    
    const newTitle = document.getElementById('tree-node-title').value;
    if(node.type === 'page') customData[id].name = newTitle;
    else node.title = newTitle;
    
    // 소속 폴더 이동 로직
    const newParentId = document.getElementById('tree-node-parent').value;
    const currentLoc = findNodeAndParent(customData.navTree, id);
    const oldParentArr = currentLoc.parentArr;
    
    let targetArr = customData.navTree;
    let newDepth = 0;
    if(newParentId) {
        const pLoc = findNodeAndParent(customData.navTree, newParentId);
        if(pLoc && pLoc.node.children) {
            targetArr = pLoc.node.children;
            newDepth = (pLoc.node.depth || 0) + 1;
        }
    }

    if(oldParentArr !== targetArr) {
        oldParentArr.splice(currentLoc.index, 1);
        targetArr.push(node);
        node.depth = newDepth;
        // Recursive depth update if folder
        if(node.type === 'folder') {
            const updateDepth = (n, d) => {
                n.depth = d;
                if(n.children) n.children.forEach(child => updateDepth(child, d+1));
            };
            updateDepth(node, newDepth);
        }
    }
    
    saveData();
    document.getElementById('tree-node-modal').style.display='none';
    renderNavigation();
    if(node.type === 'page' && currentRouteKey === id) renderDetail(customData[id]);
};

window.pickTreeIcon = function() {
    openIconPicker(sel => {
        document.getElementById('tree-node-icon').value = sel;
        document.getElementById('tree-node-icon-btn').innerHTML = `<i data-lucide="${sel}"></i>`;
        lucide.createIcons();
    });
};

function selectNode(el, key) {
    document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active'));
    el.classList.add('active');
    currentRouteKey = key;
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('edit-home-screen').style.display = 'none';
    renderDetail(customData[key]);
}

window.openHomeEditor = function() {
    document.getElementById('welcome-screen').style.display='none';
    document.getElementById('edit-home-screen').style.display='block';
    renderHomeEditor();
}

function renderWelcome() {
    const welcomeScreen = document.getElementById('welcome-screen');
    if(!welcomeScreen) return;
    
    // Clear display status for this scenario
    document.getElementById('detail-screen').style.display = 'none';
    document.getElementById('edit-screen').style.display = 'none';
    document.getElementById('edit-home-screen').style.display = 'none';
    
    let finalHtml = ``;
    
    if(!isLocked) {
        finalHtml += `<div style="text-align:right; margin-bottom:1rem; width:100%;"><button class="btn warning-btn" onclick="openHomeEditor()"><i data-lucide="edit-3"></i> 홈 화면 위젯 편집하기</button></div>`;
    }

    finalHtml += `<div style="display:flex; flex-wrap:wrap; gap:1.5rem; justify-content:center; width:100%;">`;
    
    function getWidthStyle(item) {
        if(item.isFullWidth) return 'width:100%; margin-bottom:1.5rem;';
        if(item.isHalfWidth) return 'width:calc(50% - 0.75rem); min-width:280px; margin-bottom:1.5rem;';
        return 'max-width:480px; margin:0 auto 1.5rem auto; width:100%;';
    }

    const hc = customData.homeContent || [];
    hc.forEach((item, idx) => {
        // Auto compact link widgets if no size is specified
        if (item.type === 'link' && item.isHalfWidth === undefined && item.isFullWidth === undefined) {
            item.isHalfWidth = true;
        }
        let isCard = true;
        let wHtml = '';
        if(item.type === 'text' && item.isHeader) {
            isCard = false;
            wHtml = `<div style="text-align:center; margin-bottom:2rem; width:100%; position:relative;">
                        <i data-lucide="${item.icon || 'star'}" class="huge-icon" style="margin-bottom:1rem;color:white;"></i>
                        <h2 style="margin-bottom:0.5rem;font-size:1.8rem;">${item.title}</h2>
                        <p style="color:var(--text-muted);font-size:1.05rem;">${(item.content||'').replace(/\n/g,'<br>')}</p>
                     </div>`;
        } else if(item.type === 'text') {
            wHtml = `<div class="card ${item.isFullWidth?'full-width':''}" style="position:relative; ${getWidthStyle(item)}">
                        <h3 style="margin-bottom:0.8rem; display:flex; align-items:center; gap:0.5rem;"><i data-lucide="${item.icon||'info'}"></i> ${item.title}</h3>
                        <p style="font-size:0.95rem; color:var(--text-main); line-height:1.6; white-space:pre-wrap;">${item.content}</p>
                     </div>`;
        } else if(item.type === 'link') {
            wHtml = `<div class="card ${item.isFullWidth?'full-width':''}" style="position:relative; ${getWidthStyle(item)} text-align:left;">
                        <a href="${item.url}" target="_blank" class="link-btn" style="width:100%;"><div class="link-icon"><i data-lucide="${item.icon||'link'}"></i></div><div class="link-text"><span class="link-title">${item.title}</span><span class="link-sub">${item.content || '새 창으로 열기'}</span></div></a>
                     </div>`;
        } else if(item.type === 'calc') {
            wHtml = `<div class="card ${item.isFullWidth?'full-width':''}" style="position:relative; ${getWidthStyle(item)} text-align:left;">
                        <h3 style="margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;"><i data-lucide="${item.icon||'calculator'}"></i> ${item.title || '승무원 탑승 기준 계산기'}</h3>
                        <div id="calc-root"></div>
                     </div>`;
        } else if(item.type === 'gate') {
            wHtml = `<div class="card ${item.isFullWidth?'full-width':''}" style="position:relative; ${getWidthStyle(item)} text-align:left;">
                        <h3 style="margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem; color:#38bdf8;"><i data-lucide="${item.icon||'map-pin'}"></i> ${item.title || 'T2 게이트 검색'}</h3>
                        <div style="display:flex; gap:0.5rem; margin-bottom:1rem;"><input type="number" id="gate-input" class="cms-input" style="background:rgba(255,255,255,0.05); font-size:1rem;" placeholder="${item.content || '배정 게이트 (예: 254)'}"><button class="btn secondary-btn" onclick="runGateSearch()" style="width:auto; white-space:nowrap;"><i data-lucide="navigation"></i> 탐색</button></div>
                        <div id="gate-result" style="display:none; padding:1rem; border-radius:8px; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1);"></div>
                     </div>`;
        } else if(item.type === 'sync') {
            wHtml = `<div class="card ${item.isFullWidth?'full-width':''}" style="position:relative; ${getWidthStyle(item)} text-align:left; border:1px solid var(--accent); background:rgba(56,189,248,0.05);">
                        <h3 style="margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem; color:var(--accent);"><i data-lucide="${item.icon||'smartphone'}"></i> ${item.title}</h3>
                        <div style="display:flex; flex-direction:column; gap:0.75rem;">
                            <div style="display:flex; gap:0.5rem;">
                                <button class="btn secondary-btn" onclick="exportSync()" style="flex:1; border:1px solid rgba(56,189,248,0.3); background:rgba(56,189,248,0.05); color:var(--accent); font-size:0.85rem;">
                                    <i data-lucide="share-2"></i> <span>내보내기</span>
                                </button>
                                <button class="btn secondary-btn" onclick="importSync()" style="flex:1; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.03); color:white; font-size:0.85rem;">
                                    <i data-lucide="download"></i> <span>불러오기</span>
                                </button>
                            </div>
                            <button class="btn warning-btn" onclick="exportPortableManual()" style="width:100%; font-size:0.85rem; background:#f59e0b; border-color:#d97706; color:white;">
                                <i data-lucide="package-check"></i> 나만의 매뉴얼 전용 파일로 저장 (휴대용)
                            </button>
                        </div>
                     </div>`;
        } else if(item.type === 'flight') {
            wHtml = `<div class="card ${item.isFullWidth?'full-width':''}" style="position:relative; ${getWidthStyle(item)} text-align:left;">
                        <h3 style="margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;"><i data-lucide="${item.icon||'plane-takeoff'}"></i> ${item.title}</h3>
                        <div style="display:flex; gap:0.5rem;"><input type="text" id="flight-aware-input" class="cms-input" style="background:rgba(255,255,255,0.05); font-size:1rem;" placeholder="${item.content || '편명(예: KE123)'}"><button class="btn" onclick="runFlightSearch()" style="width:auto; white-space:nowrap;"><i data-lucide="search"></i> 조회</button></div>
                     </div>`;
        } else if(item.type === 'clock') {
            wHtml = `<div class="card ${item.isFullWidth?'full-width':''}" style="position:relative; ${getWidthStyle(item)} text-align:left;">
                        <h3 style="margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem;"><i data-lucide="${item.icon||'clock'}"></i> ${item.title||'현재 시간'}</h3>
                        <div id="clock-widget-${idx}" style="font-size:2rem; font-weight:bold; color:var(--text-main); text-align:center; padding:1.5rem; background:rgba(0,0,0,0.2); border-radius:8px;"></div>
                     </div>`;
        } else if(item.type === 'weather') {
            wHtml = `<div class="card ${item.isFullWidth?'full-width':''}" style="position:relative; ${getWidthStyle(item)} text-align:left;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
                            <h3 style="margin:0; display:flex; align-items:center; gap:0.5rem;"><i data-lucide="${item.icon||'cloud-sun'}"></i> ${item.title||'비행 날씨 조회'}</h3>
                            <button class="search-trigger-btn" onclick="toggleWeatherSearch(${idx})" title="전 세계 도시 검색"><i data-lucide="search"></i></button>
                        </div>
                        
                        <!-- Search Bar (Hidden by default) -->
                        <div id="weather-search-bar-${idx}" class="weather-search-bar" style="display:none;">
                            <div style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">
                                <input type="text" id="weather-search-input-${idx}" class="cms-input" placeholder="City name (English)..." onkeypress="if(e.key==='Enter') searchWeatherCity(${idx})">
                                <button class="btn" style="width:auto; padding:0.4rem 0.6rem;" onclick="searchWeatherCity(${idx})"><i data-lucide="search"></i></button>
                            </div>
                            <div id="weather-search-results-${idx}" class="weather-search-results"></div>
                        </div>

                        <div class="weather-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; background:rgba(0,0,0,0.25); border-radius:12px; padding:1rem; min-height:120px;">
                            <div id="weather-left-${idx}" class="weather-col" style="border-right:1px solid rgba(255,255,255,0.1);">
                                <div class="weather-loading">Loading...</div>
                            </div>
                            <div id="weather-right-${idx}" class="weather-col">
                                <div class="weather-loading">Loading...</div>
                            </div>
                        </div>
                     </div>`;
            setTimeout(() => {
                updateWeatherWidget(idx, item.url || 'Seoul', false);
                updateWeatherWidget(idx, item.lastSearch || 'Tokyo', true);
            }, 100);
        }

        if(!isLocked && isCard) {
            const controlsStr = `
                <div class="hover-controls">
                    <button class="hover-btn" onclick="window.moveHomeItemWelcome(${idx}, -1)" ${idx===0?'style="opacity:0.3"':''} title="위로"><i data-lucide="arrow-up"></i></button>
                    <button class="hover-btn" onclick="window.moveHomeItemWelcome(${idx}, 1)" ${idx===hc.length-1?'style="opacity:0.3"':''} title="아래로"><i data-lucide="arrow-down"></i></button>
                    <button class="hover-btn" onclick="window.toggleHomeItemHalfWidthWelcome(${idx})" title="절반 크기"><i data-lucide="columns"></i></button>
                    <button class="hover-btn" onclick="window.toggleHomeItemWidthWelcome(${idx})" title="크기 변경"><i data-lucide="${item.isFullWidth ? 'minimize-2' : 'maximize-2'}"></i></button>
                    <button class="hover-btn" style="color:#ef4444;" onclick="if(confirm('이 위젯을 삭제할까요?')) { customData.homeContent.splice(${idx},1); saveData(); renderWelcome(); }" title="삭제"><i data-lucide="trash-2"></i></button>
                    <button class="hover-btn" style="color:#f59e0b;" onclick="openHomeEditor()" title="상세 전체 편집 진입"><i data-lucide="edit-3"></i></button>
                </div>
            `;
            wHtml = wHtml.replace(/<\/div>$/, controlsStr + '</div>');
        }

        finalHtml += wHtml;
    });

    finalHtml += `</div>`;
    welcomeScreen.innerHTML = finalHtml;
    
    if(hc.some(i => i.type === 'calc')) {
        renderCalc();
    }
    
    if(window.clockInterval) clearInterval(window.clockInterval);
    window.clockInterval = setInterval(() => {
        const hcNow = customData.homeContent || [];
        hcNow.forEach((it, i) => {
            if(it.type === 'clock') {
                const el = document.getElementById('clock-widget-' + i);
                if(el) {
                    const d = new Date();
                    const days = ['일','월','화','수','목','금','토'];
                    const utcDays = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
                    
                    // KST (UTC+9) Calculation
                    const kstOffset = 9 * 60 * 60 * 1000;
                    const kstDate = new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + kstOffset);
                    
                    const kstHours = String(kstDate.getHours()).padStart(2,'0');
                    const kstMinutes = String(kstDate.getMinutes()).padStart(2,'0');
                    const kstSeconds = String(kstDate.getSeconds()).padStart(2,'0');
                    const kstDateStr = `${kstDate.getFullYear()}.${kstDate.getMonth()+1}.${kstDate.getDate()}`;
                    
                    const utcDate = `${d.getUTCFullYear()}.${d.getUTCMonth()+1}.${d.getUTCDate()}`;
                    const utcDay = utcDays[d.getUTCDay()];
                    const utcTime = `${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}:${String(d.getUTCSeconds()).padStart(2,'0')}`;
                    
                    el.innerHTML = `
                        <div style="color:var(--text-muted); font-size:0.9rem; margin-bottom:0.4rem;">${kstDateStr} (${days[kstDate.getDay()]})</div>
                        <div style="font-size:1.8rem; font-weight:bold; color:var(--text-main); margin-bottom:0.6rem;">${kstHours}:${kstMinutes}:${kstSeconds}</div>
                        <div style="color:var(--accent); font-size:1.1rem; font-weight:600; margin-top:0.6rem; border-top:1px dashed rgba(255,255,255,0.1); padding-top:0.6rem;">
                            <span style="font-size:0.8rem; opacity:0.8; margin-right:5px;">UTC ${utcDate} (${utcDay})</span><br>
                            ${utcTime}
                        </div>
                    `;
                }
            }
        });
    }, 1000);
    
    const gateInput = document.getElementById('gate-input');
    if(gateInput) gateInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') runGateSearch(); });
    
    const flightInput = document.getElementById('flight-aware-input');
    if(flightInput) flightInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') runFlightSearch(); });

    lucide.createIcons();
}

window.runGateSearch = () => {
    const gText = document.getElementById('gate-input').value.trim();
    const gNum = parseInt(gText, 10);
    const res = document.getElementById('gate-result');
    
    if(!gNum) {
        alert("조회하실 인천공항 T2 게이트 번호(208~291)를 숫자로 입력해주세요.");
        return;
    }
    res.style.display = 'block';
    
    let badgeHtml = '';
    let descHtml = '';
    
    if(gNum === 250 || gNum === 251) {
        badgeHtml = '<span style="background:#8b5cf6; color:white; padding:0.2rem 0.6rem; border-radius:4px; font-weight:bold; font-size:1.1rem; letter-spacing:1px;">1A 또는 2D (양방향 동일)</span>';
        descHtml = '터미널 <b>정중앙 게이트</b>입니다!<br>1A(동편)와 2D(서편) 출국장 모두 거리가 비슷하므로 그날 대기줄이 더 짧은 곳으로 눈치껏 가시는 것이 가장 현명합니다.<br>(1A 운영: 05시~24시 / 2D 운영: 06시~19시)';
    } else if(gNum >= 252 && gNum <= 291) {
        badgeHtml = '<span style="background:#2563eb; color:white; padding:0.2rem 0.6rem; border-radius:4px; font-weight:bold; font-size:1.1rem; letter-spacing:1px;">2D 출국장</span>';
        descHtml = '운영시간: <b>06시 ~ 19시</b><br>왼쪽(서편) 블록 게이트입니다. 지정하신 탑승구는 2D 출국장(검색대)을 이용하시는 것이 가장 빠릅니다!';
    } else if(gNum >= 208 && gNum <= 249) {
        badgeHtml = '<span style="background:#ef4444; color:white; padding:0.2rem 0.6rem; border-radius:4px; font-weight:bold; font-size:1.1rem; letter-spacing:1px;">1A 출국장</span>';
        descHtml = '운영시간: <b>05시 ~ 24시</b><br>오른쪽(동편) 블록 게이트입니다. 지정하신 탑승구는 1A 출국장(검색대)을 이용하시는 것이 가장 빠릅니다!';
    } else {
        res.innerHTML = `<div style="color:var(--text-muted)">입력하신 ${gNum}번은 인천 T2 메인 게이트 구역(208~291)이 아닙니다. 다시 확인해주세요.</div>`;
        return;
    }
    
    res.innerHTML = `
        <div style="margin-bottom:0.75rem; font-size:1.1rem;">추천: ${badgeHtml}</div>
        <div style="color:var(--text-main); font-size:0.95rem; line-height:1.6;">${descHtml}</div>
        <div style="margin-top:1rem; font-size:0.9rem; color:#f59e0b; padding-top:0.75rem; border-top:1px dashed rgba(245,158,11,0.3); line-height:1.5;">
            <i data-lucide="moon" style="width:16px; height:16px; margin-bottom:-3px;"></i> <b>심야 00시 ~ 05시 미운영 시간:</b><br>
            ➔ 가장자리에 위치한 <b>교통약자우대출구 (E카운터 인근)</b>를 이용하셔야 합니다.
        </div>
    `;
    lucide.createIcons();
};

window.runFlightSearch = () => {
    const inputEl = document.getElementById('flight-aware-input');
    const input = inputEl ? inputEl.value.trim() : '';
    if(input) window.open('https://ko.flightaware.com/live/flight/' + encodeURIComponent(input), '_blank');
    else alert("조회할 편명이나 테일 넘버를 입력해주세요!");
};

window.moveHomeItemWelcome = function(idx, dir) {
    const hc = customData.homeContent;
    if(dir===-1 && idx>0) {
        let t = hc[idx-1]; hc[idx-1] = hc[idx]; hc[idx] = t;
        saveData(); renderWelcome();
    } else if (dir===1 && idx<hc.length-1) {
        let t = hc[idx+1]; hc[idx+1] = hc[idx]; hc[idx] = t;
        saveData(); renderWelcome();
    }
};
window.toggleHomeItemWidthWelcome = function(idx) {
    customData.homeContent[idx].isFullWidth = !customData.homeContent[idx].isFullWidth;
    if(customData.homeContent[idx].isFullWidth) customData.homeContent[idx].isHalfWidth = false;
    saveData(); renderWelcome();
};
window.toggleHomeItemHalfWidthWelcome = function(idx) {
    customData.homeContent[idx].isHalfWidth = !customData.homeContent[idx].isHalfWidth;
    if(customData.homeContent[idx].isHalfWidth) customData.homeContent[idx].isFullWidth = false;
    saveData(); renderWelcome();
};

function renderHomeEditor() {
    const hc = customData.homeContent;
    const container = document.getElementById('edit-home-sections-container');
    if(!container) return;
    
    container.innerHTML = '';
    hc.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'card full-width';
        let typeOptions = `
            <option value="text" ${item.type==='text'&&!item.isHeader?'selected':''}>일반 텍스트 위젯</option>
            <option value="header_text" ${item.type==='text'&&item.isHeader?'selected':''}>메인 타이틀(헤더)</option>
            <option value="link" ${item.type==='link'?'selected':''}>외부 링크</option>
            <option value="calc" ${item.type==='calc'?'selected':''}>동적 엑셀 계산기</option>
            <option value="gate" ${item.type==='gate'?'selected':''}>T2 게이트 안내</option>
            <option value="flight" ${item.type==='flight'?'selected':''}>자동 항로/편명 조회</option>
            <option value="sync" ${item.type==='sync'?'selected':''}>데이터 동기화 위젯</option>
            <option value="clock" ${item.type==='clock'?'selected':''}>현재 날짜/시간 시계</option>
            <option value="weather" ${item.type==='weather'?'selected':''}>실시간 날씨 위젯</option>
        `;
        let contentHtml = '';
        if(item.type === 'text') contentHtml = `<textarea class="cms-input" style="height:80px; margin-top:0.5rem;" oninput="customData.homeContent[${idx}].content=this.value">${item.content||''}</textarea>`;
        else if(item.type === 'link') {
            contentHtml = `<div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
                              <input type="text" class="cms-input" style="flex:2;" oninput="customData.homeContent[${idx}].url=this.value" placeholder="https:// URL 입력" value="${item.url||''}">
                              <input type="text" class="cms-input" style="flex:1;" oninput="customData.homeContent[${idx}].content=this.value" placeholder="버튼 설명(예: 새 창 열기)" value="${item.content||''}">
                           </div>`;
        } else if(item.type === 'gate' || item.type === 'flight') {
            contentHtml = `<input type="text" class="cms-input" style="margin-top:0.5rem;" oninput="customData.homeContent[${idx}].content=this.value" placeholder="입력칸 배경글자(Placeholder) 수정" value="${item.content||''}">`;
        } else if(item.type === 'sync') {
            contentHtml = `<div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
                              <input type="text" class="cms-input" style="flex:1;" oninput="customData.homeContent[${idx}].content=this.value" placeholder="${item.content || '내보내기 버튼명 수정'}" value="${item.content||''}">
                              <input type="text" class="cms-input" style="flex:1;" oninput="customData.homeContent[${idx}].url=this.value" placeholder="${item.url || '붙여넣기 버튼명 수정'}" value="${item.url||''}">
                           </div>`;
        } else if(item.type === 'weather') {
            contentHtml = `<div style="display:flex; gap:0.5rem; margin-top:0.5rem;">
                               <select class="cms-input" style="flex:1;" onchange="customData.homeContent[${idx}].url=this.value; renderHomeEditor();">
                                   <option value="Seoul" ${item.url==='Seoul'?'selected':''}>서울 (Seoul)</option>
                                   <option value="Incheon" ${item.url==='Incheon'?'selected':''}>인천 (ICN)</option>
                                   <option value="Gimpo" ${item.url==='Gimpo'?'selected':''}>김포 (GMP)</option>
                                   <option value="Busan" ${item.url==='Busan'?'selected':''}>부산 (PUS)</option>
                                   <option value="Jeju" ${item.url==='Jeju'?'selected':''}>제주 (CJU)</option>
                               </select>
                               <input type="text" class="cms-input" style="flex:1;" oninput="customData.homeContent[${idx}].content=this.value" placeholder="표시 설명 (예: 공항 날씨)" value="${item.content||''}">
                           </div>`;
        }

        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; gap:1rem;">
                <div style="display:flex; gap:0.5rem; align-items:center; flex:1;">
                    <button class="builder-icon-btn" onclick="window.pickHomeIcon(${idx})"><i data-lucide="${item.icon||'box'}"></i></button>
                    <select class="cms-input" style="width:160px;" onchange="window.changeHomeItemType(${idx}, this.value)">${typeOptions}</select>
                    <input type="text" class="cms-input" style="flex:1;" value="${item.title||''}" placeholder="위젯 제목" oninput="customData.homeContent[${idx}].title=this.value">
                </div>
                <div style="display:flex; gap:0.3rem;">
                    <button class="builder-icon-btn" onclick="window.moveHomeItem(${idx}, -1)" title="위로"><i data-lucide="arrow-up"></i></button>
                    <button class="builder-icon-btn" onclick="window.moveHomeItem(${idx}, 1)" title="아래로"><i data-lucide="arrow-down"></i></button>
                    <button class="builder-icon-btn" onclick="window.toggleHomeItemHalfWidth(${idx})" title="절반 크기"><i data-lucide="columns"></i></button>
                    <button class="builder-icon-btn" onclick="window.toggleHomeItemWidth(${idx})" title="크기 변경"><i data-lucide="${item.isFullWidth ? 'minimize-2' : 'maximize-2'}"></i></button>
                    <button class="btn danger-btn" style="padding:0.4rem 0.6rem; width:auto; margin-left:0.5rem;" onclick="window.deleteHomeItem(${idx})"><i data-lucide="trash-2"></i> 삭제</button>
                </div>
            </div>
            ${contentHtml}
        `;
        container.appendChild(card);
    });
    const addBtn = document.createElement('button'); addBtn.className = "btn secondary-btn full-width"; addBtn.innerHTML = `<i data-lucide="plus"></i> 새 위젯 추가`;
    addBtn.onclick = () => { hc.push({type:'text', title:'새 위젯', content:''}); renderHomeEditor(); };
    container.appendChild(addBtn);
    lucide.createIcons();
}

// Global functions for Home Editor attributes
window.pickHomeIcon = function(idx) {
    openIconPicker(sel => { customData.homeContent[idx].icon=sel; renderHomeEditor(); });
};
window.changeHomeItemType = function(idx, val) {
    if(val==='header_text') { customData.homeContent[idx].type='text'; customData.homeContent[idx].isHeader=true; }
    else { customData.homeContent[idx].type=val; customData.homeContent[idx].isHeader=false; }
    renderHomeEditor();
};
window.moveHomeItem = function(idx, dir) {
    const hc = customData.homeContent;
    if(dir===-1 && idx>0) {
        let t = hc[idx-1]; hc[idx-1] = hc[idx]; hc[idx] = t;
        renderHomeEditor();
    } else if (dir===1 && idx<hc.length-1) {
        let t = hc[idx+1]; hc[idx+1] = hc[idx]; hc[idx] = t;
        renderHomeEditor();
    }
};
window.toggleHomeItemWidth = function(idx) {
    customData.homeContent[idx].isFullWidth = !customData.homeContent[idx].isFullWidth;
    if(customData.homeContent[idx].isFullWidth) customData.homeContent[idx].isHalfWidth = false;
    renderHomeEditor();
};
window.toggleHomeItemHalfWidth = function(idx) {
    customData.homeContent[idx].isHalfWidth = !customData.homeContent[idx].isHalfWidth;
    if(customData.homeContent[idx].isHalfWidth) customData.homeContent[idx].isFullWidth = false;
    renderHomeEditor();
};
window.moveHomeItemAndSave = function(idx, dir) {
    const hc = customData.homeContent;
    if(dir===-1 && idx>0) {
        let t = hc[idx-1]; hc[idx-1] = hc[idx]; hc[idx] = t;
        saveData(); renderWelcome();
    } else if (dir===1 && idx<hc.length-1) {
        let t = hc[idx+1]; hc[idx+1] = hc[idx]; hc[idx] = t;
        saveData(); renderWelcome();
    }
};
window.toggleHomeItemWidthAndSave = function(idx) {
    customData.homeContent[idx].isFullWidth = !customData.homeContent[idx].isFullWidth;
    if(customData.homeContent[idx].isFullWidth) customData.homeContent[idx].isHalfWidth = false;
    saveData();
    renderWelcome();
};
window.toggleHomeItemHalfWidthAndSave = function(idx) {
    customData.homeContent[idx].isHalfWidth = !customData.homeContent[idx].isHalfWidth;
    if(customData.homeContent[idx].isHalfWidth) customData.homeContent[idx].isFullWidth = false;
    saveData();
    renderWelcome();
};
window.deleteHomeItem = function(idx) {
    customData.homeContent.splice(idx, 1);
    renderHomeEditor();
};

async function updateWeatherWidget(idx, location, isRightSide = false) {
    const targetId = isRightSide ? `weather-right-${idx}` : `weather-left-${idx}`;
    const el = document.getElementById(targetId);
    if(!el) return;
    
    // Expanded coordinates (Hardcoded hubs)
    const coords = {
        'Seoul': { lat: 37.566, lon: 126.978 },
        'Incheon': { lat: 37.46, lon: 126.44 },
        'Gimpo': { lat: 37.55, lon: 126.79 },
        'Busan': { lat: 35.17, lon: 129.07 },
        'Jeju': { lat: 33.48, lon: 126.48 },
        'Tokyo': { lat: 35.77, lon: 140.38 }, 
        'HongKong': { lat: 22.31, lon: 113.91 }, 
        'Singapore': { lat: 1.36, lon: 103.99 }, 
        'Bangkok': { lat: 13.69, lon: 100.75 }, 
        'Paris': { lat: 49.00, lon: 2.54 }, 
        'London': { lat: 51.47, lon: -0.45 }, 
        'Frankfurt': { lat: 50.03, lon: 8.57 }, 
        'Dubai': { lat: 25.25, lon: 55.36 }, 
        'NewYork': { lat: 40.64, lon: -73.77 }, 
        'LosAngeles': { lat: 33.94, lon: -118.40 }, 
        'SanFrancisco': { lat: 37.61, lon: -122.37 }, 
        'Sydney': { lat: -33.93, lon: 151.17 } 
    };

    let lat, lon, cityName = location;
    
    if(typeof location === 'string' && coords[location]) {
        lat = coords[location].lat;
        lon = coords[location].lon;
    } else if (typeof location === 'object' && location.latitude) {
        lat = location.latitude;
        lon = location.longitude;
        cityName = location.name;
    } else {
        // Fallback or dynamic search if location is just a name not in hubs
        lat = 37.566; lon = 126.978; 
    }
    
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        const w = data.current_weather;
        
        let iconHtml = '☀️';
        if(w.weathercode >= 1 && w.weathercode <= 3) iconHtml = '⛅';
        else if(w.weathercode >= 45 && w.weathercode <= 48) iconHtml = '🌫️';
        else if(w.weathercode >= 51 && w.weathercode <= 67) iconHtml = '🌧️';
        else if(w.weathercode >= 71 && w.weathercode <= 86) iconHtml = '❄️';
        else if(w.weathercode >= 95) iconHtml = '⛈️';
        
        el.innerHTML = `
            <div style="font-size:1.8rem; margin-bottom:0.2rem;">${iconHtml}</div>
            <div style="font-size:1.3rem; font-weight:bold; color:var(--text-main);">${w.temperature}°C</div>
            <div style="color:var(--text-muted); font-size:0.8rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%; border-top:1px solid rgba(255,255,255,0.05); margin-top:0.3rem; padding-top:0.3rem;">${cityName}</div>
        `;
    } catch(e) {
        el.innerHTML = `<div style="color:#ef4444; font-size:0.8rem;">(Network Error)</div>`;
    }
}

window.toggleWeatherSearch = function(idx) {
    const bar = document.getElementById(`weather-search-bar-${idx}`);
    if(bar) bar.style.display = bar.style.display === 'none' ? 'block' : 'none';
};

window.searchWeatherCity = async function(idx) {
    const input = document.getElementById(`weather-search-input-${idx}`);
    const results = document.getElementById(`weather-search-results-${idx}`);
    if(!input || !input.value.trim()) return;
    
    results.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted); padding:0.5rem;">Searching...</div>';
    
    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input.value.trim())}&count=5&language=en&format=json`);
        const data = await res.json();
        
        if(!data.results || data.results.length === 0) {
            results.innerHTML = '<div style="font-size:0.8rem; color:#ef4444; padding:0.5rem;">No results found.</div>';
            return;
        }
        
        results.innerHTML = data.results.map(city => `
            <div class="search-result-item" onclick="applyWeatherCity(${idx}, ${JSON.stringify(city).replace(/"/g, '&quot;')})">
                <strong>${city.name}</strong>, ${city.country} <span style="font-size:0.7rem; opacity:0.6;">(${city.admin1 || ''})</span>
            </div>
        `).join('');
    } catch(e) {
        results.innerHTML = '<div style="font-size:0.8rem; color:#ef4444; padding:0.5rem;">Search failed.</div>';
    }
};

window.applyWeatherCity = function(idx, cityData) {
    customData.homeContent[idx].lastSearch = cityData;
    updateWeatherWidget(idx, cityData, true);
    document.getElementById(`weather-search-bar-${idx}`).style.display = 'none';
    saveData();
};


function renderDetail(data) {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('edit-screen').style.display = 'none';
    document.getElementById('edit-home-screen').style.display = 'none';
    
    const detailScreen = document.getElementById('detail-screen');
    if(detailScreen) detailScreen.style.display = 'block';

    document.getElementById('ac-title').textContent = data.name;
    document.getElementById('ac-type-badge').textContent = data.badge || data.parentModel;

    const cont = document.getElementById('dynamic-sections-container');
    cont.innerHTML = '';
    
    if(!data.sections || data.sections.length === 0) {
        cont.innerHTML = '<div style="color:var(--text-muted); grid-column:1/-1;">생성된 블록이 없습니다. 수정 버튼을 눌러 추가하세요.</div>';
        return;
    }

    data.sections.forEach((sec, sIdx) => {
        const card = document.createElement('div');
        if(sec.isFullWidth === true || (sec.isFullWidth !== false && sec.type === 'links')) card.className = 'card full-width';
        else card.className = 'card';
        
        let html = `<h3><i data-lucide="${sec.icon || 'star'}"></i> ${sec.title}</h3>`;
        
        if(sec.type === 'list') {
            html += `<ul class="feature-list">`;
            if(sec.items.length === 0) html += `<li style="color:#94a3b8">내용이 없습니다.</li>`;
            sec.items.forEach(txt => html += `<li>${txt}</li>`);
            html += `</ul>`;
        } else if (sec.type === 'grid') {
            html += `<div class="spec-grid">`;
            sec.items.forEach(item => html += `<div class="spec-item"><span class="spec-label">${item.key}</span><span class="spec-val">${item.val}</span></div>`);
            html += `</div>`;
        } else if (sec.type === 'links') {
            html += `<div class="link-grid">`;
            if(sec.items.length === 0) html += `<div style="color:#94a3b8">등록된 링크가 없습니다.</div>`;
            sec.items.forEach(link => {
                html += `<a href="${link.url||'#'}" target="_blank" class="link-btn"><div class="link-icon"><i data-lucide="${link.icon || 'link'}"></i></div><div class="link-text"><span class="link-title">${link.title}</span><span class="link-sub">열기</span></div></a>`;
            });
            html += `</div>`;
        } else if (sec.type === 'image') {
            html += `<div class="image-multi-grid">`;
            const imgs = sec.items || (sec.base64 ? [{base64: sec.base64}] : []);
            if(imgs.length === 0) html += `<div style="color:var(--text-muted); padding:2rem; border:1px dashed var(--glass-border); border-radius:8px;">이미지가 없습니다. 편집 모드에서 이미지를 업로드하세요.</div>`;
            imgs.forEach(img => {
                if(img.base64) html += `<div class="image-item"><img src="${img.base64}"></div>`;
            });
            html += `</div>`;
        } else if (sec.type === 'file') {
            html += `<div class="file-multi-list">`;
            const files = sec.items || (sec.fileData ? [{fileData: sec.fileData, fileName: sec.fileName, fileType: sec.fileType, fileSize: sec.fileSize}] : []);
            if(files.length === 0) html += `<div style="color:var(--text-muted); padding:2rem; border:1px dashed var(--glass-border); border-radius:8px; grid-column:1/-1;">파일이 없습니다.</div>`;
            files.forEach((file, fIdx) => {
                html += renderFilePreviewItem(file, sIdx, fIdx);
            });
            html += `</div>`;
        } else if (sec.type === 'memo') {
            html += `<div class="memo-txt">${sec.content || '내용이 없습니다.'}</div>`;
        }
        card.innerHTML = html;

        if(!isLocked) {
            const hoverDiv = document.createElement('div');
            hoverDiv.className = 'hover-controls';

            const upBtn = document.createElement('button'); upBtn.className = 'hover-btn'; upBtn.innerHTML = '<i data-lucide="arrow-up"></i>';
            if(sIdx > 0) upBtn.onclick = () => swapDetailBox(data, sIdx, sIdx-1);
            else upBtn.style.opacity = '0.3';

            const dnBtn = document.createElement('button'); dnBtn.className = 'hover-btn'; dnBtn.innerHTML = '<i data-lucide="arrow-down"></i>';
            if(sIdx < data.sections.length - 1) dnBtn.onclick = () => swapDetailBox(data, sIdx, sIdx+1);
            else dnBtn.style.opacity = '0.3';

            const fullBtn = document.createElement('button'); fullBtn.className = 'hover-btn'; 
            let isFull = sec.isFullWidth === true || (sec.isFullWidth !== false && sec.type === 'links');
            fullBtn.innerHTML = `<i data-lucide="${isFull ? 'minimize-2' : 'maximize-2'}"></i>`;
            fullBtn.onclick = () => { sec.isFullWidth = !isFull; saveData(); renderDetail(data); };
            
            hoverDiv.appendChild(upBtn); hoverDiv.appendChild(dnBtn); hoverDiv.appendChild(fullBtn);
            card.appendChild(hoverDiv);
        }
        cont.appendChild(card);
    });
    lucide.createIcons();
}

function swapDetailBox(data, idx1, idx2) {
    let t = data.sections[idx1];
    data.sections[idx1] = data.sections[idx2];
    data.sections[idx2] = t;
    saveData();
    renderDetail(data);
}

// =========================================
// 5. EVENT HANDLERS (CMS)
// =========================================
function handleEditAircraft() {
    if(!currentRouteKey || !customData[currentRouteKey]) return;
    openEditScreen(customData[currentRouteKey]);
}

function openEditScreen(data) {
    document.getElementById('detail-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('edit-home-screen').style.display = 'none';
    document.getElementById('edit-screen').style.display = 'block';

    document.getElementById('edit-type').value = data.name || data.typeCode || "";

    liveSections = JSON.parse(JSON.stringify(data.sections || []));
    renderBuilder();
}

function handleCancelEdit() {
    document.getElementById('edit-screen').style.display = 'none';
    if(currentRouteKey) {
        renderDetail(customData[currentRouteKey]);
    } else {
        document.getElementById('welcome-screen').style.display = 'flex';
    }
}

function handleSaveEdit() {
    const title = document.getElementById('edit-type').value.trim() || '새 문서';

    liveSections.forEach(sec => {
        if(sec.type === 'list') sec.items = sec.items.filter(txt => txt.trim()!=='');
        if(sec.type === 'grid') sec.items = sec.items.filter(it => it.key.trim()!=='' || it.val.trim()!=='');
        if(sec.type === 'links') sec.items = sec.items.filter(it => it.title.trim()!=='' || it.url.trim()!=='');
    });

    if(!customData[currentRouteKey]) customData[currentRouteKey] = { id: currentRouteKey };
    customData[currentRouteKey].name = title;
    customData[currentRouteKey].sections = liveSections;

    // Optional: if it still had legacy values, keep them so we don't break old tree refs
    // But tree rendering now only cares about customData[id].name

    saveData();
    renderNavigation();
    document.getElementById('edit-screen').style.display = 'none';
    renderDetail(customData[currentRouteKey]);
}

function handleDeleteAircraft() {
    if(isLocked) return alert("자물쇠 잠금을 먼저 해제해주세요.");
    window.deleteTreeNode(currentRouteKey);
}

function renderBuilder() {
    const cont = document.getElementById('edit-sections-container');
    cont.innerHTML = '';
    
    liveSections.forEach((sec, sIdx) => {
        const card = document.createElement('div');
        card.className = 'card full-width';
        
        const header = document.createElement('div');
        header.className = 'builder-section-header';
        
        const btnIcon = document.createElement('button');
        btnIcon.className = 'builder-icon-btn'; btnIcon.innerHTML = `<i data-lucide="${sec.icon}"></i>`;
        btnIcon.addEventListener('click', () => openIconPicker(sel => { sec.icon = sel; renderBuilder(); }));

        const inputTitle = document.createElement('input');
        inputTitle.type = 'text'; inputTitle.className = 'cms-input'; inputTitle.style.flex = "1"; inputTitle.value = sec.title;
        inputTitle.addEventListener('change', (e) => sec.title = e.target.value);

        const btnUp = document.createElement('button'); btnUp.className = 'builder-icon-btn'; btnUp.innerHTML = `<i data-lucide="arrow-up"></i>`;
        if(sIdx > 0) btnUp.addEventListener('click', () => { [liveSections[sIdx-1], liveSections[sIdx]] = [liveSections[sIdx], liveSections[sIdx-1]]; renderBuilder(); });
        else btnUp.style.opacity = '0.3';

        const btnDown = document.createElement('button'); btnDown.className = 'builder-icon-btn'; btnDown.innerHTML = `<i data-lucide="arrow-down"></i>`;
        if(sIdx < liveSections.length - 1) btnDown.addEventListener('click', () => { [liveSections[sIdx+1], liveSections[sIdx]] = [liveSections[sIdx], liveSections[sIdx+1]]; renderBuilder(); });
        else btnDown.style.opacity = '0.3';

        const btnCopy = document.createElement('button'); btnCopy.className = 'builder-icon-btn'; btnCopy.innerHTML = `<i data-lucide="copy"></i>`;
        btnCopy.title = "섹션 복사";
        btnCopy.addEventListener('click', () => { localStorage.setItem('crewClipboardSection', JSON.stringify(sec)); alert('복사되었습니다! [복사한 섹션 붙여넣기] 버튼으로 추가하세요.'); });

        const btnWidth = document.createElement('button'); btnWidth.className = 'builder-icon-btn';
        let isFull = sec.isFullWidth === true || (sec.isFullWidth !== false && sec.type === 'links');
        btnWidth.innerHTML = `<i data-lucide="${isFull ? 'minimize-2' : 'maximize-2'}"></i>`;
        btnWidth.addEventListener('click', () => { sec.isFullWidth = !isFull; renderBuilder(); });

        const btnDelSec = document.createElement('button'); btnDelSec.className = 'btn danger-btn'; btnDelSec.style.width='auto'; btnDelSec.style.padding='0.4rem 0.6rem';
        btnDelSec.innerHTML = '<i data-lucide="trash"></i> <span>블록 삭제</span>';
        btnDelSec.addEventListener('click', () => { liveSections.splice(sIdx, 1); renderBuilder(); });

        header.appendChild(btnIcon); header.appendChild(inputTitle);
        const actionGroup = document.createElement('div'); actionGroup.style.display = 'flex'; actionGroup.style.gap = '0.25rem'; actionGroup.style.marginLeft = 'auto';
        actionGroup.appendChild(btnUp); actionGroup.appendChild(btnDown); actionGroup.appendChild(btnCopy); actionGroup.appendChild(btnWidth); actionGroup.appendChild(btnDelSec);
        header.appendChild(actionGroup); card.appendChild(header);

        const itemsDiv = document.createElement('div'); itemsDiv.style.display = 'flex'; itemsDiv.style.flexDirection = 'column'; itemsDiv.style.gap = '0.5rem';

        if(sec.type === 'list') {
            sec.items.forEach((txt, iIdx) => {
                const row = document.createElement('div'); row.className = 'cms-row';
                row.innerHTML = `<button class="builder-icon-btn" title="위로"><i data-lucide="arrow-up"></i></button><button class="builder-icon-btn" title="아래로"><i data-lucide="arrow-down"></i></button><textarea class="cms-input" style="flex:1; min-height:60px;"></textarea><button class="btn-delete"><i data-lucide="x"></i></button>`;
                const btns = row.querySelectorAll('.builder-icon-btn');
                if(iIdx===0) btns[0].style.opacity='0.3'; else btns[0].addEventListener('click', () => { [sec.items[iIdx-1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx-1]]; renderBuilder(); });
                if(iIdx===sec.items.length-1) btns[1].style.opacity='0.3'; else btns[1].addEventListener('click', () => { [sec.items[iIdx+1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx+1]]; renderBuilder(); });
                const ta = row.querySelector('textarea');
                ta.value = txt;
                ta.addEventListener('input', e => sec.items[iIdx] = e.target.value);
                row.querySelector('.btn-delete').addEventListener('click', () => { sec.items.splice(iIdx,1); renderBuilder(); });
                itemsDiv.appendChild(row);
            });
            const addBtn = document.createElement('button'); addBtn.className = 'btn add-item-btn'; addBtn.innerText = '+ 줄 추가';
            addBtn.addEventListener('click', () => { sec.items.push(""); renderBuilder(); });
            itemsDiv.appendChild(addBtn);
        } else if(sec.type === 'memo') {
            const ta = document.createElement('textarea');
            ta.className = 'cms-input';
            ta.placeholder = '여기에 자유롭게 내용을 입력하세요... (엔터로 줄바꿈 가능)';
            ta.value = sec.content || "";
            ta.style.minHeight = "200px";
            ta.addEventListener('input', (e) => sec.content = e.target.value);
            itemsDiv.appendChild(ta);
        } else if(sec.type === 'grid') {
            sec.items.forEach((item, iIdx) => {
                const row = document.createElement('div'); row.className = 'cms-row';
                row.innerHTML = `<button class="builder-icon-btn" title="위로"><i data-lucide="arrow-up"></i></button><button class="builder-icon-btn" title="아래로"><i data-lucide="arrow-down"></i></button><input type="text" class="cms-input" value="${item.key}" placeholder="키"><input type="text" class="cms-input" value="${item.val}" placeholder="값"><button class="btn-delete"><i data-lucide="x"></i></button>`;
                const btns = row.querySelectorAll('.builder-icon-btn');
                if(iIdx===0) btns[0].style.opacity='0.3'; else btns[0].addEventListener('click', () => { [sec.items[iIdx-1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx-1]]; renderBuilder(); });
                if(iIdx===sec.items.length-1) btns[1].style.opacity='0.3'; else btns[1].addEventListener('click', () => { [sec.items[iIdx+1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx+1]]; renderBuilder(); });
                const inputs = row.querySelectorAll('input');
                inputs[0].addEventListener('input', e => sec.items[iIdx].key = e.target.value);
                inputs[1].addEventListener('input', e => sec.items[iIdx].val = e.target.value);
                row.querySelector('.btn-delete').addEventListener('click', () => { sec.items.splice(iIdx,1); renderBuilder(); });
                itemsDiv.appendChild(row);
            });
            const addBtn = document.createElement('button'); addBtn.className = 'btn add-item-btn'; addBtn.innerText = '+ 스펙 추가';
            addBtn.addEventListener('click', () => { sec.items.push({key:"", val:""}); renderBuilder(); });
            itemsDiv.appendChild(addBtn);
        } else if(sec.type === 'links') {
            sec.items.forEach((itm, iIdx) => {
                const row = document.createElement('div'); row.className = 'cms-row';
                row.innerHTML = `<button class="builder-icon-btn" title="위로"><i data-lucide="arrow-up"></i></button><button class="builder-icon-btn" title="아래로"><i data-lucide="arrow-down"></i></button>`;
                const btns = row.querySelectorAll('.builder-icon-btn');
                if(iIdx===0) btns[0].style.opacity='0.3'; else btns[0].addEventListener('click', () => { [sec.items[iIdx-1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx-1]]; renderBuilder(); });
                if(iIdx===sec.items.length-1) btns[1].style.opacity='0.3'; else btns[1].addEventListener('click', () => { [sec.items[iIdx+1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx+1]]; renderBuilder(); });
                
                const icnBtn = document.createElement('button'); icnBtn.className='builder-icon-btn'; icnBtn.innerHTML=`<i data-lucide="${itm.icon||'link'}"></i>`;
                icnBtn.addEventListener('click', () => openIconPicker(sel => { sec.items[iIdx].icon = sel; renderBuilder(); }));
                const inputsDiv = document.createElement('div'); inputsDiv.className = 'cms-row'; inputsDiv.style.flex="1"; inputsDiv.style.marginBottom="0";
                inputsDiv.innerHTML = `<input type="text" class="cms-input" value="${itm.title}" placeholder="라벨"><input type="text" class="cms-input" value="${itm.url}" placeholder="URL">`;
                const inputs = inputsDiv.querySelectorAll('input');
                inputs[0].addEventListener('input', e => sec.items[iIdx].title = e.target.value);
                inputs[1].addEventListener('input', e => sec.items[iIdx].url = e.target.value);
                const delBtn = document.createElement('button'); delBtn.className='btn-delete'; delBtn.innerHTML=`<i data-lucide="x"></i>`;
                delBtn.addEventListener('click', () => { sec.items.splice(iIdx,1); renderBuilder(); });
                row.appendChild(icnBtn); row.appendChild(inputsDiv); row.appendChild(delBtn);
                itemsDiv.appendChild(row);
            });
            const addBtn = document.createElement('button'); addBtn.className = 'btn add-item-btn'; addBtn.innerText = '+ 링크 추가';
            addBtn.addEventListener('click', () => { sec.items.push({title:"", url:"", icon:"link"}); renderBuilder(); });
            itemsDiv.appendChild(addBtn);
        } else if(sec.type === 'image') {
            if(!sec.items) sec.items = sec.base64 ? [{base64: sec.base64}] : [];
            sec.items.forEach((imgItem, iIdx) => {
                const imgWrap = document.createElement('div');
                imgWrap.className = 'cms-row';
                imgWrap.style.flexDirection = 'column';
                imgWrap.style.background = 'rgba(255,255,255,0.02)';
                imgWrap.style.padding = '10px';
                imgWrap.style.borderRadius = '8px';
                imgWrap.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:5px;">
                        <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">이미지 #${iIdx+1}</span>
                        <div style="display:flex; gap:0.25rem;">
                            <button class="builder-icon-btn" title="위로" ${iIdx === 0 ? 'style="opacity:0.3"' : ''}><i data-lucide="arrow-up"></i></button>
                            <button class="builder-icon-btn" title="아래로" ${iIdx === sec.items.length - 1 ? 'style="opacity:0.3"' : ''}><i data-lucide="arrow-down"></i></button>
                            <button class="btn-delete" title="이미지 삭제" style="margin-left:5px;"><i data-lucide="x"></i></button>
                        </div>
                    </div>
                    <input type="file" accept="image/*" class="cms-input" style="padding: 0.5rem; margin-bottom:10px;">
                    <div class="image-preview" style="text-align:center; background:rgba(0,0,0,0.2); border-radius:4px; padding:10px;">
                        ${imgItem.base64 ? `<img src="${imgItem.base64}" style="max-width:100%; max-height:200px; border-radius:4px; box-shadow:0 4px 10px rgba(0,0,0,0.3);">` : `<span style="font-size:0.8rem; color:var(--text-muted);">파일을 선택하세요</span>`}
                    </div>
                `;
                
                const navBtns = imgWrap.querySelectorAll('.builder-icon-btn');
                navBtns[0].onclick = () => { if(iIdx > 0) { [sec.items[iIdx-1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx-1]]; renderBuilder(); }};
                navBtns[1].onclick = () => { if(iIdx < sec.items.length-1) { [sec.items[iIdx+1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx+1]]; renderBuilder(); }};
                imgWrap.querySelector('.btn-delete').onclick = () => { sec.items.splice(iIdx, 1); renderBuilder(); };
                const fileInput = imgWrap.querySelector('input[type="file"]');
                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if(!file) return;
                    const reader = new FileReader();
                    reader.onload = (e2) => {
                        const img = new Image();
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const MAX_WIDTH = 800;
                            let width = img.width; let height = img.height;
                            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                            canvas.width = width; canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0, width, height);
                            imgItem.base64 = canvas.toDataURL('image/jpeg', 0.65);
                            renderBuilder();
                        };
                        img.src = e2.target.result;
                    };
                    reader.readAsDataURL(file);
                });
                itemsDiv.appendChild(imgWrap);
            });
            const addImgBtn = document.createElement('button'); addImgBtn.className = 'btn add-item-btn'; addImgBtn.innerText = '+ 이미지 추가';
            addImgBtn.onclick = () => { sec.items.push({base64:''}); renderBuilder(); };
            itemsDiv.appendChild(addImgBtn);
        } else if(sec.type === 'file') {
            if(!sec.items) sec.items = sec.fileData ? [{fileData: sec.fileData, fileName: sec.fileName, fileType: sec.fileType, fileSize: sec.fileSize}] : [];
            sec.items.forEach((fItem, iIdx) => {
                const fileWrap = document.createElement('div');
                fileWrap.className = 'cms-row';
                fileWrap.style.flexDirection = 'column';
                fileWrap.style.background = 'rgba(255,255,255,0.02)';
                fileWrap.style.padding = '10px';
                fileWrap.style.borderRadius = '8px';
                
                let previewHtml = '';
                if(fItem.fileData) {
                    const fileIcon = getFileIcon(fItem.fileType || fItem.fileName);
                    previewHtml = `
                        <div class="file-preview-card" style="margin-top:0.5rem; padding:1rem;">
                            <div class="file-icon-large" style="width:32px;height:32px;margin-bottom:0.5rem;"><i data-lucide="${fileIcon}"></i></div>
                            <div class="file-name" style="font-size:0.85rem;">${fItem.fileName || '파일'}</div>
                            <div style="color:#22c55e; font-size:0.75rem;"><i data-lucide="check-circle" style="width:12px;height:12px;"></i> 완료</div>
                        </div>`;
                } else {
                    previewHtml = `<div style="margin-top:0.5rem; text-align:center; color:var(--text-muted); padding:1rem; border:1px dashed var(--glass-border); border-radius:8px; font-size:0.8rem;">파일 없음</div>`;
                }
                
                fileWrap.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:5px;">
                        <span style="font-size:0.8rem; color:var(--text-muted); font-weight:600;">파일 #${iIdx+1}</span>
                        <div style="display:flex; gap:0.25rem;">
                            <button class="builder-icon-btn" title="위로" ${iIdx === 0 ? 'style="opacity:0.3"' : ''}><i data-lucide="arrow-up"></i></button>
                            <button class="builder-icon-btn" title="아래로" ${iIdx === sec.items.length - 1 ? 'style="opacity:0.3"' : ''}><i data-lucide="arrow-down"></i></button>
                            <button class="btn-delete" title="파일 삭제" style="margin-left:5px;"><i data-lucide="x"></i></button>
                        </div>
                    </div>
                    <input type="file" class="cms-input" style="padding: 0.5rem; margin-bottom:10px;">
                    ${previewHtml}
                `;
                
                const navBtns = fileWrap.querySelectorAll('.builder-icon-btn');
                navBtns[0].onclick = () => { if(iIdx > 0) { [sec.items[iIdx-1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx-1]]; renderBuilder(); }};
                navBtns[1].onclick = () => { if(iIdx < sec.items.length-1) { [sec.items[iIdx+1], sec.items[iIdx]] = [sec.items[iIdx], sec.items[iIdx+1]]; renderBuilder(); }};
                fileWrap.querySelector('.btn-delete').onclick = () => { sec.items.splice(iIdx, 1); renderBuilder(); };
                
                const fileInput = fileWrap.querySelector('input[type="file"]');
                fileInput.addEventListener('change', (e) => {
                    const file = e.target.files[0];
                    if(!file) return;
                    if(file.size > 10 * 1024 * 1024) { if(!confirm(`파일이 큽니다. 계속할까요?`)) return; }
                    const reader = new FileReader();
                    reader.onload = (e2) => {
                        fItem.fileData = e2.target.result;
                        fItem.fileName = file.name;
                        fItem.fileType = file.type;
                        fItem.fileSize = file.size;
                        renderBuilder();
                    };
                    reader.readAsDataURL(file);
                });
                itemsDiv.appendChild(fileWrap);
            });
            const addFileBtn = document.createElement('button'); addFileBtn.className = 'btn add-item-btn'; addFileBtn.innerText = '+ 파일 추가';
            addFileBtn.onclick = () => { sec.items.push({fileData:'', fileName:'', fileType:'', fileSize:0}); renderBuilder(); };
            itemsDiv.appendChild(addFileBtn);
        }

        card.appendChild(itemsDiv);
        cont.appendChild(card);
    });
    lucide.createIcons();
}

// =========================================
// 5. ICON PICKER & PORTABLE EXPORT
// =========================================
function buildIconPicker() {
    const iconGrid = document.getElementById('icon-grid-container');
    if(!iconGrid) return;
    iconGrid.innerHTML = '';
    iconLibrary.forEach(ic => {
        const btn = document.createElement('button');
        btn.className = 'icon-pick-btn';
        btn.innerHTML = `<i data-lucide="${ic}"></i>`;
        btn.addEventListener('click', () => {
            if(currentIconCallback) currentIconCallback(ic);
            document.getElementById('icon-picker-modal').style.display = 'none';
        });
        iconGrid.appendChild(btn);
    });
}

window.exportPortableManual = async function() {
    try {
        const confirmMsg = "현재의 매뉴얼 내용과 사진이 포함된 단일 실행 파일(.html)을 생성할까요?\n이 파일은 아이폰이나 태블릿에서 인터넷 없이도 열 수 있습니다.\n\n(서버 없이 로컬 파일로 열어도 작동하도록 개선되었습니다!)";
        if(!confirm(confirmMsg)) return;

        // Use hardcoded Base64 templates to bypass file:// security blocks
        if(!window.BUNDLE_HTML_B64 || !window.BUNDLE_CSS_B64 || !window.BUNDLE_JS_B64) {
            return alert("템플릿 로드 오류: 파일이 올바르게 구성되지 않았습니다.");
        }

        const decodeB64 = (str) => decodeURIComponent(escape(atob(str)));
        const htmlTemplate = decodeB64(window.BUNDLE_HTML_B64);
        const cssTemplate = decodeB64(window.BUNDLE_CSS_B64);
        const jsTemplate = decodeB64(window.BUNDLE_JS_B64);

        const dataStr = JSON.stringify(customData);
        let html = htmlTemplate;
        
        // 1. Inline CSS
        html = html.replace(/<link rel="stylesheet" href="style\.css">/, `<style>${cssTemplate}</style>`);
        
        // 2. Inline JS + Data Injection
        // We avoid literal script closing tags in the regex and replacement to prevent premature script tag closing in the exported HTML
        const scriptMarker = '<script src="crew.js"></scr' + 'ipt>';
        const bundledJs = `window.__PORTABLE_DATA__ = ${dataStr};\n${jsTemplate}`;
        
        html = html.replace(scriptMarker, `<script>${bundledJs}</scr` + 'ipt>');

        // 3. Mark as portable
        html = html.replace(/<title>(.*?)<\/title>/, `<title>$1 (Portable)</title>`);

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const now = new Date();
        const dateStr = now.getFullYear().toString().substr(2) + (now.getMonth()+1).toString().padStart(2,'0') + now.getDate().toString().padStart(2,'0');
        
        a.href = url;
        a.download = `CREWCREW_Manual_${dateStr}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert("🎉 휴대용 매뉴얼 파일이 성공적으로 생성되었습니다!\n다운로드된 파일을 아이폰/태블릿으로 전송하여 사용하세요.");
    } catch(e) {
        console.error(e);
        alert("파일 생성 중 오류가 발생했습니다: " + e.message);
    }
}





window.exportSync = function() {
    try {
        const rawJson = JSON.stringify(customData);
        const encoded = btoa(encodeURIComponent(rawJson));
        navigator.clipboard.writeText(encoded).then(() => {
            alert("동기화 암호 코드가 복사되었습니다! 카톡 등에 붙여넣어 다른 기기로 전달하세요.");
        }).catch(() => {
            prompt("복사에 실패했습니다. 아래 코드를 전체 선택하여 복사하세요:", encoded);
        });
    } catch(e) { alert("데이터 추출 오류"); }
}

window.importSync = function() {
    const inputStr = window.prompt("카카오톡으로 받은 암호 코드 전체를 여기에 붙여넣으세요.");
    if(!inputStr) return;
    try {
        const parsed = JSON.parse(decodeURIComponent(atob(inputStr.trim())));
        if(parsed && typeof parsed === 'object') {
            if(confirm("정상 데이터가 확인되었습니다. 현재 기기에 바로 덮어씌울까요?")) {
                customData = parsed;
                saveData();
                alert("데이터 복제가 완료되었습니다!");
                location.reload();
            }
        }
    } catch(e) { alert("암호 코드가 올바르지 않거나 훼손되었습니다."); }
}

// ==== CALCULATOR WIDGET ====
function renderCalc() {
    const root = document.getElementById('calc-root');
    if(!root) return;
    
    let html = `<div style="margin-bottom:1rem;">
        <label style="display:block; font-size:0.85rem; color:var(--text-muted); margin-bottom:0.4rem;">비행거리 (Haul)</label>
        <div style="display:flex; gap:0.5rem;">
            <button class="btn secondary-btn" style="flex:1;${calcState.haul==='long'?'background:rgba(56,189,248,0.2);border-color:var(--accent);':''}" onclick="window.setCalcHaul('long')">장거리 (Long)</button>
            <button class="btn secondary-btn" style="flex:1;${calcState.haul==='short'?'background:rgba(56,189,248,0.2);border-color:var(--accent);':''}" onclick="window.setCalcHaul('short')">중/단거리 (Short)</button>
        </div>
    </div>`;

    // Group selector
    let pGroups = [];
    Object.keys(CALC_DATA).forEach(id => { if(!pGroups.includes(CALC_DATA[id].group)) pGroups.push(CALC_DATA[id].group); });
    let groupOptions = `<option value="">-- 그룹 선택 --</option>`;
    pGroups.forEach(g => { groupOptions += `<option value="${g}" ${calcState.parentGroup===g?'selected':''}>${g}</option>`; });
    html += `<div style="display:flex; gap:0.5rem; margin-bottom:0.7rem; flex-wrap:wrap;">`;
    html += `<select class="cms-input" style="flex:1; min-width:120px; font-weight:bold;" onchange="window.setCalcGroup(this.value)">${groupOptions}</select>`;

    // Aircraft selector
    if(calcState.parentGroup) {
        let acOptions = `<option value="">-- 기종 선택 --</option>`;
        Object.keys(CALC_DATA).forEach(id => {
            if(CALC_DATA[id].group === calcState.parentGroup)
                acOptions += `<option value="${id}" ${calcState.acId===id?'selected':''}>${CALC_DATA[id].name}</option>`;
        });
        html += `<select class="cms-input" style="flex:1; min-width:140px; font-weight:bold;" onchange="window.setCalcAc(this.value)">${acOptions}</select>`;
    }
    html += `</div>`;

    if(calcState.acId && CALC_DATA[calcState.acId]) {
        const ac = CALC_DATA[calcState.acId];
        const cabins = ac.cabins || [];

        // Config selector (LOPA)
        if(ac.configs && ac.configs.length > 1) {
            let cfgOptions = '';
            ac.configs.forEach(c => {
                cfgOptions += `<option value="${c.id}" ${calcState.configId===c.id?'selected':''}>${c.label}</option>`;
            });
            html += `<div style="margin-bottom:0.7rem;">
                <label style="font-size:0.8rem; color:var(--text-muted);">좌석 배치 (LOPA)</label>
                <select class="cms-input" style="font-weight:bold; color:#f472b6;" onchange="window.setCalcConfig(this.value)">${cfgOptions}</select>
            </div>`;
        } else if(ac.configs && ac.configs.length === 1) {
            html += `<div style="text-align:center; font-size:0.82rem; color:#f472b6; margin-bottom:0.8rem; font-weight:bold;">[LOPA: ${ac.configs[0].label}]</div>`;
            if(!calcState.configId) calcState.configId = ac.configs[0].id;
        }

        // Pax inputs (one per cabin class)
        html += `<div style="margin-bottom:0.8rem;">`;
        cabins.forEach(c => {
            const v = calcState.pax[c] !== undefined ? calcState.pax[c] : 0;
            html += `<div style="display:flex; justify-content:space-between; align-items:center; padding:0.35rem 0;">
                <span style="color:var(--text-muted); font-size:0.88rem; font-weight:bold;">${c} Class 승객 수</span>
                <div style="display:flex; align-items:center; gap:0.4rem;">
                    <button class="btn secondary-btn" style="width:32px;height:32px;padding:0;font-size:1rem;border-radius:50%;" onclick="window.setCalcPax('${c}', Math.max(0,${v}-1))">-</button>
                    <input type="number" class="cms-input" style="width:72px;height:32px;text-align:center;font-size:1rem;font-weight:bold;" value="${v}" placeholder="0" oninput="window.setCalcPax('${c}', this.value)">
                    <button class="btn secondary-btn" style="width:32px;height:32px;padding:0;font-size:1rem;border-radius:50%;" onclick="window.setCalcPax('${c}', ${v}+1)">+</button>
                </div>
            </div>`;
        });
        html += `</div>`;

        // Result
        const res = executeCalcSum();
        html += `<div style="padding:1rem; background:rgba(0,0,0,0.3); border-radius:8px; border:1px solid rgba(255,255,255,0.1);">`;
        res.rows.forEach(r => html += `<div style="display:flex;justify-content:space-between;font-size:0.9rem;padding:0.25rem 0;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:var(--text-muted)">${r.l} Class</span><span style="font-weight:bold;">${r.v}명</span></div>`);
        html += `<div style="display:flex;justify-content:space-between;margin-top:0.5rem;padding-top:0.5rem;font-weight:900;color:#38bdf8;font-size:1.15rem;"><span>합계 (TTL)</span><span>${res.tt}명</span></div></div>`;
    }

    root.innerHTML = html;
}

window.setCalcHaul = function(h) { calcState.haul = h; renderCalc(); };
window.setCalcGroup = function(g) { calcState.parentGroup = g; calcState.acId = ''; calcState.configId = ''; calcState.pax = {}; renderCalc(); };
window.setCalcAc = function(id) {
    calcState.acId = id;
    calcState.configId = '';
    calcState.pax = {};
    const ac = CALC_DATA[id];
    if(ac && ac.configs && ac.configs.length > 0) {
        calcState.configId = ac.configs[0].id;
        const parts = ac.configs[0].label.split('/');
        const cabins = ac.cabins || [];
        cabins.forEach((c, i) => { if(parts[i] !== undefined) { const v = parseInt(parts[i], 10); if(!isNaN(v)) calcState.pax[c] = v; } });
    }
    renderCalc();
};
window.setCalcConfig = function(cfgId) {
    calcState.configId = cfgId;
    calcState.pax = {};
    const ac = CALC_DATA[calcState.acId];
    if(ac) {
        const cfg = ac.configs.find(c => c.id === cfgId);
        if(cfg) {
            const parts = cfg.label.split('/');
            const cabins = ac.cabins || [];
            cabins.forEach((c, i) => { if(parts[i] !== undefined) { const v = parseInt(parts[i], 10); if(!isNaN(v)) calcState.pax[c] = v; } });
        }
    }
    renderCalc();
};
window.setCalcPax = function(c, v) { calcState.pax[c] = parseInt(v, 10) || 0; renderCalc(); };

function executeCalcSum() {
    if(!calcState.acId) return { rows: [], tt: 0 };
    const ac = CALC_DATA[calcState.acId];
    if(!ac) return { rows: [], tt: 0 };
    const cabins = ac.cabins || [];
    let tt = 0; const rows = [];
    cabins.forEach(c => {
        const f = ac.formula[c];
        if(!f) return;
        const px = calcState.pax[c] || 0;
        // If no passengers in this class, assign 0 crew
        if(px === 0) { rows.push({ l: c, v: 0 }); return; }
        const isShort = calcState.haul === 'short';
        const thres = (isShort && f.short) ? f.short : f.long;
        const vals  = (isShort && f.short_crew) ? f.short_crew : f.crew;
        if(!thres || !vals) return;
        let cv = vals[0];
        for(let i = 0; i < thres.length; i++) {
            if(px <= thres[i]) { cv = vals[i]; break; }
            else { cv = vals[i]; }
        }
        rows.push({ l: c, v: cv });
        tt += cv;
    });
    return { rows, tt };
}

// =========================================
// 7. FILE SECTION HELPERS
// =========================================
function getFileIcon(fileTypeOrName) {
    const str = (fileTypeOrName || '').toLowerCase();
    if(str.includes('pdf')) return 'file-text';
    if(str.includes('sheet') || str.includes('xlsx') || str.includes('xls') || str.includes('csv')) return 'table';
    if(str.includes('word') || str.includes('doc')) return 'file-text';
    if(str.includes('presentation') || str.includes('ppt')) return 'presentation';
    if(str.includes('hwp')) return 'file-text';
    if(str.includes('zip') || str.includes('compressed')) return 'archive';
    if(str.includes('text') || str.includes('txt')) return 'file';
    return 'file';
}

function formatFileSize(bytes) {
    if(bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function renderFilePreviewItem(file, sIdx, fIdx) {
    if(!file || !file.fileData) {
        return `<div style="color:var(--text-muted); padding:1rem; border:1px dashed var(--glass-border); border-radius:8px; text-align:center; font-size:0.85rem;">
            파일이 없습니다.
        </div>`;
    }
    
    const fileIcon = getFileIcon(file.fileType || file.fileName);
    const sizeStr = formatFileSize(file.fileSize || 0);
    const isPdf = (file.fileType || '').includes('pdf') || (file.fileName || '').toLowerCase().endsWith('.pdf');
    
    // PDF는 이미지처럼 바로 보여줌
    if(isPdf) {
        let html = `<div style="text-align:center; grid-column:1/-1; width:100%;">`;
        html += `<iframe src="${file.fileData}" class="file-embed-frame" title="${file.fileName}" style="display:block;"></iframe>`;
        html += `<div style="margin-top:0.75rem; display:flex; gap:0.5rem; justify-content:center; align-items:center; flex-wrap:wrap;">`;
        html += `<span style="font-size:0.85rem; color:var(--text-muted);"><i data-lucide="${fileIcon}" style="width:14px;height:14px;"></i> ${file.fileName || 'PDF'} (${sizeStr})</span>`;
        html += `<button class="file-action-btn" onclick="window.downloadFileItem(${sIdx}, ${fIdx})"><i data-lucide="download" style="width:14px;height:14px;"></i> 다운로드</button>`;
        html += `</div></div>`;
        return html;
    }
    
    // 기타 파일은 카드 + 다운로드 버튼
    let html = `<div class="file-preview-card">`;
    html += `<div class="file-icon-large"><i data-lucide="${fileIcon}"></i></div>`;
    html += `<div class="file-name">${file.fileName || '파일'}</div>`;
    html += `<div class="file-meta">${sizeStr}</div>`;
    html += `<div class="file-actions">`;
    html += `<button class="file-action-btn" onclick="window.downloadFileItem(${sIdx}, ${fIdx})"><i data-lucide="download" style="width:16px;height:16px;"></i> 다운로드</button>`;
    html += `</div>`;
    html += `</div>`;
    return html;
}

window.downloadFileItem = function(sIdx, fIdx) {
    const data = customData[currentRouteKey];
    if(!data || !data.sections || !data.sections[sIdx]) return;
    const sec = data.sections[sIdx];
    const file = sec.items ? sec.items[fIdx] : (fIdx === 0 ? {fileData: sec.fileData, fileName: sec.fileName} : null);
    if(!file || !file.fileData) return alert('파일 데이터가 없습니다.');
    const a = document.createElement('a');
    a.href = file.fileData;
    a.download = file.fileName || 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

window.copyAllSections = function() {
    if(!currentRouteKey || !customData[currentRouteKey]) return;
    const sections = customData[currentRouteKey].sections || [];
    if(sections.length === 0) return alert("복사할 내용이 없습니다.");
    
    // Deep copy to prevent reference issues
    const dataToCopy = JSON.parse(JSON.stringify(sections));
    localStorage.setItem('crewClipboardSections', JSON.stringify(dataToCopy));
    alert(`${sections.length}개의 섹션을 복사했습니다. 다른 기종 편집 화면에서 붙여넣으세요.`);
};

window.pasteAllSections = function() {
    const raw = localStorage.getItem('crewClipboardSections');
    if(!raw) return alert("복사된 내용이 없습니다.");
    
    let sections;
    try { sections = JSON.parse(raw); } catch(e) { return alert("데이터 오류입니다."); }
    
    if(!confirm(`${sections.length}개의 섹션을 현재 내용 아래에 추가할까요?`)) return;
    
    // Deep copy and push to liveSections
    const newItems = JSON.parse(JSON.stringify(sections));
    liveSections = [...liveSections, ...newItems];
    renderBuilder();
    alert("섹션이 추가되었습니다.");
};

window.toggleFileEmbed = function(sIdx) {
    const container = document.getElementById(`file-embed-container-${sIdx}`);
    if(!container) return;
    
    if(container.style.display === 'none') {
        const data = customData[currentRouteKey];
        if(!data || !data.sections || !data.sections[sIdx]) return;
        const sec = data.sections[sIdx];
        container.innerHTML = `<iframe src="${sec.fileData}" class="file-embed-frame" title="${sec.fileName}"></iframe>`;
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
        container.innerHTML = '';
    }
};


// =========================================
// 8. MOBILE SIDEBAR TOGGLE
// =========================================
function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar-panel');
    const overlay = document.getElementById('sidebar-overlay');
    if(sidebar) sidebar.classList.remove('mobile-open');
    if(overlay) overlay.classList.remove('active');
}

window.toggleMobileSidebar = function() {
    const sidebar = document.getElementById('sidebar-panel');
    const overlay = document.getElementById('sidebar-overlay');
    if(!sidebar) return;
    
    const isOpen = sidebar.classList.toggle('mobile-open');
    if(overlay) {
        if(isOpen) overlay.classList.add('active');
        else overlay.classList.remove('active');
    }
};


// =========================================
// 9. BUNDLE TEMPLATES (Base64 for Offline Export)
// =========================================
window.BUNDLE_HTML_B64 = "";
window.BUNDLE_CSS_B64 = "";
window.BUNDLE_JS_B64 = "";
