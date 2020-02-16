const $siteList = $(".siteList");

const $lastLi = $siteList.find("li.last");

const x = localStorage.getItem("x");

const xObject = JSON.parse(x);
const hashMap = xObject || [
  ({
    logo: "J",
    url: "https://www.juejin.im"
  },
  {
    logo: "J",
    url: "https://www.juejin.im"
  })
];

const simplifyUrl = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 / 开头的内容
}; //简化链接

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(` <li>
          <div class="site">
            <div class="logo">
              ${node.logo}
            </div>
            <div class="link">
            ${simplifyUrl(node.url)}
            </div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
          </div>
      </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    //利用JS实现a标签的跳转
    $li.on("click", ".close", e => {
      e.stopPropagation(); //阻止冒泡事件
      hashMap.splice(index, 1); //删除索引
      render();
    });
  });
};
//hashMap遍历生成以下的li
/*<li>
          <a href="https://www.juejin.im">
            <div class="site">
              <div class="logo">
                <img src="images/juejin.png" alt="掘金" />
              </div>
              <div class="link">juejin.im</div>
            </div>
          </a>
        </li>   
        */
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么");
  if (url.indexOf("http") != 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    //简化为logo首字母，并大写，也可在CSS.logo中text-transform: uppercase;
    url: url
  });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on("keypress", e => {
  const { key } = e; //相当于const key = e.key
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
}); //监听键盘事件
