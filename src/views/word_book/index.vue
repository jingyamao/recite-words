<template>
    <div class="main">
      <div class="banner">
        <h1>单词书</h1>
        <el-card class="card">
          <div class="head">
            <el-button 
            @click="errorWordBookShow = true"
            size="large"
            color="rgb(119, 171, 183)"
            round 
            plain
            style="width:10vw"
            >新增单词书</el-button>
          </div>
          <div class="banner">
            <el-table :data="tableData" style="width: 100%" height="1000">
              <el-table-column fixed prop="id" label="id" />
              <el-table-column prop="title" label="标题"  />
              <el-table-column prop="wordNum" label="单词数量"  />
              <el-table-column fixed="right" label="操作" >
                <template #default="scope">
                  <el-button 
                  type="danger" 
                  size="small" 
                  round 
                  plain
                  >
                    删除
                  </el-button>
                  <el-button 
                  type="primary" 
                  size="small" 
                  @click="handleShowErrorBook(scope.row.word)"
                  color="rgb(119, 171, 183)"
                  round 
                  plain
                  >
                    查看详细信息
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
  
    <!-- 新增错题本 -->
    <el-dialog
      v-model="errorWordBookShow"
      width="500"
      style="border-radius:2vw;
          padding: 2%;"
    >
      请输入错题本标题：
      <el-input
        v-model="errorBooktitle"
        size="large"
        placeholder="请输入标题"
      >
  
      </el-input>
      <template #footer>
          <div class="dialog-footer">
            <el-button 
            @click="errorWordBookShow = false"
            size="large"
            round 
            plain
            style="width:8vw"
            >取消</el-button>
            <el-button 
            @click="errorWordBookShow = false"
            size="large"
            color="rgb(119, 171, 183)"
            round 
            plain
            style="width:8vw"
            >确定</el-button>
          </div>
        </template>
    </el-dialog>
  
    <!-- 查看错题本详细信息 -->
    <el-dialog
      v-model="wordErrorBookShow"
      width="1000"
      title="详细错题信息"
      style="border-radius:2vw;
          padding: 2%;"
    >
      <el-table :data="tableDataWord" style="width: 100%">
        <el-table-column fixed prop="word" label="单词"/>
        <el-table-column prop="idea" label="翻译"  />
        <el-table-column prop="test" label="例句" />
        <el-table-column fixed="right" label="操作" >
          <template #default>
            <el-button 
            type="danger" 
            size="small" 
            round 
            plain
            >
              删除
            </el-button>
            <el-button 
            type="primary" 
            size="small" 
            @click="wordErrorIdeaShow = true"
            color="rgb(119, 171, 183)"
            round 
            plain
            >
              修改单词释义
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  
    <!-- 修改单词释义 -->
    <el-dialog
      v-model="wordErrorIdeaShow"
      width="500"
      style="border-radius:2vw;
          padding: 2%;"
    >
    请输入单词释义：
    <el-input
        v-model="errorBooktitle"
        size="large"
        placeholder="请输入"
      >
  
      </el-input>
      <template #footer>
        <div class="dialog-footer">
          <el-button 
          @click="wordErrorIdeaShow = false"
          size="large"
          round 
          plain
          style="width:8vw"
          >取消</el-button>
          <el-button 
          @click="wordErrorIdeaShow = false"
          size="large"
          color="rgb(119, 171, 183)"
          round 
          plain
          style="width:8vw"
          >确定</el-button>
        </div>
      </template>
    </el-dialog>
</template>
  
<script setup>
import {ref,onMounted } from "vue";

// 新增错题本
const errorWordBookShow = ref(false) 
const errorBooktitle = ref('')

// 修改单词释义
const wordErrorIdeaShow = ref(false)

// 表格数据,查看错题本详细信息
const wordErrorBookShow = ref(false)
const tableData = ref([
{
    id: 1,
    title: "大学英语四级",
    wordNum: "2391",
    word:[
    {
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    },
    {
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    },
    {
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    },
    {
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    }
]
},
{
    id: 1,
    title: "大学英语四级",
    wordNum: "2391",
    word:[{
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    }]
},
{
    id: 1,
    title: "大学英语四级",
    wordNum: "2391",
    word:[{
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    }]
},
{
    id: 1,
    title: "大学英语四级",
    wordNum: "2391",
    word:[{
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    }]
},
{
    id: 1,
    title: "大学英语四级",
    wordNum: "2391",
    word:[{
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    }]
},
{
    id: 1,
    title: "大学英语四级",
    wordNum: "2391",
    word:[{
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    }]
},
{
    id: 1,
    title: "大学英语四级",
    wordNum: "2391",
    word:[{
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    }]
},
{
    id: 1,
    title: "大学英语四级",
    wordNum: "2391",
    word:[{
    word:'apple',
    idea: '苹果',
    test:'the apple is so good'
    }]
},
])
const tableDataWord = ref()
function handleShowErrorBook(prop){
wordErrorBookShow.value = true;
console.log(prop)
tableDataWord.value = prop
}
</script>

<style lang="less" scoped>
.main{
display: flex;
align-items: center;
justify-content: center;
margin: auto;
margin-top: 2vh;
padding: 1vh;
width: 80vw;
height: 90vh;
border-radius: 5vh;
background-color: rgb(234, 246, 248);
box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
.banner{
    width: 70vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1{
    margin-top: 1vh;
    margin-bottom: 1vh;
    }
    .card{
    width: 100%;
    height: 100%;
    border-radius: 3vh;
    padding: 1%;
    background-color: rgb(254, 255, 255)234, 246, 248;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0 0px 0px rgba(0, 0, 0, 0.1);
    :deep(.el-card__body){
        padding: 0%;
        .head{
        width: 100%;
        height: 10%;
        min-height: 8vh;
        display: flex;
        align-items: center;
        justify-content: end;
        }
        .banner{
        width: 100%;
        height: 90%;
        }
    }
    }
}
}

</style>