<style lang="scss" scoped>
#layout {
  height: max-content;
  min-height: 100%;
}
.logo-box {
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 999;
  top: 70px;
  margin: 0 60px;
  position: absolute;

  img {
    width: 64px;
    cursor: pointer;
  }

  .menu {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.9);
    padding: 6px 6px 5px;
    border-radius: 2px;
    cursor: pointer;

    svg {
      font-size: 32px;
      color: rgb(234, 44, 69);
      font-weight: 700;
    }
  }
}

.nav {
  max-width: 100vw;
  top: -100%;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  background: rgba(255, 255, 255, 0.97);
  transition: top 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);

  &[packup="false"] {
    top: 0;
  }

  .menu {
    margin-top: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    .menu-item-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px;
      .menu_item {
        color: #666;
        font-size: 20px;
        cursor: pointer;
        list-style: none;
        white-space: nowrap;
        letter-spacing: 1px;
        align-items: center;
        display: inline-flex;
        justify-content: center;
        /deep/ {
          .icon {
            font-size: 12px;
          }
        }

        &:hover {
          color: #333;
        }
      }
    }
  }

  .copyright {
    color: #999;
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    margin-top: auto;
  }
}

.arrow-down {
  @keyframes blink {
    0% {
      opacity: 1;
      transform: translateY(-10px);
    }

    25% {
      opacity: 1;
    }

    75% {
      opacity: 0.3;
      transform: translateY(0);
    }

    100% {
      opacity: 0.15;
    }
  }

  left: 0;
  right: 0;
  bottom: 16px;
  color: #fff;
  font-size: 36px;
  margin: auto;
  position: absolute;
  animation-iteration-count: infinite;
  animation-name: blink;
  animation-duration: 2s;
  cursor: pointer;

  &:hover {
    opacity: 1 !important;
  }
}

.cd-top {
  @keyframes float {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-8px);
    }

    100% {
      transform: translateY(0);
    }
  }
  right: 25px;
  z-index: 99;
  width: 70px;
  height: 900px;
  position: fixed;
  cursor: pointer;
  background: url("/m.png");
  top: calc(-50vh + (50vh - 450px));
  // animation: float 2s linear infinite;
  transition: all 0.25s;
  &[top="true"] {
    animation: none;
    top: -900px;
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 1080px) {
  .logo-box {
    top: 40px;
    margin: 0 30px;

    img {
    }

    .menu {
      svg {
        font-size: 24px;
      }
    }
  }

  .nav {
    &[packup="false"] {
      max-width: 100vw;
    }

    .menu {
      width: 80vw;
      margin: 160px auto 0;
      flex-wrap: wrap;
      .menu-item-box {
        .menu_item {
          font-size: 12px;

          &:hover {
          }
        }
      }

      .menu-item-box + .menu-item-box {
      }
    }

    .copyright {
    }
  }

  .arrow-down {
    display: none;
  }
  .cd-top {
    display: none;
  }
}
</style>

<template>
  <div id="layout">
    <nuxt class="nuxt" />
    <div class="logo-box">
      <img src="/logo-home.png"
        @click="goHome()"
        v-show="home===true" />
      <img src="/logo.png"
        @click="goHome()"
        v-show="home===false" />
      <div class="menu"
        @click="menuClick">
        <Icon :icon="packUp==='true'?'icon-menu':'icon-cha'"></Icon>
      </div>
    </div>
    <div class="nav"
      :packup="packUp">
      <div id="menu-menu"
        class="menu">
        <div class="menu-item-box"
          v-for="(item, index) in infos"
          :key="index">
          <Icon class="menu_item"
            @click="navClick(item)"
            rel="noopener noreferrer"
            :icon="item.icon"
            :text="item.name"></Icon>
        </div>
      </div>
      <p class="copyright">© 少爷. {{today}}.</p>
    </div>
    <Icon icon="icon-xiangxia"
      class="arrow-down"
      @click="moveBottom"></Icon>
    <a class="cd-top"
      id="id-cd-top"
      @click="moveTop"
      :style="packUp==='true'?'':'display:none;'"></a>
  </div>
</template>

<script>
import {
  q,
  today,
  getEleSize,
  scrollPoint,
  scrolMovePoint
} from "@/static/utils"
import { throttle } from "lodash"
import Icon from "@/components/Icon"
export default {
  name: "defaultLayout",
  data () {
    return {
      today: today(),
      packUp: "true",
      infos: [
        {
          name: "主页",
          url: "/",
          icon: "icon-home1"
        },
        {
          name: "归档",
          url: "/archive",
          icon: "icon-wenzhang1"
        },
        {
          name: "个人简历",
          url: "/resume",
          icon: "icon-jianli"
        }
      ],
      client: process.client,
      home: false,
      white: ['article', 'index'],
    }
  },
  components: { Icon },
  mounted () {
    if (this.client) {
      window.addEventListener("scroll", throttle(this.scroll.bind(this), 100))
      this.scroll()
      this.home = this.isWhiteLogo()
    }
  },
  watch: {
    $route (to, from) {
      this.home = this.isWhiteLogo()
    },
  },
  methods: {
    isWhiteLogo () {
      const result = this.white.includes(this.$route.name)
      return result
    },
    menuClick () {
      const body = document.body
      if (this.packUp === "false") {
        this.packUp = "true"
        body.removeAttribute("style")
      } else {
        body.setAttribute("style", "overflow:hidden;")
        this.packUp = "false"
      }
    },
    scroll () {
      const top = q("#id-cd-top")
      if (scrollPoint() < 30) {
        top.setAttribute("top", "true")
      } else {
        top.removeAttribute("top")
      }
    },
    moveTop () {
      scrolMovePoint(0, 0.1)
    },
    moveBottom () {
      const size = getEleSize("#id-top")
      if (size != null) {
        const [width, height] = size
        scrolMovePoint(height, 30)
      }
    },
    navClick (item) {
      this.menuClick()
      setTimeout(() => {
        this.$router.push(item.url)
      }, 330)
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>