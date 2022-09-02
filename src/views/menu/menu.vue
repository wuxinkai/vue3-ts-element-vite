<template>
  <div class="container">
    <div style="width: 200px">
      <pro-menu :data="data1" defaultActive="2" text-color="green" active-text-color="red" background-color="#ccc">
      </pro-menu>
    </div>
    <div style="width: 200px">
      <!-- 自定义键名 -->
      <pro-infinite-menu :data="data2" defaultActive="1" text-color="green" background-color="pink" name="a" index="b"
        icon="c" children="xxxx"></pro-infinite-menu>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
let data1 = [
  {
    name: "导航一",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航二",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航三",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
      },
    ],
  },
];
let data2 = [
  {
    a: "导航一",
    b: "1",
    c: "Document",
  },
  {
    a: "导航二",
    b: "2",
    c: "Document",
  },
  {
    a: "导航三",
    b: "3",
    c: "Document",
    xxxx: [
      {
        a: "导航3-1",
        b: "3-1",
        c: "Document",
        xxxx: [
          {
            a: "导航3-1-1",
            b: "3-1-1",
            c: "Document",
            xxxx: [
              {
                a: "导航3-1-1-1",
                b: "3-1-1-1",
                icon: "Document",
                xxxx: [
                  {
                    a: "导航3-1-1-1",
                    b: "3-1-1-1",
                    c: "Document",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>
  
  <style lang="scss" scoped>
  .container {
    display: flex;
    justify-content: space-around;
  }
  </style>