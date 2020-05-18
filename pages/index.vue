<template>
  <div class="index-box">
    <img class="header-image"
      src="http://p0.so.qhimgs1.com/t028097badf2cc5acc0.jpg">
    <div class="person-info">
      <h1>CardHouse</h1>
      <p class="motto">但行好事，莫问前程</p>
      <p class="show-info">您好，我是一名前端工程师</p>
    </div>
  </div>
</template>

<style lang="scss">
.index-box {
  left: 0;
  right: 0;
  padding: 8px;
  top: 15vh;
  width: 600px;
  max-width: 80vw;
  margin: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  position: absolute;
  height: max-content;
  justify-content: center;
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.25);
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .header-image {
    width: 86px;
    height: 86px;
    display: flex;
    cursor: pointer;
    overflow: hidden;
    border-radius: 50%;
    align-items: center;
    transition: all 0.6s;
    &:hover {
      transform: rotate(180deg);
    }
  }
  .person-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1 {
      color: #fff;
    }
    .motto {
      font-family: "ff-tisa-web-pro-1", "ff-tisa-web-pro-2", "Lucida Grande",
        "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei",
        "WenQuanYi Micro Hei", sans-serif;
      font-size: 1.2em;
      font-weight: lighter;
      letter-spacing: 3px;
      color: #cccccc;
      -webkit-font-smoothing: antialiased;
    }
  }
}
</style>