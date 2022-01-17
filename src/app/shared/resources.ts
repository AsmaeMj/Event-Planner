export function initScrollListener(){
    (window as any).onscroll = function () {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        document.getElementById("btn-back-to-top").style.display = "block";
      } else {
        document.getElementById("btn-back-to-top").style.display = "none";
      }    
  }
}
export function backToTop() {
  console.log("back top");
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}