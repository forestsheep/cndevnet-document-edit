import { KintoneRestAPIClient } from '@kintone/rest-api-client'

// 商品列表的应用id
const productsAppId = 12

const events = ['app.record.create.submit', 'app.record.edit.submit']

kintone.events.on(events, async (event) => {
  const { record } = event

  // kintone连接的实例
  const client = new KintoneRestAPIClient()

  // 这次为了简便，表中的商品不允许重复。
  // 只是简易的重复检查，不理解也没关系。
  const hasDuplicatedRow = record.报价明细.value.some((rowA, indexA, arr) => {
    return arr.find((rowB, indexB) => indexA !== indexB && rowA.value.型号.value === rowB.value.型号.value)
  })
  if (hasDuplicatedRow) {
    event.error = '不允许选择重复的商品'
    return event
  }

  // 获取表中的商品记录
  let products
  try {
    products = await client.record.getRecords({
      app: productsAppId,
      query: `型号 in (${record.报价明细.value.map((row) => `"${row.value.型号.value}"`).join(', ')})`,
    })
  } catch (error) {
    event.error = '获取记录失败'
    return event
  }

  // 在商品列表的库存中减去相应数量
  const deductedProductRecords = products.records.map((productRecord) => {
    const tableRow = record.报价明细.value.find((row) => productRecord.型号.value === row.value.型号.value)

    // 存放型号值和计算后的库存值
    return {
      型号: {
        value: productRecord.型号.value,
      },
      在库数量: {
        value: Number(productRecord.在库数量.value) - Number(tableRow.value.数量.value),
      },
    }
  })

  // 计算后的库存值是否有小于0的情况
  const noStockRecords = deductedProductRecords.filter((productRecord) => Number(productRecord.在库数量.value) < 0)

  // 存在1条以上记录时报错并跳过保存
  if (noStockRecords.length > 0) {
    // event.error中存放错误信息后返回
    // 列出出问题的商品型号
    event.error = `存在库存不够的商品。型号 ${noStockRecords
      .map((productRecord) => productRecord.型号.value)
      .join(', ')}`

    return event
  }

  // 没有问题的话更新
  try {
    await client.record.updateRecords({
      app: productsAppId,
      records: deductedProductRecords.map((productRecord) => {
        return {
          updateKey: {
            field: '型号',
            value: productRecord.型号.value,
          },
          record: {
            在库数量: {
              value: productRecord.在库数量.value,
            },
          },
        }
      }),
    })
  } catch (error) {
    event.error = `更新失败 ${error.message}`
    return event
  }

  return event
})
