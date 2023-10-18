import { Chart as ChartJS, ChartEvent, ChartOptions, Color, Plugin } from "chart.js";

export interface ChartOptionsWithHoverLine extends ChartOptions<"line"> {
    mouseLine: {
        x?: number;
        color: Color;
    };
}

// Plugin that draws the vertical line behind the active datapoints
const hoverLine: Plugin<"line"> = {
    id: "hoverLine",
    // Reposition the hover line to the active element after a chart interaction has initiated
    // the update cycle, as long as there's data in the chart
    afterUpdate(chart) {
        const chartOptions = chart.options as ChartOptionsWithHoverLine;
        if (!chart.getDatasetMeta(0).data[chart.data.datasets[0].data.length - 1]) {
            return;
        }
        chartOptions.mouseLine.x =
            chart.getDatasetMeta(0).data[
                // Since we default to having the last datapoint highlighted by default, do that here
                // unless the last element is highlighted. This is a bit brittle in the case that
                // we don't want to default to the last element at some point in the future, but it
                // works well for now.
                Math.min(chart.data.datasets[0].data.length - 1, chart.getActiveElements()[0].index)
                ].x;
    },
    beforeDatasetsDraw: function (chart: ChartJS<"line">) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;

        const chartOptions = chart.options as ChartOptionsWithHoverLine;

        const x = chartOptions.mouseLine.x;

        // Draw the line as well as the circles at top and bottom of the line
        if (x != null && x > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = chartOptions.mouseLine.color;
            ctx.lineWidth = 2;
            ctx.moveTo(chartOptions.mouseLine.x || 0, chartArea.bottom);
            ctx.lineTo(chartOptions.mouseLine.x || 0, chartArea.top);
            ctx.setLineDash([2, 2]);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = chartOptions.mouseLine.color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, chartArea.top, 3, 0, Math.PI + (Math.PI * 4) / 2, false);
            ctx.fillStyle = chartOptions.mouseLine.color;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(x, chartArea.bottom, 3, 0, Math.PI + (Math.PI * 4) / 2, false);
            ctx.closePath();
            ctx.fillStyle = chartOptions.mouseLine.color;
            ctx.fill();
            ctx.restore();
        }
    },
    // Move the hover line to the active element(s)
    afterEvent: function (chart: ChartJS<"line">, { event }: { event: ChartEvent }) {
        const chartOptions = chart.options as ChartOptionsWithHoverLine;
        const chartArea = chart.chartArea;

        // If the mouse is within the canvas bounds, Chart.js will select the currently
        // hovered element, so we can use that active element to position the hover line
        if (
            event.x &&
            event.y &&
            event.x >= chartArea.left &&
            event.y >= chartArea.top &&
            event.x <= chartArea.right &&
            event.y <= chartArea.bottom &&
            chart.getActiveElements().length
        ) {
            const activeElement = chart.getActiveElements()[0];
            chartOptions.mouseLine.x = activeElement.element.x;
        } else {
            // If the mouse moves off the canvas, move the hover line to the default
            // datapoints, aka the last datapoint in each series
            if ((event.x && event.x > chartArea.right) || (event.y && event.y > chartArea.bottom)) {
                chartOptions.mouseLine.x =
                    chart.getDatasetMeta(0).data[chart.data.datasets[0].data.length - 1].x;
            }
        }
    },
};

export default hoverLine;