<template>
    <div class="row position-relative h-60">
        <div class="col-3 pt-0 shadow-lg mr-0 status-panel bg-light ">
            <table class="table table-borderless table-hover border-bottom">
                <tbody>
                <tr>
                    <th scope="row" class="pl-0">Number of vehicles</th>
                    <td class="text-right" id="car-num">0</td>
                </tr>
                <tr class="d-none">
                    <th scope="row" class="pl-0">Total number of simulation step</th>
                    <td class="text-right" id="total-step-num">0</td>
                </tr>
                <tr>
                    <th scope="row" class="pl-0">Current step</th>
                    <td class="text-right" id="current-step-num">0</td>
                </tr>
                <tr class="d-none">
                    <th scope="row" class="pl-0">Current simulation progress</th>
                    <td class="text-right" id="progress-percentage">0</td>
                </tr>
                <tr class="d-none" id="speed-tr">
                    <th scope="row" class="pl-0">Average speed on lanes</th>
                    <td class="text-right" id="speed">0</td>
                </tr>
                <tr>
                    <th scope="row" class="pl-0">Selected</th>
                    <td class="text-right" id="selected-entity"></td>
                </tr>
                </tbody>
            </table>
            <div id="file-upload" class="border-dark">
                <div class="custom-file mb-3">
                    <input class="custom-file-input" type="file" id="roadnet-file">
                    <label class="custom-file-label" for="roadnet-file" id="roadnet-label">Roadnet File</label>
                </div>
                <div class="custom-file mb-3">
                    <input class="custom-file-input" type="file" id="replay-file">
                    <label class="custom-file-label" for="replay-file" id="replay-label">Replay File</label>
                </div>
                <div class="custom-file">
                    <input class="custom-file-input" type="file" id="chart-file">
                    <label class="custom-file-label" for="replay-file" id="chart-label">Chart File (Optional)</label>
                </div>
                <div class="row m-3 align-items-center">
                    <div class="col-6">
                        <div class="custom-control custom-checkbox">
                            <input class="custom-control-input" type="checkbox" id="debug-mode" />
                            <label class="custom-control-label" for="debug-mode">
                                Debug*
                            </label>
                        </div>
                    </div>
                    <div class="col-6 text-center p-0">
                        <button class="btn btn-outline-secondary" id="start-btn">Start</button>
                    </div>
                </div>
            </div>
            <div id="control-box " class="border-bottom">
                <table class="table table-borderless table-hover mb-0">
                    <tbody>
                    <tr style="line-height: 10px; height: 10px;">
                        <th scope="row" class="pl-0" id="stats-name">Replay Speed</th>
                        <td class="text-right" id="replay-speed">0</td>
                    </tr>
                    </tbody>
                </table>
                <div class="row no-gutters">
                    <div class="col-1 text-center">
                        <span class="fas fa-minus" id="slow-btn" style="cursor: pointer"></span>
                    </div>
                    <div class="col-10">
                        <input type="range" class="custom-range" id="replay-control">
                    </div>
                    <div class="col-1 text-center">
                        <span class="fas fa-plus" id="fast-btn" style="cursor: pointer"></span>
                    </div>
                </div>
                <div class="row m-3">
                    <div class="col-12 text-center">
                        <button class="btn btn-outline-secondary w-100" id="pause">Pause</button>
                    </div>
                </div>

            </div>

            <h5 class="mt-4">Info Box</h5>
            <div id="info" class="alert alert-light border">
            </div>
        </div>
        <div class="col-8 h-80 d-flex flex-column p-0" >
          
            <div id="simulator-canvas" class="flex-grow-1 h-100">
                <div id="spinner" class="spinner d-none">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
                <div id="guide" class="ml-auto mr-auto mt-5 alert alert-secondary  w-50">

                    <h5>Navigation Keys</h5>
                    <hr />
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Pause
                            <span class="badge badge-secondary">P</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Step Forward
                            <span class="badge badge-secondary">]</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            Step Backward
                            <span class="badge badge-secondary">[</span>
                        </li>
                    </ul>

                </div>
            </div>
            <div id="chart-container" class="h-25 m-0 border-top pt-2 pl-4 d-none" >
                <div id="chart-title">Real-time Chart</div>
                <div id="chart" class="ct-chart"></div>
            </div>
        </div>
    </div>
</template>

<!-- <script src="../../public/script.js"></script> -->
<script>
export default{
    name : 'FlowSimu'
}
</script>

<!-- <style lang="css" scoped>
    @import '../assets/css/spinner.css';
    @import '../assets/css/style.css';
</style>
<style lang="css">
</style> -->