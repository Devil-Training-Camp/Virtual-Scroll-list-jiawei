<script setup>
import { ref } from "vue";
import StaticHeightList from "./components/StaticHeightList";
const data = ref([]);
// 生成随机数据
function getData() {
	for (let i = 0; i < 2000; i++) {
		data.value.push({
			id: i,
			value: i
			// Value: i
		});
	}
}

getData();
</script>

<template>
	<!-- 滚顶高度 -->
	<static-height-list :list-data="data" />
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
