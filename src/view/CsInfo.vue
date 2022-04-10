<template>
  <div>
    <div style=" height: 40px; margin:auto">
    <el-select v-model="value" @change="selectChanged" clearable placeholder="Please Choose" class="select-down">
        <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
    </div>
    <div id="plot1" class="maint" style="width: 800px; height: 450px; margin:auto">
     </div>
   </div>
</template>

<script>
import * as echarts from 'echarts';
export default{
    name : 'CsInfo',
    data() {
      return {
        options: [{
          value: 'price',
          label: 'Price'
        }, {
          value: 'revenue',
          label: 'Revenue'
        }]
      }
    },
    methods:{
        selectChanged(value){
            this.$forceUpdate();
            if(value=='price') this.plot_price();
            if(value=='revenue') this.plot_revenue();
        },
        plot_price(){
            this.$axios.get('/price.json').then((result)=>{
				this.run_price(result.data);
            });
        },
        plot_revenue(){
            this.$axios.get('/revenue.json').then((result)=>{
				this.run_revenue(result.data);
            });
        },
        run_price(_rawData){
            const CSs = [
				'CS-1',
				'CS-2',
				'CS-3',
				'CS-4',
				'CS-5'
			];
			const datasetWithFilters = [];
			const seriesList = [];
			echarts.util.each(CSs, function (cs) {
				var datasetId = 'dataset_' + cs;
				datasetWithFilters.push({
				id: datasetId,
				fromDatasetId: 'dataset_raw',
				transform: {
					type: 'filter',
					config: {
					and: [
						{ dimension: 'Time', '>=': "2021-09-09 08:00:00" ,parser: 'time'},
						{ dimension: 'CSnum', '=': cs }
					]
					}
				}
				});
				seriesList.push({
					type: 'line',
					datasetId: datasetId,
					showSymbol: false,
					name: cs,
					endLabel: {
						show: true,
						formatter: function (params) {
						return params.value[1] + ': ' + params.value[0];
						}
					},
					labelLayout: {
						moveOverlap: 'shiftY'
					},
					emphasis: {
						focus: 'series'
					},
					encode: {
						x: 'Time',
						y: 'Price',
						label: ['CSnum', 'Price'],
						itemName: 'Time',
						tooltip: ['Price']
					},
					smooth:true
				});
			});
			this.option = {
				animationDuration: 6000,
				dataset: [
				{
					id: 'dataset_raw',
					source: _rawData
				},
				...datasetWithFilters
				],
				title: {
				text: "CSs' dynamic charging price"
				},
				tooltip: {
				order: 'valueDesc',
				trigger: 'axis'
				},
				xAxis: {
				type: 'time',
				minInterval : 1200 *1000,
				nameLocation: 'end'
				},
				yAxis: {
				name: 'Price',
				min: 65,
				max: 95
				},
				grid: {
				right: 140
				},
				series: seriesList
			};
            this.myChart.clear();
            this.myChart.setOption(this.option);
        },
        run_revenue(_rawData){
            const CSs = [
				'CS-1',
				'CS-2',
				'CS-3',
				'CS-4',
				'CS-5'
			];
			const datasetWithFilters = [];
			const seriesList = [];
			echarts.util.each(CSs, function (cs) {
				var datasetId = 'dataset_' + cs;
				datasetWithFilters.push({
				id: datasetId,
				fromDatasetId: 'dataset_raw',
				transform: {
					type: 'filter',
					config: {
					and: [
						{ dimension: 'Time', '>=': "2021-09-09 08:00:00" ,parser: 'time'},
						{ dimension: 'CSnum', '=': cs }
					]
					}
				}
				});
				seriesList.push({
					type: 'line',
					datasetId: datasetId,
					showSymbol: false,
					name: cs,
					endLabel: {
						show: true,
						formatter: function (params) {
						return params.value[1] + ': ' + params.value[0];
						}
					},
					labelLayout: {
						moveOverlap: 'shiftY'
					},
					emphasis: {
						focus: 'series'
					},
					encode: {
						x: 'Time',
						y: 'Revenue',
						label: ['CSnum', 'Revenue'],
						itemName: 'Time',
						tooltip: ['Revenue']
					},
					smooth:true
				});
			});
			this.option = {
				animationDuration: 6000,
				dataset: [
				{
					id: 'dataset_raw',
					source: _rawData
				},
				...datasetWithFilters
				],
				title: {
				text: "CSs' dynamic charging price"
				},
				tooltip: {
				order: 'valueDesc',
				trigger: 'axis'
				},
				xAxis: {
				type: 'time',
				minInterval : 1200 *1000,
				nameLocation: 'end'
				},
				yAxis: {
				name: 'Revenue'
				},
				grid: {
				right: 140
				},
				series: seriesList
			};
            this.myChart.clear();
            this.myChart.setOption(this.option);
        }
    },
    mounted(){
        this.chartDom = document.getElementById('plot1');
        this.myChart = echarts.init(this.chartDom);
        this.option;
        this.plot_price();
    }
    
}
</script>

<style scoped>
.select-down{
   position: absolute;right: 10%;
}
</style>