<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.introduce" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="introduce" label="详情" />
    </el-table>
    <el-pagination
      @current-change="currentChange"
      @size-change="sizeChange"
      layout="prev, pager, next"
      :total="selectData.count"
    />
  </div>
</template>

<script lang="ts">
import { throwError } from "element-plus/es/utils";
import { computed, defineComponent, reactive, toRefs } from "vue";
import { getGoodsList } from "../request/api";
import { InitData } from "../type/goods";
export default defineComponent({
  setup() {
    const goodsdata = reactive(new InitData());
    //获取全部商品数据
    //console.log(111111111111111)
    getGoodsList().then(
      () => console.log("error"),
      (res) => {
        goodsdata.list = res.data;
        goodsdata.selectData.count = res.data.length;
      }
    );
    const dataList = reactive({
      comList: computed(() => {
        //第一个页码展示[0-9] 第二个页码展示[10-19]....
        return goodsdata.list.slice(
          (goodsdata.selectData.page - 1) * goodsdata.selectData.pagesize,
          goodsdata.selectData.page * goodsdata.selectData.pagesize
        );
      }),
    });
    // 页码改变时触发
    const currentChange = (page: number) => {
      goodsdata.selectData.page = page;
    };
    // 每一页显示条数发生改变时触发
    const sizeChange = (pagesize: number) => {
      goodsdata.selectData.pagesize = pagesize;
    };
    return { ...toRefs(goodsdata), currentChange, sizeChange };
  },
});
</script>

<style scoped>
</style>