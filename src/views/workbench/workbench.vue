<template>
  <div class="workbench">
    <n-row :gutter="[8, 8]">
      <!-- 顶部 -->
      <n-col :span="24">
        <div class="itemCol workbench-top">
          <n-row>
            <!-- 标题 -->
            <n-col :span="24">
              <div class="workbench-title workbench-title1">{{ $t('workbench') }}</div>
            </n-col>
            <!-- 内容 -->
            <n-col :span="24">
              <div class="top-content">
                <img
                  class="nameImg"
                  :src="userInfo?.user.avatar ? baseUrl + '/' + userInfo?.user.avatar : handleImg('personal1.png')"
                  alt=""
                />
                <div class="nameText">
                  <div class="nameText1">{{ userInfo?.user.userName }}</div>
                  <div class="nameText2">{{ userInfo?.user.department }}</div>
                  <div class="nameText2">{{ userInfo?.user.mobilePhone }}</div>
                </div>
              </div>
            </n-col>
          </n-row>
        </div>
      </n-col>
      <!-- 底部 -->
      <n-col v-if="workbenchList.length" :span="15">
        <n-col :span="24">
          <div class="itemCol workbench-project">
            <n-row>
              <!-- 标题 -->
              <n-col :span="24">
                <div class="workbench-title project-title">{{ $t('project') }}</div>
              </n-col>
              <!-- 内容 -->
              <n-col :span="24">
                <div class="project-content">
                  <n-col v-for="item in workbenchList" :key="item.name" :span="8" @click="handleSkip(item)">
                    <div class="project-ul">
                      <div class="li-top">
                        <!-- <img class="li-img" :src="projectObj[item?.name?.toLowerCase()]" alt="" /> -->
                        <img class="li-img" :src="projectObj[item?.name]" alt="" />
                        <div class="li-title">{{ $t(item.name) }}</div>
                      </div>
                      <div class="li-text">
                        <n-ellipsis :line-clamp="8">
                          <p v-html="item.meta.remark?.replace(/\n/g, '<br/>')" />
                          <template #tooltip>
                            <div style="width: 300px">
                              {{ item.meta.remark }}
                            </div>
                          </template>
                        </n-ellipsis>
                      </div>
                    </div>
                  </n-col>
                </div>
              </n-col>
            </n-row>
          </div>
        </n-col>
      </n-col>
    </n-row>
  </div>
</template>
<script setup lang="tsx">
import { Routes } from '@/router/routes';
import { useUserStore } from '@/stores/user';
import type { RouteType } from '@/types/route';
const router = useRouter();
const useStore = useUserStore();
const routeStore = useRouteStore();
const { userInfo } = storeToRefs(useStore);
const { workbenchList } = storeToRefs(routeStore);
const baseUrl = import.meta.env.VITE_BASE_API;
// 处理图片
const handleImg = (name: string) => {
  return new URL(`../../assets/images/workbench/${name}`, import.meta.url).href;
};
// 图片列表
const projectObj: Record<string, string> = {
  ams: handleImg('ams.jpg'),
  assembly: handleImg('assembly.jpg'),
  config: handleImg('config.jpg'),
  reportManage: handleImg('report-manage.png'),
  systemMonitor: handleImg('system-monitor.png'),
  testing: handleImg('testing.png')
};
// 跳转
const handleSkip = (item: RouteType) => {
  switch (item.meta.link) {
    case 0:
      router.push(`${item.path}/home` ?? Routes.WORKBENCH);
      break;
    case 1:
      window.open(item.path, '_target');
      break;
    default:
      break;
  }
};
</script>

<style lang="less" scoped>
.workbench {
  .itemCol {
    background-color: #ffffff;
  }
  // 标题公共
  .workbench-title {
    font-weight: 500;
    color: rgba(31, 34, 37);
    height: 50px;
    line-height: 50px;
  }
  .workbench-title1 {
    font-size: 20px;
  }
  // 顶部
  .workbench-top {
    height: 140px;
    padding: 0px 20px;
    // 内容
    .top-content {
      height: 80px;
      display: flex;
      align-items: center;
      .nameImg {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
      .nameText {
        margin-left: 12px;
        line-height: 25px;
        font-weight: 500;
        .nameText1 {
          color: rgba(31, 34, 37);
          font-size: 18px;
        }
        .nameText2 {
          color: rgba(156, 163, 175);
        }
      }
    }
  }
  // 底部
  .workbench-project {
    // 标题
    .project-title {
      padding: 0px 20px;
    }
    // 内容
    .project-content {
      border-top: 1px solid rgb(239, 239, 245);
      .project-ul {
        cursor: pointer;
        padding: 15px;
        height: 200px;
        overflow: hidden;
        border-bottom: 1px solid rgb(239, 239, 245);
        border-right: 1px solid rgb(239, 239, 245);

        transition: var(--duration);
        .li-top {
          display: flex;
          height: 30px;
          .li-img {
            width: 30px;
            height: 30px;
          }
          .li-title {
            margin-left: var(--margin);
            line-height: 30px;
            font-weight: bold;
          }
        }
        .li-text {
          color: rgba(156, 163, 175);
          font-weight: 500;
          line-height: 20px;
          margin-top: var(--margin);
        }
      }
      .project-ul:hover {
        box-shadow: -10px -10px 20px rgb(239, 239, 245);
      }
      .project-ul2 {
        width: 0px;
      }
      .project-ul1 {
        border-right: 0px solid rgb(239, 239, 245);
      }
    }
  }
}
</style>
