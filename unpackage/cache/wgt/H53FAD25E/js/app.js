function calculateLoss() {
  // 获取基础数据
  const isMud = document.querySelector('input[name="sale-type"]:checked').value === 'mud';
  const boxes = parseFloat(document.getElementById('boxes').value) || 0;
  const processedBoxes = parseFloat(document.getElementById('processed-boxes').value) || 0;

  // 新增毛重损耗计算
  let grossLoss = 0;
  if (isMud && boxes > 0) {
    grossLoss = 1 - (processedBoxes / boxes);
  }

  // 在原有计算基础上增加毛重采购量
  const grossPurchaseTon = (boxes * 50) / JIN_TO_TON; // 毛重计算（50斤/件）
  
  // 修改结果显示内容
  return `
    <div class="result-section">
      <h4>损耗分析结果</h4>
      <div class="result-item">
        <strong>净重采购量：</strong>${grossPurchaseTon.toFixed(3)}吨 <!-- 原名理论采购量 -->
      </div>
      <div class="result-item">
        <strong>毛重采购量：</strong>${grossPurchaseTon.toFixed(3)}吨 <!-- 新增 -->
      </div>
      <div class="result-item">
        <strong>损耗率：</strong>${(grossLoss * 100).toFixed(2)}%
      </div>
    </div>
  `;
}

function calculateProfit() {
  // 获取成本数据
  const costPerBox = parseFloat(document.getElementById('cost-per-box').value) || 0;
  const processingFee = parseFloat(document.getElementById('processing-fee').value) || 0;
  
  // 新增总成本计算
  const totalCost = costPerBox + processingFee;

  // 获取销售总额数据
  const sales = parseFloat(calculateSales().match(/¥([\d.]+)元/)[1]); // 从销售结果中提取数值
  
  // 修正利润率计算公式
  const profitRatio = sales > 0 ? (profit / sales * 100) : 0;

  // 修正利润计算（原逻辑正确，增加注释说明）
  const profit = (revenue - totalCost).toFixed(2); // 利润 = 销售总额 - 总成本
  
  return `
    <div class="result-section">
      <h4>利润核算结果</h4>
      <div class="result-item">
        <strong>总成本：</strong>¥${totalCost.toFixed(2)}元
      </div>
      <div class="result-item highlight">
        <strong>预估利润：</strong>¥${profit}元
      </div>
      <div class="result-item">
        <strong>销售利润率：</strong>${profitRatio.toFixed(2)}% <span class="hint">(利润/销售额)</span>
      </div>
    </div>
  `;
} 