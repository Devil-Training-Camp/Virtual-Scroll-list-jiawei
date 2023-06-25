import { ref, computed, onMounted, defineComponent } from "vue";
import style from "./static.module.scss";
const props = {
	listData: {
		type: Array,
		default: () => []
	},
	itemHeight: {
		type: Number,
		default: 50
	},
	height: {
		type: String,
		default: "100%"
	},
	dataKeyField: {
		type: String,
		default: "id"
	}
};
export default defineComponent({
	name: "vue-scroll-static-height-list",
	props,
	setup(props) {
		const scrollContainerRef = ref(null); // 滚动容器
		const visibleAreaHeight = ref(0); // 可视区
		const startIndex = ref(0); // 起始坐标
		const endIndex = ref(0);
		const startOffset = ref(0);
		const totalHeight = computed(() => {
			const { listData, itemHeight } = props;
			return listData.length * itemHeight;
		});
		// 可视区区域数据条数
		const visibleCount = computed(() => {
			return Math.ceil(visibleAreaHeight.value / props.itemHeight);
		});

		const transformStartOffsetStyle = computed(() => {
			return `translate3d(0,${startOffset.value}px,0)`;
		});

		const visibleData = computed(() => {
			const steps = Math.min(endIndex.value, props.listData.length);
			return props.listData.slice(startIndex.value, steps);
		});
		const onScroll = () => {
			const { scrollTop } = scrollContainerRef.value;
			startIndex.value = Math.floor(scrollTop / props.itemHeight);
			endIndex.value = startIndex.value + visibleCount.value;
			startOffset.value = startIndex.value * props.itemHeight;
		};

		onMounted(() => {
			visibleAreaHeight.value = scrollContainerRef.value.clientHeight;
			startIndex.value = 0;
			endIndex.value = startIndex.value + visibleCount.value;
		});
		return () => {
			return (
				<div ref={scrollContainerRef} className={style.virtualListContainer} onScroll={onScroll}>
					{/* 站位来用，撑起高度 */}
					<div className={style.placeholderDom} style={{ height: totalHeight.value + "px" }}></div>
					{/* 可视区 */}
					<div className={style.virtualList} style={{ transform: transformStartOffsetStyle.value }}>
						{visibleData.value.map(d => {
							return (
								<div
									key={d[props.dataKeyField]}
									className={style.item}
									style={{ height: props.itemHeight + "px" }}
								>
									{d.value}
								</div>
							);
						})}
						<div></div>
					</div>
				</div>
			);
		};
	}
});
