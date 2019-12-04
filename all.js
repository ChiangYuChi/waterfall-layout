window.onload = function() {
  waterfall("main", "box");
  var dataInt = {
    data: [
      { src: "1.jpg" },
      { src: "2.jpg" },
      { src: "3.jpg" },
      { src: "4.jpg" },
      { src: "5.jpg" },
      { src: "6.jpg" },
      { src: "7.jpg" },
      { src: "8.jpg" },
      { src: "9.jpg" },
      { src: "10.jpg" },
      { src: "11.jpg" },
      { src: "12.jpg" },
      { src: "13.jpg" },
      { src: "14.jpg" },
      { src: "15.jpg" },
      { src: "16.jpg" },
      { src: "17.jpg" },
      { src: "18.jpg" },
      { src: "19.jpg" },
      { src: "20.jpg" }
    ]
  };
  window.onscroll = function() {
    if (checkScrollSlide) {
      //把數據渲染到頁面尾端
      var oParent = document.getElementById("main");
      for (var i = 0; i < dataInt.data.length; i++) {
        var oBox = document.createElement("div");
        oBox.className = "box";
        oParent.appendChild(oBox);
        var oPic = document.createElement("div");
        oPic.className = "pic";
        oBox.appendChild(oPic);
        var oImg = document.createElement("img");
        oImg.src = "img/" + dataInt.data[i].src;
        oPic.appendChild(oImg);
      }
      waterfall("main", "box");
    }
    checkScrollSlide();
  };
};

function waterfall(parent, box) {
  //取出 main 底下所有 class 為 box 的元素
  var oParent = document.getElementById(parent);
  var oBox = getByClass(oParent, box);
  //計算整個頁面顯示的列數(頁面寬/box的寬)
  var oBoxW = oBox[0].offsetWidth;
  var col = Math.floor(document.documentElement.clientWidth / oBoxW);
  oParent.style.cssText = "width:" + oBoxW * col + "px;margin:0 auto";
  var hArr = []; //存放每一列高度的陣列
  for (var i = 0; i < oBox.length; i++) {
    if (i < col) {
      hArr.push(oBox[i].offsetHeight); //獲取第一列所有圖片的高度
    } else {
      var minH = Math.min.apply(null, hArr); //使用apply()，改變this的指向，找出hArr中最矮的圖片，讓第二列從這張圖片開始排列
      var index = getMinhIndex(hArr, minH); //獲得最小高度圖片在索引的位置
      oBox[i].style.position = "absolute";
      oBox[i].style.top = minH + "px";
      //   oBox[i].style.left = oBoxW * index + "px";
      oBox[i].style.left = oBox[index].offsetLeft + "px";
      hArr[index] += oBox[i].offsetHeight; //修改圖片以後，最小高度的那張圖片會改變，變成原來的值加上新加的圖片的高度
    }
  }
}

//根據 class 獲取元素

function getByClass(parent, clsName) {
  var boxArr = []; //用來儲存所有獲取到class為Box的元素
  oElements = parent.getElementsByTagName("*"); //取出父元素下所有子元素
  for (var i = 0; i < oElements.length; i++) {
    if (oElements[i].className == clsName) {
      boxArr.push(oElements[i]);
    }
  }
  return boxArr;
}

function getMinhIndex(arr, val) {
  for (var i in arr) {
    if (arr[i] === val) {
      return i;
    }
  }
}

//檢測是否具備滾動加載數據的條件
function checkScrollSlide() {
  var oParent = document.getElementById("main");
  var oBox = getByClass(oParent, "box");
  var lastBoxH =
    oBox[oBox.length - 1].offsetTop +
    Math.floor(oBox[oBox.length - 1].offsetHeight / 2);
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.body.clientHeight || document.documentElement.clientHeight;
  return lastBoxH < scrollTop + height ? true : false;
}
