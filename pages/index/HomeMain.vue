<style lang="scss" scoped>
.main[type="homepage"] {
  padding: 8px;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: rgba(249, 248, 248, 1);

  .article-list {
    display: flex;
    flex-direction: column;
    align-items: center;

    .article {
      position: relative;
      z-index: 2;
      width: 960px;
      display: flex;
      margin-top: 8px;
      max-width: 80vw;
      cursor: pointer;
      margin-bottom: 8px;
      border-radius: 10px;
      transition: box-shadow 0.3s ease;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.4);

      &:hover {
        box-shadow: 0 5px 10px 5px rgba(110, 110, 110, 0.43);

        .right {
          img {
            transform: scale(1.1);
          }
        }
      }

      .left {
        flex: 1;
        padding: 16px;
        display: inline-flex;
        flex-direction: column;

        .icon-box {
          &[type="time"] {
            /deep/ {
              .text {
                color: #888;
                font-size: 14px;
              }
            }
          }

          /deep/ {
            .icon {
              font-size: 16px;
              color: #989898;
            }
          }
        }

        .title {
          margin: 16px 0;
          color: #504e4e;
          font-size: 20px;
          cursor: pointer;
          font-weight: 600;

          &:hover {
            color: #fe9600 !important;
            text-decoration: none !important;
          }
        }

        .focus {
          color: #888;
          display: flex;
          font-size: 14px;
          align-items: center;
          margin-bottom: 16px;

          .icon-box {
          }

          .icon-box + .icon-box {
            margin-left: 8px;
          }
        }

        .abstract {
          font-size: 12px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          margin: 20px 0px 40px;
          color: rgba(0, 0, 0, 0.66);
          -webkit-box-orient: vertical;
        }

        .operation {
          margin-top: auto;

          svg {
            color: #666;
            font-size: 24px;
            cursor: pointer;
          }

          svg + svg {
            margin-left: 16px;
          }
        }
      }

      .right {
        flex: 1;
        cursor: pointer;
        overflow: hidden;
        position: relative;

        img {
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          position: absolute;
          transition: all 0.5s;
        }
      }
    }
  }

  .main-canvas {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: 960px) {
  .main[type="homepage"] {
    padding: 0;

    .article-list {
      padding: 0;
      padding-bottom: 12px;

      .article {
        border-radius: 0;
        margin: 0;
        padding: 0;
        margin-top: 12px;
        max-width: 100vw;
        border-radius: 5px;
        flex-direction: column;
        width: calc(100vw - 24px);

        &:hover {
          box-shadow: none;

          .right {
            img {
              transform: none;
            }
          }
        }

        .left {
          .icon-box {
            &[type="time"] {
              /deep/ {
                .text {
                }
              }
            }

            /deep/ {
              .icon {
              }
            }
          }

          .title {
            font-size: 16px;

            &:hover {
              color: #504e4e;
              text-decoration: none !important;
            }
          }

          .focus {
            .icon-box {
            }

            .icon-box + .icon-box {
            }
          }

          .abstract {
            display: none;
          }

          .operation {
            display: none;
          }
        }

        .right {
          display: none;
        }
      }
    }

    .main-canvas {
      z-index: 1;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      position: absolute;
    }
  }
}
</style>

<template>
  <div class="main"
    id="id-home-main"
    type="homepage">
    <div class="article-list">
      <div class="article"
        v-for="(item) in remote"
        @click="articleClick(item)"
        :key="item.id">
        <div class="left">
          <Icon icon="icon-shijian"
            :text="`发布于${timestapToDate(item.time)}`"
            type="time"></Icon>
          <div class="title">{{item.title}}</div>
          <div class="focus">
            <Icon icon="icon-yanjing1"
              :text="`${item.browse||0}热度`"
              type="browse"></Icon>
            <Icon icon="icon-pinglun1"
              :text="`${item.comments||0}条评论`"
              type="comments"></Icon>
            <Icon icon="icon-wode"
              :text="item.auth"
              type="author"></Icon>
          </div>
          <div class="abstract">摘要：{{item.describe}}</div>
          <div class="operation">
            <Icon icon="icon-gengduo-copy"
              type="op-more"></Icon>
            <Icon icon="icon-tubiao09"
              type="op-edit"></Icon>
          </div>
        </div>
        <div class="right">
          <img :src="item.cover">
        </div>
      </div>
    </div>
    <Particles class="main-canvas"></Particles>
  </div>
</template>

<script>
import { timestapToDate } from '@/static/utils'
import Icon from '@/components/Icon'
import Particles from '@/components/Particles'
export default {
  props: ['remote'],
  components: { Icon, Particles },
  methods: {
    timestapToDate,
    articleClick (articleItem) {
      const { id } = articleItem
      const url = `/article?articleId=${id}`
      this.$router.push(url)
    }
  }
}
</script>