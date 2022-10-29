// TODO: 추가적인  넣는 옵션 추가, 연속출력 여부 담는 옵션 추가
// 필요 정보를 담은 객체를 입력하면 페이징 정보를 추가해서 반환해 주는 함수
// 필요 정보: 객체. currPage(현재페이지), totalArticles(전체 글 수), rowsPerPage(1페이지 당 글 수), pagesPerView(1뷰 당 페이지 수)
// IE 11 CAPABLE
function getPagingProps(p) {

    // Chksum
    if(typeof p === "undefined") throw new Error("'p' object required");
    if(typeof p != "object") throw new Error("'p' must be an object");
    ["currPage", "totalArticles", "rowsPerPage", "pagesPerView"].forEach(function(i) {
        if(!p.hasOwnProperty(i) || isNaN(parseFloat(p[i]))) throw new Error("'" + i + "' has an error");
    });

    // Pre-assign calculated values
    p.currView = p.min = p.max = null,                                  // Infoes about current view
    p.hasPrev = p.hasNext = p.toPrev = p.toNext = null,                 // to PREV / NEXT view
    p.hasJumpPrev = p.hasJumpNext = p.toJumpPrev = p.toJumpNext = null, // to PREV JUMP / NEXT JUMP view
    p.hasFirst = p.hasLast = p.toFirst = p.toLast = null;               // to FIRST / LAST view

    // Basic props
    p.lastPage = Math.ceil(p.totalArticles / p.rowsPerPage);
    p.currView = Math.ceil(p.currPage / p.pagesPerView + 1) - 1;

    // min, max
    p.max = Math.min(p.currView * p.pagesPerView, p.lastPage);
    p.min = Math.max((p.currView - 1) * p.pagesPerView + 1, 1);

    // prev, next
    p.hasPrev = p.min > p.rowsPerPage;
    p.hasNext = p.max < p.lastPage;
    if(p.hasPrev) p.toPrev = p.min - p.pagesPerView;
    if(p.hasNext) p.toNext = p.max + 1;

    // jumpBefore, jumpNext
    // You mayebe need use this if you need to jump over than just one view.
    if(!!p.jumpAmount) { // page amount for jumping
        p.hasJumpPrev = p.min > (p.rowsPerPage - p.jumpAmount);
        p.hasJumpNext = (p.max + p.jumpAmount) < p.lastPage;
        p.toJumpPrev = 
    }

    // first, last
    p.hasFirst = p.min > p.pagesPerView * 2;
    p.hasLast = p.max + p.pagesPerView < p.lastPage;
    if(p.hasFirst) p.toFirst = 1;
    if(p.hasLast) p.toLast = Math.min(Math.floor(p.lastPage/p.pagesPerView) * p.pagesPerView + 1, p.lastPage);

    return p;

}


// Result example

// Library: n 앞에 width만큼 0붙이기
function nPad(nn, width) {
    let n = new String(nn);
    return n.length >= width ? n : new Array(width - n.length + 1).join('.') + n;
}

// Paging definition
var p = {
  currPage: 1,
  totalArticles: 97,
  rowsPerPage: 3,
  pagesPerView: 7
};

// Calculate results
var resultTxt = "";
let i = 1;
getPagingProps(p);
resultTxt += "currPage: "      + p.currPage    + ", totalArticles: " + p.totalArticles
          +  ", rowsPerPage: " + p.rowsPerPage + ", pagesPerView: "  + p.pagesPerView
          +  "\n\n";

for(let i = 1; i < getPagingProps(p).lastPage; i++) {

    p.currPage = i;
    const props = getPagingProps(p);
    resultTxt
    += "PAGE."      + nPad(p.currPage, 5) + " / VIEW_ROUND." + nPad(p.currView, 5) + " / PAGE." + nPad(p.min, 5) + " ~ " + nPad(p.max, 5) + "     "
    +  "│     <<.." + p.hasFirst * 1      + " & "            + nPad(p.toFirst, 5)  + "     "
    +  "│     <.."  + p.hasPrev * 1       + " & "            + nPad(p.toPrev, 5)   + "     "
    +  "│     >.."  + p.hasNext * 1       + " & "            + nPad(p.hasNext, 5)  + "     "
    +  "│     >>.." + p.hasLast * 1       + " & "            + nPad(p.toLast, 5)   + "\n";
if(i % p.pagesPerView == 0) resultTxt += "\n";

}

// Show results
console.log(resultTxt);

/* RESULT:
currPage: 1, totalArticles: 97, rowsPerPage: 3, pagesPerView: 7
PAGE.....1 / VIEW_ROUND.....1 / PAGE.....1 ~ ....7     │     <<..0 & .null     │     <..0 & .null     │     >..1 & .true     │     >>..1 & ...29
PAGE.....2 / VIEW_ROUND.....1 / PAGE.....1 ~ ....7     │     <<..0 & .null     │     <..0 & .null     │     >..1 & .true     │     >>..1 & ...29
PAGE.....3 / VIEW_ROUND.....1 / PAGE.....1 ~ ....7     │     <<..0 & .null     │     <..0 & .null     │     >..1 & .true     │     >>..1 & ...29
PAGE.....4 / VIEW_ROUND.....1 / PAGE.....1 ~ ....7     │     <<..0 & .null     │     <..0 & .null     │     >..1 & .true     │     >>..1 & ...29
PAGE.....5 / VIEW_ROUND.....1 / PAGE.....1 ~ ....7     │     <<..0 & .null     │     <..0 & .null     │     >..1 & .true     │     >>..1 & ...29
PAGE.....6 / VIEW_ROUND.....1 / PAGE.....1 ~ ....7     │     <<..0 & .null     │     <..0 & .null     │     >..1 & .true     │     >>..1 & ...29
PAGE.....7 / VIEW_ROUND.....1 / PAGE.....1 ~ ....7     │     <<..0 & .null     │     <..0 & .null     │     >..1 & .true     │     >>..1 & ...29
PAGE.....8 / VIEW_ROUND.....2 / PAGE.....8 ~ ...14     │     <<..0 & .null     │     <..1 & ....1     │     >..1 & .true     │     >>..1 & ...29
PAGE.....9 / VIEW_ROUND.....2 / PAGE.....8 ~ ...14     │     <<..0 & .null     │     <..1 & ....1     │     >..1 & .true     │     >>..1 & ...29
PAGE....10 / VIEW_ROUND.....2 / PAGE.....8 ~ ...14     │     <<..0 & .null     │     <..1 & ....1     │     >..1 & .true     │     >>..1 & ...29
PAGE....11 / VIEW_ROUND.....2 / PAGE.....8 ~ ...14     │     <<..0 & .null     │     <..1 & ....1     │     >..1 & .true     │     >>..1 & ...29
PAGE....12 / VIEW_ROUND.....2 / PAGE.....8 ~ ...14     │     <<..0 & .null     │     <..1 & ....1     │     >..1 & .true     │     >>..1 & ...29
PAGE....13 / VIEW_ROUND.....2 / PAGE.....8 ~ ...14     │     <<..0 & .null     │     <..1 & ....1     │     >..1 & .true     │     >>..1 & ...29
PAGE....14 / VIEW_ROUND.....2 / PAGE.....8 ~ ...14     │     <<..0 & .null     │     <..1 & ....1     │     >..1 & .true     │     >>..1 & ...29
PAGE....15 / VIEW_ROUND.....3 / PAGE....15 ~ ...21     │     <<..1 & ....1     │     <..1 & ....8     │     >..1 & .true     │     >>..1 & ...29
PAGE....16 / VIEW_ROUND.....3 / PAGE....15 ~ ...21     │     <<..1 & ....1     │     <..1 & ....8     │     >..1 & .true     │     >>..1 & ...29
PAGE....17 / VIEW_ROUND.....3 / PAGE....15 ~ ...21     │     <<..1 & ....1     │     <..1 & ....8     │     >..1 & .true     │     >>..1 & ...29
PAGE....18 / VIEW_ROUND.....3 / PAGE....15 ~ ...21     │     <<..1 & ....1     │     <..1 & ....8     │     >..1 & .true     │     >>..1 & ...29
PAGE....19 / VIEW_ROUND.....3 / PAGE....15 ~ ...21     │     <<..1 & ....1     │     <..1 & ....8     │     >..1 & .true     │     >>..1 & ...29
PAGE....20 / VIEW_ROUND.....3 / PAGE....15 ~ ...21     │     <<..1 & ....1     │     <..1 & ....8     │     >..1 & .true     │     >>..1 & ...29
PAGE....21 / VIEW_ROUND.....3 / PAGE....15 ~ ...21     │     <<..1 & ....1     │     <..1 & ....8     │     >..1 & .true     │     >>..1 & ...29
PAGE....22 / VIEW_ROUND.....4 / PAGE....22 ~ ...28     │     <<..1 & ....1     │     <..1 & ...15     │     >..1 & .true     │     >>..0 & .null
PAGE....23 / VIEW_ROUND.....4 / PAGE....22 ~ ...28     │     <<..1 & ....1     │     <..1 & ...15     │     >..1 & .true     │     >>..0 & .null
PAGE....24 / VIEW_ROUND.....4 / PAGE....22 ~ ...28     │     <<..1 & ....1     │     <..1 & ...15     │     >..1 & .true     │     >>..0 & .null
PAGE....25 / VIEW_ROUND.....4 / PAGE....22 ~ ...28     │     <<..1 & ....1     │     <..1 & ...15     │     >..1 & .true     │     >>..0 & .null
PAGE....26 / VIEW_ROUND.....4 / PAGE....22 ~ ...28     │     <<..1 & ....1     │     <..1 & ...15     │     >..1 & .true     │     >>..0 & .null
PAGE....27 / VIEW_ROUND.....4 / PAGE....22 ~ ...28     │     <<..1 & ....1     │     <..1 & ...15     │     >..1 & .true     │     >>..0 & .null
PAGE....28 / VIEW_ROUND.....4 / PAGE....22 ~ ...28     │     <<..1 & ....1     │     <..1 & ...15     │     >..1 & .true     │     >>..0 & .null
PAGE....29 / VIEW_ROUND.....5 / PAGE....29 ~ ...33     │     <<..1 & ....1     │     <..1 & ...22     │     >..0 & false     │     >>..0 & .null
PAGE....30 / VIEW_ROUND.....5 / PAGE....29 ~ ...33     │     <<..1 & ....1     │     <..1 & ...22     │     >..0 & false     │     >>..0 & .null
PAGE....31 / VIEW_ROUND.....5 / PAGE....29 ~ ...33     │     <<..1 & ....1     │     <..1 & ...22     │     >..0 & false     │     >>..0 & .null
PAGE....32 / VIEW_ROUND.....5 / PAGE....29 ~ ...33     │     <<..1 & ....1     │     <..1 & ...22     │     >..0 & false     │     >>..0 & .null
*/
