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
      var allParent = document.getElementById("main");
      for (var i = 0; i < dataInt.data.length; i++) {
        var allBox = document.createElement("div");
        allBox.className = "box";
        allParent.appendChild(allBox);
        var allPic = document.createElement("div");
        allPic.className = "pic";
        allBox.appendChild(allPic);
        var allImg = document.createElement("img");
        allImg.src = "img/" + dataInt.data[i].src;
        allPic.appendChild(allImg);
      }
      waterfall("main", "box");
    }
    checkScrollSlide();
  };
};

function waterfall(parent, box) {
  //取出 main 底下所有 class 為 box 的元素
  var allParent = document.getElementById(parent);
  var allBox = getByClass(allParent, box);
  //計算整個頁面顯示的列數(頁面寬/box的寬)
  var allBoxW = allBox[0].offsetWidth;
  var col = Math.floor(document.documentElement.clientWidth / allBoxW);
  allParent.style.cssText = "width:" + allBoxW * col + "px;margin:0 auto";
  var heightArr = []; //存放每一列高度的陣列
  for (var i = 0; i < allBox.length; i++) {
    if (i < col) {
      heightArr.push(allBox[i].offsetHeight); //獲取第一列所有圖片的高度
    } else {
      var minHeight = Math.min.apply(null, heightArr); //使用apply()，改變this的指向，找出heightArr中最矮的圖片，讓第二列從這張圖片開始排列
      var index = getMinHeightIndex(heightArr, minHeight); //獲得最小高度圖片在索引的位置
      allBox[i].style.position = "absolute";
      allBox[i].style.top = minHeight + "px";
      //   allBox[i].style.left = allBoxW * index + "px";
      allBox[i].style.left = allBox[index].offsetLeft + "px";
      heightArr[index] += allBox[i].offsetHeight; //修改圖片以後，最小高度的那張圖片會改變，變成原來的值加上新加的圖片的高度
    }
  }
}

//根據 class 獲取元素

function getByClass(parent, clsName) {
  var boxArr = []; //用來儲存所有獲取到class為Box的元素
  allElements = parent.getElementsByTagName("*"); //取出父元素下所有子元素
  for (var i = 0; i < allElements.length; i++) {
    if (allElements[i].className == clsName) {
      boxArr.push(allElements[i]);
    }
  }
  return boxArr;
}

function getMinHeightIndex(arr, val) {
  for (var i in arr) {
    if (arr[i] === val) {
      return i;
    }
  }
}

//檢測是否具備滾動加載數據的條件
function checkScrollSlide() {
  var allParent = document.getElementById("main");
  var allBox = getByClass(allParent, "box");
  var lastBoxHeight =
    allBox[allBox.length - 1].offsetTop +
    Math.floor(allBox[allBox.length - 1].offsetHeight / 2);
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.body.clientHeight || document.documentElement.clientHeight;
  return lastBoxHeight < scrollTop + height ? true : false;
}
