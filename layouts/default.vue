<style lang="scss" scoped>
.logo-box {
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  z-index: 9;
  top: 70px;
  margin: 0 60px;
  position: absolute;

  img {
    width: 64px;
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
  top: -100%;
  position: fixed;
  height: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.97);
  z-index: 3;
  -webkit-transition: top 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  -moz-transition: top 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
  transition: top 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);

  &[packup="false"] {
    top: 0;
  }

  .menu {
    margin-top: 200px;
    display: flex;
    justify-content: center;

    .menu_item {
      letter-spacing: 1px;
      font-size: 20px;
      list-style: none;
      color: #666;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      display: inline-flex;

      &:hover {
        color: #333;
      }
    }

    .menu_item + .menu_item {
      margin-left: 8px;
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
  top: -421px;
  z-index: 99;
  width: 70px;
  height: 900px;
  position: fixed;
  background: url("/m.png");
  animation: float 2s linear infinite;
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
    }

    .menu {
      width: 80vw;
      margin: 160px auto 0;
      flex-wrap: wrap;

      .menu_item {
        margin: 0 20px 20px 0;

        &:hover {
        }
      }

      .menu_item + .menu_item {
      }
    }

    .copyright {
    }
  }

  .arrow-down {
    display: none;
  }
}
</style>

<template>
  <div id="layout">
    <nuxt class="nuxt" />
    <div class="logo-box">
      <img src="/logo-home.png"
        v-show="packUp==='true'">
      <img src="/logo.png"
        v-show="packUp==='false'">
      <div class="menu"
        @click="menuClick">
        <Icon :icon="packUp==='true'?'icon-menu':'icon-cha'"></Icon>
      </div>
    </div>
    <div class="nav"
      :packup="packUp">
      <div id="menu-menu"
        class="menu">
        <div class="menu_item"
          rel="noopener noreferrer"
          v-for="(item, index) in infos"
          :key="index">
          {{item.name}}
        </div>
      </div>
      <p class="copyright">© 少爷. {{today}}. </p>
    </div>
    <Icon icon="icon-xiangxia"
      class="arrow-down"></Icon>
    <a class="cd-top"
      @click="moveTop"></a>
  </div>
</template>

<script>
import { today, scrolMovePoint } from '@/static/utils'
import Icon from '@/components/Icon'
export default {
  name: 'defaultLayout',
  data () {
    return {
      today: today(),
      packUp: 'true',
      infos: [
        {
          name: '主页',
          url: '',
          icon: 'icon-home1',
        },
        {
          name: '归档',
          url: 'icon-wenzhang1',
        },
        {
          name: '分类',
          url: '',
        },
        {
          name: '个人简历',
          url: '',
        },
      ]
    }
  },
  components: { Icon },
  methods: {
    menuClick () {
      this.packUp = this.packUp === 'false' ? 'true' : 'false'
    },
    moveTop () {
      scrolMovePoint(0, 30)
    }
  },
}
</script>