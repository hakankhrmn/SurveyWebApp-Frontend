<template>
    <mdb-container>
        <mdb-pie-chart
                datalabels
                :data="pieChartData"
                :options="pieChartOptions"
                :width="600"
                :height="300"
        />
    </mdb-container>
</template>

<script>
import {
    mdbPieChart,
    mdbContainer,
} from 'mdbvue'

export default {
    components: {
        mdbPieChart,
        mdbContainer,
    },
    props: {
        result: Array
        },
    data() {
        return {
            pieChartData: {
                labels: ["A", "B", "C", "D", "E"],
                datasets: [
                    {
                        data: this.result,
                        backgroundColor: [
                            "#F7464A",
                            "#46BFBD",
                            "#FDB45C",
                            "#949FB1",
                            "#4D5360"
                        ],
                        hoverBackgroundColor: [
                            "#FF5A5E",
                            "#5AD3D1",
                            "#FFC870",
                            "#A8B3C5",
                            "#616774"
                        ]
                    }
                ]
            },
            pieChartOptions: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        color: "white",
                        align: "center",
                        font: {
                            size: 16
                        },
                        formatter: value => {
                            const [dataset] = this.pieChartData.datasets;
                            const setValue = dataset.data.reduce((a, b) => a + b);

                            return `${Math.round((value / setValue) * 100)}%`;
                        }
                    }
                }
            }
        };

    },
    created() {
        console.log(this.result);
    }
}
</script>

<style>

</style>