<template>
  <div class="home-page">
    <div class="top-show">
      <img src="https://ae01.alicdn.com/kf/H7f2b5132a5034125b82295bb5cb34db0j.jpg">
      <div class="day-info">
        <p class="title">少爷的博客</p>
      </div>
    </div>
    <div class="bubbles-box">
      <div class="air-bubbles"
        v-for="i in 200"
        :key="i"></div>
    </div>
  </div>
</template>

<style lang="scss">
.home-page {
  position: relative;
  width: 100%;
  .top-show {
    display: flex;
    overflow: hidden;
    max-height: 100vh;
    position: relative;
    align-items: center;
    justify-content: center;
    .day-info {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      position: absolute;
      width: max-content;
      height: max-content;
      .title {
        color: #fff;
        font-size: 5rem;
        font-weight: 700;
        letter-spacing: -1px;
        font-family: "Playball", cursive;
        text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
      }
    }
  }
  @media (max-width: 960px) {
    .bubbles-box {
      display: none !important;
    }
  }
  .bubbles-box {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    position: absolute;
    align-items: flex-end;

    $num: 200;
    @for $i from 0 through $num {
      $randomNumber: random(10);
      $size: 5 + round(random(8));

      @keyframes move_bulles_#{$i} {
        0% {
          bottom: 0;
        }
        100% {
          bottom: (20 + random(60)) * 1%;
        }
      }

      .air-bubbles:nth-child(#{$i}) {
        left: random(98) * 1%;
        opacity: 0.2;
        background: #fff;
        position: absolute;
        width: $size * 1px;
        border-radius: 100%;
        height: $size * 1px;
        bottom: (10 + random(30)) * 1%;
        animation-name: move_bulles_#{$i};
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-duration: (4 + (0.5 * $randomNumber)) * 1s;
      }
    }
  }
}
</style>