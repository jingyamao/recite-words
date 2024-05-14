<template>
    <div class="main">
      <div class="banner">
        <el-row>
          <el-col :span="8">
            <div class="img">
            </div>
          </el-col>
          <el-col :span="16">
            <h1>
              <span>
                {{ word_book.name }}
              </span>
              <el-button
                type="success"
                circle
                plain
                :icon="Edit"
                style="float: right;"
                @click="wordBookShow = true"
              />
            </h1>
            背诵进度：
            <el-progress :percentage="Wordpercent" />
            <el-row>
              <el-col :span="12" >
                <el-card class="card">
                  <h3>今日还需背诵：{{ dailyAddreviewWord.daily_words.length }}</h3>
                  <el-button
                    size="large"
                    type="primary"
                    color="rgb(119, 171, 183)"
                    round 
                    plain
                    style="width: 100%"
                  >
                    去背诵
                  </el-button>
                </el-card>
              </el-col>
              <el-col :span="12" >
                <el-card class="card" style="margin-left:5%;">
                  <h3>今日还需复习：{{ dailyAddreviewWord.review_plan.length }}</h3>
                  <el-button
                    size="large"
                    type="primary"
                    color="rgb(119, 171, 183)"
                    round 
                    plain
                    style="width: 100%"
                  >
                    去复习
                  </el-button>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-row class="row">
      <el-col :span="12">
        <div class="maintest">
          <div class="banner">
            <el-card class="card">
              <h2>再背一天单词</h2>
                <el-button
                  @click="wordAddtoday = true"
                  size="large"
                  type="primary"
                  color="rgb(119, 171, 183)"
                  round 
                  plain
                  style="width: 100%"
                >
                  新增
                </el-button>
            </el-card>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="maintest">
          <div class="banner">
            <el-card class="card">
              <h2>修改背诵计划</h2>
                <el-button
                  size="large"
                  type="primary"
                  color="rgb(119, 171, 183)"
                  round 
                  plain
                  style="width: 100%"
                  @click="wordProject = true"
                >
                  修改
                </el-button>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 选择单词书 -->
    <el-dialog 
      v-model="wordBookShow" 
      width="1000"
      title="请选择单词书"
      style="border-radius:2vw;
          padding: 2%;">
      <div class="book" v-for="(item,index) in wordAllBook" :key="index">
        <div class="text" >
          <h1>{{ item.name }}</h1>
          <h4>{{ item.difficulty }}</h4>
          <h4>{{ item.language }}</h4>
          <el-button 
          @click="handleWordBook"
          size="large"
          color="rgb(119, 171, 183)"
          round 
          plain
          type="success"
          style="width:8vw">
            选择
          </el-button>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button 
          @click="wordBookShow = false"
          size="large"
          round 
          plain
          style="width:8vw"
          >取消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修改背诵计划 -->
    <el-dialog 
      v-model="wordProject"
      width="500"
      title="请修改背诵计划"
      style="border-radius:2vw;
          padding: 2%;">
          <h1>
            请选择每日背诵单词数量：
            <el-select
              v-model="WordValue"
              placeholder="请选择"
              size="large"
              style="width: 100%"
            >
              <el-option
                v-for="item in wordOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </h1>
      <template #footer>
        <div class="dialog-footer">
          <el-button 
          @click="wordProject = false"
          size="large"
          round 
          plain
          style="width:8vw"
          >取消</el-button>
          <el-button 
          @click="wordProject = false"
          size="large"
          color="rgb(119, 171, 183)"
          round 
          plain
          style="width:8vw"
          >确定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 再背一天 -->
    <el-dialog
      v-model="wordAddtoday"
      width="500"
      title="是否确定再背一天"
      style="border-radius:2vw;
          padding: 2%;"
    >
    <template #footer>
        <div class="dialog-footer">
          <el-button 
          @click="wordAddtoday = false"
          size="large"
          round 
          plain
          style="width:8vw"
          >取消</el-button>
          <el-button 
          @click="wordAddtoday = false"
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
import { ref,onMounted } from "vue";
import { Edit } from "@element-plus/icons-vue"
import { select_words, update_daily_plan,get_daily_words,} from "@/api/Home";
import { ElMessage } from "element-plus";

// 所选单词书的信息
const word_book = ref({})
function handleWordBook(item){
  word_book.value = item
  get_daily_wordsValue(word_book.value);
}

// let Wordpercent = (word_book.value.wordNum/word_book.value.wordAllNum)*100;
// Wordpercent = Wordpercent.toFixed(2)
let Wordpercent = 10

// 选择单词书,查询所有单词书
const wordAllBook = ref();
onMounted(()=>{
  select_wordsAllBook();
})
const wordBookShow = ref(false)
function select_wordsAllBook(){
  select_words()
  .then(res =>{
    console.log(res)
    wordAllBook.value = res;
    word_book.value = res[0];
    get_daily_wordsValue(word_book.value);
  })
  .catch(error =>{
    console.log(error)
  })
}

// 获取每日背诵计划
const dailyAddreviewWord = ref({
  daily_words:[],
  review_plan:[]
})
function get_daily_wordsValue(data){
  get_daily_words(data)
  .then(res =>{
    console.log(res)
    dailyAddreviewWord.value = res
    if(dailyAddreviewWord.value.review_plan.error){
      dailyAddreviewWord.value.review_plan = []
    }
  })
  .catch(error =>{
    console.log(error)
  })
}

// 再背一天
const wordAddtoday = ref(false)

// 修改背诵计划
const wordProject = ref(false)
const wordOptions = ref([])
setTimeout((startIndex = 1) =>{  
  for (let i = startIndex; i <= 500; i++) {  
    wordOptions.value.push({  
      label: i, 
      value: i,  
    });  
  }  
}, 1000); 


</script>

<style lang="less" scoped>
.main{
  margin: auto;
  margin-top: 2vh;
  padding: 1vh;
  width: 80vw;
  height: 50vh;
  border-radius: 5vh;
  background-color: rgb(234, 246, 248);
  box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
  .banner{
    height: 100%;
    padding: 2vh;
    .img{
      width: 90%;
      height: 100%;
      border-radius: 2vh;
      background-image: url(./img/book.png);
      background-size: cover;
      background-position: center;
    }
    .card{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 23vh;
      border-radius: 3vh;
      margin-top: 5vh;
      padding: 2%;
      background-color: rgb(254, 255, 255)234, 246, 248;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0 0px 0px rgba(0, 0, 0, 0.1);
    }
  }
}

.row{
  margin: auto;
  margin-top: 2vh;
  width: 80vw;
  .el-col{
    padding: 1vh;
    width: 100%;
    height: 100%;
    .maintest{
      width: 100%;
      height: 100%;
      border-radius: 5vh;
      background-color: rgb(234, 246, 248);
      box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
      .banner{
        height: 100%;
        padding: 2vh;
        .card{
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80%;
          border-radius: 3vh;
          padding: 2%;
          background-color: rgb(254, 255, 255)234, 246, 248;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1), 0 0px 0px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}

.book{
  display: inline-block;
  width: 25%;
  height: 300px;
  border-radius: 2vw;
  margin: 2%;
  padding: 2%;
  background: linear-gradient(to bottom right, #b2ebd1, #66a3bd);
  text-align: center;
  box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.1), 3px 3px 5px rgba(0, 0, 0, 0.1), 0 3px 5px rgba(0, 0, 0, 0.1);
  .text{
    color: #000000;
  }
}
</style>