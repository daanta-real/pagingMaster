
// 필요 정보를 담은 객체를 입력하면 페이징 정보를 추가해서 반환해 주는 클래스
// TODO: 연속출력 구현
// TODO: jumpAmount - 값체크 추가. pagesPreView보다는 커야 하며, 또한 고정형으로 만들 경우 뷰의 n배가 되어야 한다. (결과값으로 뷰 첫페이지값을 써서 그럼)
class pagingMaster {

    errorMsg(msg) {
        console.log(msg);
        throw false;
    }

    // 클래스 생성 시 필요 정보: 객체. currPage(현재페이지), totalArticles(전체 글 수), rowsPerPage(1페이지 당 글 수), pagesPerView(1뷰 당 페이지 수)
    // For make an instant you have to pass 4 props below - Hereinafter reffered to 'Essential Props'
    //  - currPage (current page number)
    //  - totalArticles (total articles the board has)
    //  - rowsPerPage (displaying row amount per one page; ex) 10 rows per page, 5 rows per page, etc.)
    //  - pagesPerView (dispalying page amount per one view; ex) 10 pages per one view, 5 pages per one view, etc.)
    constructor(params) {
        this.setInputValues(params);
    }
    
    // Assign all the essential props
    setInputValues(params) {

        // Chksum 1 - typeof params
        if(params === undefined) this.errorMsg("parameter required");
        if(typeof params != "object") this.errorMsg("parameter must be an Object");
        // Chksum 2 - param length
        if(chkTargets.length > 4) {
            this.errorMsg('The parameter has the value(s) which is not required for creating class.')
        }
        // Chksum 3 - sub variables of params
        const chkTargets = ["currPage", "totalArticles", "rowsPerPage", "pagesPerView"];
        chkTargets.forEach((i) => {
            if(!params.hasOwnProperty(i) || isNaN(parseFloat(params[i]))) {
                this.errorMsg(`The value '${i}' has an error`);
            }
        });

        Object.assign(this, params);

    }

    gotoPage(pageNum) {

        // Chksum
        if(pageNum === undefined) this.errorMsg("pageNum required");
        pageNum = parseInt(pageNum);
        if(!isNaN(pageNum)) this.errorMsg("pageNum must be a Number");
        
        this.currPage = pageNum;

    }

    // Initialize or reset all the calculated props
    reset() {
        this.currView = this.min = this.max = null, // Infoes about current view
        this.hasPrev = this.hasNext = this.toPrev = this.toNext = null, // for PREV / NEXT view
        this.hasJumpPrev = this.hasJumpNext = this.toJumpPrev = this.toJumpNext = null, // for PREV JUMP / NEXT JUMP view
        this.hasFirst = this.hasLast = this.toFirst = this.toLast = null; // for FIRST / LAST view
    }
    
    // (Re)calculate ALL prop values
    getPagingProps(params) {

        // If gets params then initialize, else just reset calc props
        if(params) this.setInputValues(params);
        this.reset();

        // Set Basic props
        this.lastPage = Math.ceil(this.totalArticles / this.rowsPerPage);
        this.currView = Math.ceil(this.currPage / this.pagesPerView + 1) - 1;

        // Set min, max
        this.max = Math.min(this.currView * this.pagesPerView, this.lastPage);
        this.min = Math.max((this.currView - 1) * this.pagesPerView + 1, 1);

        // Set prev, next
        this.hasPrev = this.min > this.rowsPerPage;
        this.hasNext = this.max < this.lastPage;
        if(this.hasPrev) this.toPrev = this.min - this.pagesPerView;
        if(this.hasNext) this.toNext = this.max + 1;

        // Set first, last
        this.hasFirst = this.min > this.pagesPerView * 2;
        this.hasLast = this.max + this.pagesPerView < this.lastPage;
        if(this.hasFirst) this.toFirst = 1;
        if(this.hasLast) this.toLast = Math.min(Math.floor(this.lastPage / this.pagesPerView) * this.pagesPerView + 1, this.lastPage);

        // Set jumpBefore, jumpNext
        // You maybe need use this if you need to jump over than just one view.
        if(!!this.jumpAmount) { // page amount for jumping
            this.toJumpPrev = this.min - this.jumpAmount;
            this.toJumpNext = this.min + this.jumpAmount;
            this.hasJumpPrev = this.toJumpPrev >= 1;
            this.hasJumpNext = this.toJumpNext <= this.lastPage;
        }    return p;

    }
    
}

// Result example

// Library: n 앞에 width만큼 공백 붙이기
function nPad(nn, width) {
    let n = new String(nn);
    return n.length >= width ? n : new Array(width - n.length + 1).join(' ') + n;
}

// Paging definition
var p = {
    currPage: 1,
    totalArticles: 297,
    rowsPerPage: 3,
    pagesPerView: 7,
    jumpAmount: 11
};

// Calculate results
var resultTxt = "";
let i = 1;
getPagingProps(p);
resultTxt += "currPage: "      + this.currPage    + ", totalArticles: " + this.totalArticles
          +  ", rowsPerPage: " + this.rowsPerPage + ", pagesPerView: "  + this.pagesPerView
          + (this.jumpAmount ? (", jumpAmount: " + this.jumpAmount) : "")
          +  "\n\n";

for(let i = 1; i < getPagingProps(p).lastPage; i++) {

    this.currPage = i;
    const props = getPagingProps(p);
    resultTxt
    += "PAGE."      + nPad(this.currPage, 4) + " / VIEW_ROUND." + nPad(this.currView,   4) + " / PAGE." + nPad(this.min, 4) + " ~ " + nPad(this.max, 4) + "     "
    +  "▶    <<< " + (this.hasFirst    * 1 ? "■" : "□") + " & " + nPad(this.toFirst,    4) + "     "
    +  "│     <<  " + (this.hasJumpPrev * 1 ? "■" : "□") + " & " + nPad(this.toJumpPrev, 4) + "     "
    +  "│     <  "  + (this.hasPrev     * 1 ? "■" : "□") + " & " + nPad(this.toPrev,     4) + "          "
    +  "★★ [" + nPad("P" + this.currPage, 4) + "] ★★         >  "  + (this.hasNext     * 1 ? "■" : "□") + " & " + nPad(this.toNext,     4) + "     "
    +  "│     >> "  + (this.hasJumpNext * 1 ? "■" : "□") + " & " + nPad(this.toJumpNext, 4) + "     "
    +  "│     >>  " + (this.hasLast     * 1 ? "■" : "□") + " & " + nPad(this.toLast,     4) + "\n";
    if(i % this.pagesPerView == 0) resultTxt += "\n";

}

// Show results
console.log(resultTxt);

/* RESULT:

currPage: 1, totalArticles: 297, rowsPerPage: 3, pagesPerView: 7, jumpAmount: 11

PAGE.   1 / VIEW_ROUND.   1 / PAGE.   1 ~    7     ▶    <<< □ & null     │     <<  □ &  -10     │     <  □ & null          ★★ [  P1] ★★         >  ■ &    8     │     >> ■ &   12     │     >>  ■ &   99
PAGE.   2 / VIEW_ROUND.   1 / PAGE.   1 ~    7     ▶    <<< □ & null     │     <<  □ &  -10     │     <  □ & null          ★★ [  P2] ★★         >  ■ &    8     │     >> ■ &   12     │     >>  ■ &   99
PAGE.   3 / VIEW_ROUND.   1 / PAGE.   1 ~    7     ▶    <<< □ & null     │     <<  □ &  -10     │     <  □ & null          ★★ [  P3] ★★         >  ■ &    8     │     >> ■ &   12     │     >>  ■ &   99
PAGE.   4 / VIEW_ROUND.   1 / PAGE.   1 ~    7     ▶    <<< □ & null     │     <<  □ &  -10     │     <  □ & null          ★★ [  P4] ★★         >  ■ &    8     │     >> ■ &   12     │     >>  ■ &   99
PAGE.   5 / VIEW_ROUND.   1 / PAGE.   1 ~    7     ▶    <<< □ & null     │     <<  □ &  -10     │     <  □ & null          ★★ [  P5] ★★         >  ■ &    8     │     >> ■ &   12     │     >>  ■ &   99
PAGE.   6 / VIEW_ROUND.   1 / PAGE.   1 ~    7     ▶    <<< □ & null     │     <<  □ &  -10     │     <  □ & null          ★★ [  P6] ★★         >  ■ &    8     │     >> ■ &   12     │     >>  ■ &   99
PAGE.   7 / VIEW_ROUND.   1 / PAGE.   1 ~    7     ▶    <<< □ & null     │     <<  □ &  -10     │     <  □ & null          ★★ [  P7] ★★         >  ■ &    8     │     >> ■ &   12     │     >>  ■ &   99

PAGE.   8 / VIEW_ROUND.   2 / PAGE.   8 ~   14     ▶    <<< □ & null     │     <<  □ &   -3     │     <  ■ &    1          ★★ [  P8] ★★         >  ■ &   15     │     >> ■ &   19     │     >>  ■ &   99
PAGE.   9 / VIEW_ROUND.   2 / PAGE.   8 ~   14     ▶    <<< □ & null     │     <<  □ &   -3     │     <  ■ &    1          ★★ [  P9] ★★         >  ■ &   15     │     >> ■ &   19     │     >>  ■ &   99
PAGE.  10 / VIEW_ROUND.   2 / PAGE.   8 ~   14     ▶    <<< □ & null     │     <<  □ &   -3     │     <  ■ &    1          ★★ [ P10] ★★         >  ■ &   15     │     >> ■ &   19     │     >>  ■ &   99
PAGE.  11 / VIEW_ROUND.   2 / PAGE.   8 ~   14     ▶    <<< □ & null     │     <<  □ &   -3     │     <  ■ &    1          ★★ [ P11] ★★         >  ■ &   15     │     >> ■ &   19     │     >>  ■ &   99
PAGE.  12 / VIEW_ROUND.   2 / PAGE.   8 ~   14     ▶    <<< □ & null     │     <<  □ &   -3     │     <  ■ &    1          ★★ [ P12] ★★         >  ■ &   15     │     >> ■ &   19     │     >>  ■ &   99
PAGE.  13 / VIEW_ROUND.   2 / PAGE.   8 ~   14     ▶    <<< □ & null     │     <<  □ &   -3     │     <  ■ &    1          ★★ [ P13] ★★         >  ■ &   15     │     >> ■ &   19     │     >>  ■ &   99
PAGE.  14 / VIEW_ROUND.   2 / PAGE.   8 ~   14     ▶    <<< □ & null     │     <<  □ &   -3     │     <  ■ &    1          ★★ [ P14] ★★         >  ■ &   15     │     >> ■ &   19     │     >>  ■ &   99

PAGE.  15 / VIEW_ROUND.   3 / PAGE.  15 ~   21     ▶    <<< ■ &    1     │     <<  ■ &    4     │     <  ■ &    8          ★★ [ P15] ★★         >  ■ &   22     │     >> ■ &   26     │     >>  ■ &   99
PAGE.  16 / VIEW_ROUND.   3 / PAGE.  15 ~   21     ▶    <<< ■ &    1     │     <<  ■ &    4     │     <  ■ &    8          ★★ [ P16] ★★         >  ■ &   22     │     >> ■ &   26     │     >>  ■ &   99
PAGE.  17 / VIEW_ROUND.   3 / PAGE.  15 ~   21     ▶    <<< ■ &    1     │     <<  ■ &    4     │     <  ■ &    8          ★★ [ P17] ★★         >  ■ &   22     │     >> ■ &   26     │     >>  ■ &   99
PAGE.  18 / VIEW_ROUND.   3 / PAGE.  15 ~   21     ▶    <<< ■ &    1     │     <<  ■ &    4     │     <  ■ &    8          ★★ [ P18] ★★         >  ■ &   22     │     >> ■ &   26     │     >>  ■ &   99
PAGE.  19 / VIEW_ROUND.   3 / PAGE.  15 ~   21     ▶    <<< ■ &    1     │     <<  ■ &    4     │     <  ■ &    8          ★★ [ P19] ★★         >  ■ &   22     │     >> ■ &   26     │     >>  ■ &   99
PAGE.  20 / VIEW_ROUND.   3 / PAGE.  15 ~   21     ▶    <<< ■ &    1     │     <<  ■ &    4     │     <  ■ &    8          ★★ [ P20] ★★         >  ■ &   22     │     >> ■ &   26     │     >>  ■ &   99
PAGE.  21 / VIEW_ROUND.   3 / PAGE.  15 ~   21     ▶    <<< ■ &    1     │     <<  ■ &    4     │     <  ■ &    8          ★★ [ P21] ★★         >  ■ &   22     │     >> ■ &   26     │     >>  ■ &   99

PAGE.  22 / VIEW_ROUND.   4 / PAGE.  22 ~   28     ▶    <<< ■ &    1     │     <<  ■ &   11     │     <  ■ &   15          ★★ [ P22] ★★         >  ■ &   29     │     >> ■ &   33     │     >>  ■ &   99
PAGE.  23 / VIEW_ROUND.   4 / PAGE.  22 ~   28     ▶    <<< ■ &    1     │     <<  ■ &   11     │     <  ■ &   15          ★★ [ P23] ★★         >  ■ &   29     │     >> ■ &   33     │     >>  ■ &   99
PAGE.  24 / VIEW_ROUND.   4 / PAGE.  22 ~   28     ▶    <<< ■ &    1     │     <<  ■ &   11     │     <  ■ &   15          ★★ [ P24] ★★         >  ■ &   29     │     >> ■ &   33     │     >>  ■ &   99
PAGE.  25 / VIEW_ROUND.   4 / PAGE.  22 ~   28     ▶    <<< ■ &    1     │     <<  ■ &   11     │     <  ■ &   15          ★★ [ P25] ★★         >  ■ &   29     │     >> ■ &   33     │     >>  ■ &   99
PAGE.  26 / VIEW_ROUND.   4 / PAGE.  22 ~   28     ▶    <<< ■ &    1     │     <<  ■ &   11     │     <  ■ &   15          ★★ [ P26] ★★         >  ■ &   29     │     >> ■ &   33     │     >>  ■ &   99
PAGE.  27 / VIEW_ROUND.   4 / PAGE.  22 ~   28     ▶    <<< ■ &    1     │     <<  ■ &   11     │     <  ■ &   15          ★★ [ P27] ★★         >  ■ &   29     │     >> ■ &   33     │     >>  ■ &   99
PAGE.  28 / VIEW_ROUND.   4 / PAGE.  22 ~   28     ▶    <<< ■ &    1     │     <<  ■ &   11     │     <  ■ &   15          ★★ [ P28] ★★         >  ■ &   29     │     >> ■ &   33     │     >>  ■ &   99

PAGE.  29 / VIEW_ROUND.   5 / PAGE.  29 ~   35     ▶    <<< ■ &    1     │     <<  ■ &   18     │     <  ■ &   22          ★★ [ P29] ★★         >  ■ &   36     │     >> ■ &   40     │     >>  ■ &   99
PAGE.  30 / VIEW_ROUND.   5 / PAGE.  29 ~   35     ▶    <<< ■ &    1     │     <<  ■ &   18     │     <  ■ &   22          ★★ [ P30] ★★         >  ■ &   36     │     >> ■ &   40     │     >>  ■ &   99
PAGE.  31 / VIEW_ROUND.   5 / PAGE.  29 ~   35     ▶    <<< ■ &    1     │     <<  ■ &   18     │     <  ■ &   22          ★★ [ P31] ★★         >  ■ &   36     │     >> ■ &   40     │     >>  ■ &   99
PAGE.  32 / VIEW_ROUND.   5 / PAGE.  29 ~   35     ▶    <<< ■ &    1     │     <<  ■ &   18     │     <  ■ &   22          ★★ [ P32] ★★         >  ■ &   36     │     >> ■ &   40     │     >>  ■ &   99
PAGE.  33 / VIEW_ROUND.   5 / PAGE.  29 ~   35     ▶    <<< ■ &    1     │     <<  ■ &   18     │     <  ■ &   22          ★★ [ P33] ★★         >  ■ &   36     │     >> ■ &   40     │     >>  ■ &   99
PAGE.  34 / VIEW_ROUND.   5 / PAGE.  29 ~   35     ▶    <<< ■ &    1     │     <<  ■ &   18     │     <  ■ &   22          ★★ [ P34] ★★         >  ■ &   36     │     >> ■ &   40     │     >>  ■ &   99
PAGE.  35 / VIEW_ROUND.   5 / PAGE.  29 ~   35     ▶    <<< ■ &    1     │     <<  ■ &   18     │     <  ■ &   22          ★★ [ P35] ★★         >  ■ &   36     │     >> ■ &   40     │     >>  ■ &   99

PAGE.  36 / VIEW_ROUND.   6 / PAGE.  36 ~   42     ▶    <<< ■ &    1     │     <<  ■ &   25     │     <  ■ &   29          ★★ [ P36] ★★         >  ■ &   43     │     >> ■ &   47     │     >>  ■ &   99
PAGE.  37 / VIEW_ROUND.   6 / PAGE.  36 ~   42     ▶    <<< ■ &    1     │     <<  ■ &   25     │     <  ■ &   29          ★★ [ P37] ★★         >  ■ &   43     │     >> ■ &   47     │     >>  ■ &   99
PAGE.  38 / VIEW_ROUND.   6 / PAGE.  36 ~   42     ▶    <<< ■ &    1     │     <<  ■ &   25     │     <  ■ &   29          ★★ [ P38] ★★         >  ■ &   43     │     >> ■ &   47     │     >>  ■ &   99
PAGE.  39 / VIEW_ROUND.   6 / PAGE.  36 ~   42     ▶    <<< ■ &    1     │     <<  ■ &   25     │     <  ■ &   29          ★★ [ P39] ★★         >  ■ &   43     │     >> ■ &   47     │     >>  ■ &   99
PAGE.  40 / VIEW_ROUND.   6 / PAGE.  36 ~   42     ▶    <<< ■ &    1     │     <<  ■ &   25     │     <  ■ &   29          ★★ [ P40] ★★         >  ■ &   43     │     >> ■ &   47     │     >>  ■ &   99
PAGE.  41 / VIEW_ROUND.   6 / PAGE.  36 ~   42     ▶    <<< ■ &    1     │     <<  ■ &   25     │     <  ■ &   29          ★★ [ P41] ★★         >  ■ &   43     │     >> ■ &   47     │     >>  ■ &   99
PAGE.  42 / VIEW_ROUND.   6 / PAGE.  36 ~   42     ▶    <<< ■ &    1     │     <<  ■ &   25     │     <  ■ &   29          ★★ [ P42] ★★         >  ■ &   43     │     >> ■ &   47     │     >>  ■ &   99

PAGE.  43 / VIEW_ROUND.   7 / PAGE.  43 ~   49     ▶    <<< ■ &    1     │     <<  ■ &   32     │     <  ■ &   36          ★★ [ P43] ★★         >  ■ &   50     │     >> ■ &   54     │     >>  ■ &   99
PAGE.  44 / VIEW_ROUND.   7 / PAGE.  43 ~   49     ▶    <<< ■ &    1     │     <<  ■ &   32     │     <  ■ &   36          ★★ [ P44] ★★         >  ■ &   50     │     >> ■ &   54     │     >>  ■ &   99
PAGE.  45 / VIEW_ROUND.   7 / PAGE.  43 ~   49     ▶    <<< ■ &    1     │     <<  ■ &   32     │     <  ■ &   36          ★★ [ P45] ★★         >  ■ &   50     │     >> ■ &   54     │     >>  ■ &   99
PAGE.  46 / VIEW_ROUND.   7 / PAGE.  43 ~   49     ▶    <<< ■ &    1     │     <<  ■ &   32     │     <  ■ &   36          ★★ [ P46] ★★         >  ■ &   50     │     >> ■ &   54     │     >>  ■ &   99
PAGE.  47 / VIEW_ROUND.   7 / PAGE.  43 ~   49     ▶    <<< ■ &    1     │     <<  ■ &   32     │     <  ■ &   36          ★★ [ P47] ★★         >  ■ &   50     │     >> ■ &   54     │     >>  ■ &   99
PAGE.  48 / VIEW_ROUND.   7 / PAGE.  43 ~   49     ▶    <<< ■ &    1     │     <<  ■ &   32     │     <  ■ &   36          ★★ [ P48] ★★         >  ■ &   50     │     >> ■ &   54     │     >>  ■ &   99
PAGE.  49 / VIEW_ROUND.   7 / PAGE.  43 ~   49     ▶    <<< ■ &    1     │     <<  ■ &   32     │     <  ■ &   36          ★★ [ P49] ★★         >  ■ &   50     │     >> ■ &   54     │     >>  ■ &   99

PAGE.  50 / VIEW_ROUND.   8 / PAGE.  50 ~   56     ▶    <<< ■ &    1     │     <<  ■ &   39     │     <  ■ &   43          ★★ [ P50] ★★         >  ■ &   57     │     >> ■ &   61     │     >>  ■ &   99
PAGE.  51 / VIEW_ROUND.   8 / PAGE.  50 ~   56     ▶    <<< ■ &    1     │     <<  ■ &   39     │     <  ■ &   43          ★★ [ P51] ★★         >  ■ &   57     │     >> ■ &   61     │     >>  ■ &   99
PAGE.  52 / VIEW_ROUND.   8 / PAGE.  50 ~   56     ▶    <<< ■ &    1     │     <<  ■ &   39     │     <  ■ &   43          ★★ [ P52] ★★         >  ■ &   57     │     >> ■ &   61     │     >>  ■ &   99
PAGE.  53 / VIEW_ROUND.   8 / PAGE.  50 ~   56     ▶    <<< ■ &    1     │     <<  ■ &   39     │     <  ■ &   43          ★★ [ P53] ★★         >  ■ &   57     │     >> ■ &   61     │     >>  ■ &   99
PAGE.  54 / VIEW_ROUND.   8 / PAGE.  50 ~   56     ▶    <<< ■ &    1     │     <<  ■ &   39     │     <  ■ &   43          ★★ [ P54] ★★         >  ■ &   57     │     >> ■ &   61     │     >>  ■ &   99
PAGE.  55 / VIEW_ROUND.   8 / PAGE.  50 ~   56     ▶    <<< ■ &    1     │     <<  ■ &   39     │     <  ■ &   43          ★★ [ P55] ★★         >  ■ &   57     │     >> ■ &   61     │     >>  ■ &   99
PAGE.  56 / VIEW_ROUND.   8 / PAGE.  50 ~   56     ▶    <<< ■ &    1     │     <<  ■ &   39     │     <  ■ &   43          ★★ [ P56] ★★         >  ■ &   57     │     >> ■ &   61     │     >>  ■ &   99

PAGE.  57 / VIEW_ROUND.   9 / PAGE.  57 ~   63     ▶    <<< ■ &    1     │     <<  ■ &   46     │     <  ■ &   50          ★★ [ P57] ★★         >  ■ &   64     │     >> ■ &   68     │     >>  ■ &   99
PAGE.  58 / VIEW_ROUND.   9 / PAGE.  57 ~   63     ▶    <<< ■ &    1     │     <<  ■ &   46     │     <  ■ &   50          ★★ [ P58] ★★         >  ■ &   64     │     >> ■ &   68     │     >>  ■ &   99
PAGE.  59 / VIEW_ROUND.   9 / PAGE.  57 ~   63     ▶    <<< ■ &    1     │     <<  ■ &   46     │     <  ■ &   50          ★★ [ P59] ★★         >  ■ &   64     │     >> ■ &   68     │     >>  ■ &   99
PAGE.  60 / VIEW_ROUND.   9 / PAGE.  57 ~   63     ▶    <<< ■ &    1     │     <<  ■ &   46     │     <  ■ &   50          ★★ [ P60] ★★         >  ■ &   64     │     >> ■ &   68     │     >>  ■ &   99
PAGE.  61 / VIEW_ROUND.   9 / PAGE.  57 ~   63     ▶    <<< ■ &    1     │     <<  ■ &   46     │     <  ■ &   50          ★★ [ P61] ★★         >  ■ &   64     │     >> ■ &   68     │     >>  ■ &   99
PAGE.  62 / VIEW_ROUND.   9 / PAGE.  57 ~   63     ▶    <<< ■ &    1     │     <<  ■ &   46     │     <  ■ &   50          ★★ [ P62] ★★         >  ■ &   64     │     >> ■ &   68     │     >>  ■ &   99
PAGE.  63 / VIEW_ROUND.   9 / PAGE.  57 ~   63     ▶    <<< ■ &    1     │     <<  ■ &   46     │     <  ■ &   50          ★★ [ P63] ★★         >  ■ &   64     │     >> ■ &   68     │     >>  ■ &   99

PAGE.  64 / VIEW_ROUND.  10 / PAGE.  64 ~   70     ▶    <<< ■ &    1     │     <<  ■ &   53     │     <  ■ &   57          ★★ [ P64] ★★         >  ■ &   71     │     >> ■ &   75     │     >>  ■ &   99
PAGE.  65 / VIEW_ROUND.  10 / PAGE.  64 ~   70     ▶    <<< ■ &    1     │     <<  ■ &   53     │     <  ■ &   57          ★★ [ P65] ★★         >  ■ &   71     │     >> ■ &   75     │     >>  ■ &   99
PAGE.  66 / VIEW_ROUND.  10 / PAGE.  64 ~   70     ▶    <<< ■ &    1     │     <<  ■ &   53     │     <  ■ &   57          ★★ [ P66] ★★         >  ■ &   71     │     >> ■ &   75     │     >>  ■ &   99
PAGE.  67 / VIEW_ROUND.  10 / PAGE.  64 ~   70     ▶    <<< ■ &    1     │     <<  ■ &   53     │     <  ■ &   57          ★★ [ P67] ★★         >  ■ &   71     │     >> ■ &   75     │     >>  ■ &   99
PAGE.  68 / VIEW_ROUND.  10 / PAGE.  64 ~   70     ▶    <<< ■ &    1     │     <<  ■ &   53     │     <  ■ &   57          ★★ [ P68] ★★         >  ■ &   71     │     >> ■ &   75     │     >>  ■ &   99
PAGE.  69 / VIEW_ROUND.  10 / PAGE.  64 ~   70     ▶    <<< ■ &    1     │     <<  ■ &   53     │     <  ■ &   57          ★★ [ P69] ★★         >  ■ &   71     │     >> ■ &   75     │     >>  ■ &   99
PAGE.  70 / VIEW_ROUND.  10 / PAGE.  64 ~   70     ▶    <<< ■ &    1     │     <<  ■ &   53     │     <  ■ &   57          ★★ [ P70] ★★         >  ■ &   71     │     >> ■ &   75     │     >>  ■ &   99

PAGE.  71 / VIEW_ROUND.  11 / PAGE.  71 ~   77     ▶    <<< ■ &    1     │     <<  ■ &   60     │     <  ■ &   64          ★★ [ P71] ★★         >  ■ &   78     │     >> ■ &   82     │     >>  ■ &   99
PAGE.  72 / VIEW_ROUND.  11 / PAGE.  71 ~   77     ▶    <<< ■ &    1     │     <<  ■ &   60     │     <  ■ &   64          ★★ [ P72] ★★         >  ■ &   78     │     >> ■ &   82     │     >>  ■ &   99
PAGE.  73 / VIEW_ROUND.  11 / PAGE.  71 ~   77     ▶    <<< ■ &    1     │     <<  ■ &   60     │     <  ■ &   64          ★★ [ P73] ★★         >  ■ &   78     │     >> ■ &   82     │     >>  ■ &   99
PAGE.  74 / VIEW_ROUND.  11 / PAGE.  71 ~   77     ▶    <<< ■ &    1     │     <<  ■ &   60     │     <  ■ &   64          ★★ [ P74] ★★         >  ■ &   78     │     >> ■ &   82     │     >>  ■ &   99
PAGE.  75 / VIEW_ROUND.  11 / PAGE.  71 ~   77     ▶    <<< ■ &    1     │     <<  ■ &   60     │     <  ■ &   64          ★★ [ P75] ★★         >  ■ &   78     │     >> ■ &   82     │     >>  ■ &   99
PAGE.  76 / VIEW_ROUND.  11 / PAGE.  71 ~   77     ▶    <<< ■ &    1     │     <<  ■ &   60     │     <  ■ &   64          ★★ [ P76] ★★         >  ■ &   78     │     >> ■ &   82     │     >>  ■ &   99
PAGE.  77 / VIEW_ROUND.  11 / PAGE.  71 ~   77     ▶    <<< ■ &    1     │     <<  ■ &   60     │     <  ■ &   64          ★★ [ P77] ★★         >  ■ &   78     │     >> ■ &   82     │     >>  ■ &   99

PAGE.  78 / VIEW_ROUND.  12 / PAGE.  78 ~   84     ▶    <<< ■ &    1     │     <<  ■ &   67     │     <  ■ &   71          ★★ [ P78] ★★         >  ■ &   85     │     >> ■ &   89     │     >>  ■ &   99
PAGE.  79 / VIEW_ROUND.  12 / PAGE.  78 ~   84     ▶    <<< ■ &    1     │     <<  ■ &   67     │     <  ■ &   71          ★★ [ P79] ★★         >  ■ &   85     │     >> ■ &   89     │     >>  ■ &   99
PAGE.  80 / VIEW_ROUND.  12 / PAGE.  78 ~   84     ▶    <<< ■ &    1     │     <<  ■ &   67     │     <  ■ &   71          ★★ [ P80] ★★         >  ■ &   85     │     >> ■ &   89     │     >>  ■ &   99
PAGE.  81 / VIEW_ROUND.  12 / PAGE.  78 ~   84     ▶    <<< ■ &    1     │     <<  ■ &   67     │     <  ■ &   71          ★★ [ P81] ★★         >  ■ &   85     │     >> ■ &   89     │     >>  ■ &   99
PAGE.  82 / VIEW_ROUND.  12 / PAGE.  78 ~   84     ▶    <<< ■ &    1     │     <<  ■ &   67     │     <  ■ &   71          ★★ [ P82] ★★         >  ■ &   85     │     >> ■ &   89     │     >>  ■ &   99
PAGE.  83 / VIEW_ROUND.  12 / PAGE.  78 ~   84     ▶    <<< ■ &    1     │     <<  ■ &   67     │     <  ■ &   71          ★★ [ P83] ★★         >  ■ &   85     │     >> ■ &   89     │     >>  ■ &   99
PAGE.  84 / VIEW_ROUND.  12 / PAGE.  78 ~   84     ▶    <<< ■ &    1     │     <<  ■ &   67     │     <  ■ &   71          ★★ [ P84] ★★         >  ■ &   85     │     >> ■ &   89     │     >>  ■ &   99

PAGE.  85 / VIEW_ROUND.  13 / PAGE.  85 ~   91     ▶    <<< ■ &    1     │     <<  ■ &   74     │     <  ■ &   78          ★★ [ P85] ★★         >  ■ &   92     │     >> ■ &   96     │     >>  ■ &   99
PAGE.  86 / VIEW_ROUND.  13 / PAGE.  85 ~   91     ▶    <<< ■ &    1     │     <<  ■ &   74     │     <  ■ &   78          ★★ [ P86] ★★         >  ■ &   92     │     >> ■ &   96     │     >>  ■ &   99
PAGE.  87 / VIEW_ROUND.  13 / PAGE.  85 ~   91     ▶    <<< ■ &    1     │     <<  ■ &   74     │     <  ■ &   78          ★★ [ P87] ★★         >  ■ &   92     │     >> ■ &   96     │     >>  ■ &   99
PAGE.  88 / VIEW_ROUND.  13 / PAGE.  85 ~   91     ▶    <<< ■ &    1     │     <<  ■ &   74     │     <  ■ &   78          ★★ [ P88] ★★         >  ■ &   92     │     >> ■ &   96     │     >>  ■ &   99
PAGE.  89 / VIEW_ROUND.  13 / PAGE.  85 ~   91     ▶    <<< ■ &    1     │     <<  ■ &   74     │     <  ■ &   78          ★★ [ P89] ★★         >  ■ &   92     │     >> ■ &   96     │     >>  ■ &   99
PAGE.  90 / VIEW_ROUND.  13 / PAGE.  85 ~   91     ▶    <<< ■ &    1     │     <<  ■ &   74     │     <  ■ &   78          ★★ [ P90] ★★         >  ■ &   92     │     >> ■ &   96     │     >>  ■ &   99
PAGE.  91 / VIEW_ROUND.  13 / PAGE.  85 ~   91     ▶    <<< ■ &    1     │     <<  ■ &   74     │     <  ■ &   78          ★★ [ P91] ★★         >  ■ &   92     │     >> ■ &   96     │     >>  ■ &   99

PAGE.  92 / VIEW_ROUND.  14 / PAGE.  92 ~   98     ▶    <<< ■ &    1     │     <<  ■ &   81     │     <  ■ &   85          ★★ [ P92] ★★         >  ■ &   99     │     >> □ &  103     │     >>  □ & null
PAGE.  93 / VIEW_ROUND.  14 / PAGE.  92 ~   98     ▶    <<< ■ &    1     │     <<  ■ &   81     │     <  ■ &   85          ★★ [ P93] ★★         >  ■ &   99     │     >> □ &  103     │     >>  □ & null
PAGE.  94 / VIEW_ROUND.  14 / PAGE.  92 ~   98     ▶    <<< ■ &    1     │     <<  ■ &   81     │     <  ■ &   85          ★★ [ P94] ★★         >  ■ &   99     │     >> □ &  103     │     >>  □ & null
PAGE.  95 / VIEW_ROUND.  14 / PAGE.  92 ~   98     ▶    <<< ■ &    1     │     <<  ■ &   81     │     <  ■ &   85          ★★ [ P95] ★★         >  ■ &   99     │     >> □ &  103     │     >>  □ & null
PAGE.  96 / VIEW_ROUND.  14 / PAGE.  92 ~   98     ▶    <<< ■ &    1     │     <<  ■ &   81     │     <  ■ &   85          ★★ [ P96] ★★         >  ■ &   99     │     >> □ &  103     │     >>  □ & null
PAGE.  97 / VIEW_ROUND.  14 / PAGE.  92 ~   98     ▶    <<< ■ &    1     │     <<  ■ &   81     │     <  ■ &   85          ★★ [ P97] ★★         >  ■ &   99     │     >> □ &  103     │     >>  □ & null
PAGE.  98 / VIEW_ROUND.  14 / PAGE.  92 ~   98     ▶    <<< ■ &    1     │     <<  ■ &   81     │     <  ■ &   85          ★★ [ P98] ★★         >  ■ &   99     │     >> □ &  103     │     >>  □ & null

*/
